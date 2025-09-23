"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";

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
  description: string;
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

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      className="h-96 w-full rounded-lg"
    >
      <TileLayer
        url="http://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        attribution='Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>'
      />

      {disasters.map((disaster) => (
        <CircleMarker
          key={disaster.id}
          center={disaster.coordinates}
          radius={8}
          pathOptions={{ color: disasterColors[disaster.severity] }}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{disaster.type.toUpperCase()}</h3>
              <p>{disaster.location}</p>
              <p>Severity: {disaster.severity}</p>
              <p>Affected People: {disaster.affectedPeople.toLocaleString()}</p>
              <p>{disaster.description}</p>
              <p>Last Update: {disaster.lastUpdate}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
