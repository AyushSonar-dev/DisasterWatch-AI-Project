"use client";

import { MapContainer, TileLayer, Popup, CircleMarker, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";

interface Disaster {
  id: string;
  type: "earthquake" | "flood" | "wildfire" | "storm";
  location: string;
  coordinates: [number, number];
  severity: "low" | "medium" | "high" | "critical";
  status: "active" | "monitoring" | "resolved";
  affectedPeople: number;
  lastUpdate: string;
  description?: string;
}

interface DisasterMapProps {
  disasters: Disaster[];
}

const disasterColors = {
  low: "green",
  medium: "yellow",
  high: "orange",
  critical: "red",
};

export default function DisasterMap({ disasters }: DisasterMapProps) {
  const defaultCenter: [number, number] = [20, 0]; // Center of the world
  const defaultZoom = 2;

  function FitToDisasters() {
    const map = useMap();
    if (!disasters || disasters.length === 0) return null;
    const latlngs = disasters
      .map((d) => d.coordinates)
      .filter(([lat, lon]) => Number.isFinite(lat) && Number.isFinite(lon));
    if (latlngs.length === 0) return null;
    const allSame = latlngs.every(
      ([lat, lon]) => lat === latlngs[0][0] && lon === latlngs[0][1]
    );
    if (allSame) {
      map.setView(latlngs[0], 5);
    } else {
      // @ts-ignore acceptable LatLngBounds argument
      map.fitBounds(latlngs, { padding: [20, 20] });
    }
    return null;
  }

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      className="h-96 w-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FitToDisasters />

      {disasters
        .filter((d) => Number.isFinite(d.coordinates[0]) && Number.isFinite(d.coordinates[1]))
        .map((disaster) => (
          <CircleMarker
            key={disaster.id}
            center={disaster.coordinates}
            radius={8}
            pathOptions={{
              color: disasterColors[disaster.severity],
              fillColor: disasterColors[disaster.severity],
              fillOpacity: 0.6,
            }}
            eventHandlers={{
              click: () => {
                const url = `https://news.google.com/search?q=${encodeURIComponent(`${disaster.type} ${disaster.location}`)}`;
                window.location.href = url;
              },
            }}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{disaster.type.toUpperCase()}</h3>
                <p>{disaster.location}</p>
                <p>Severity: {disaster.severity}</p>
                <p>Affected People: {disaster.affectedPeople.toLocaleString()}</p>
                <p>{disaster.description}</p>
                <p>Last Update: {disaster.lastUpdate}</p>
                <a
                  href={`https://news.google.com/search?q=${encodeURIComponent(`${disaster.type} ${disaster.location}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline text-sm"
                >
                  Latest news
                </a>
              </div>
            </Popup>
          </CircleMarker>
        ))}
    </MapContainer>
  );
}
