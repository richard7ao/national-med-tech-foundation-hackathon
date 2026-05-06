"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  count?: number;
  isCurrentUser?: boolean;
}

interface PharmacyMapProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (id: string) => void;
}

function createIcon(isCurrentUser: boolean, count?: number): L.DivIcon {
  const bg = isCurrentUser ? "#064e3b" : "#34d399";
  const text = isCurrentUser ? "You" : (count?.toString() ?? "•");
  const size = isCurrentUser ? 36 : 30;

  return L.divIcon({
    html: `<div style="
      background: ${bg};
      color: white;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${isCurrentUser ? 11 : 10}px;
      font-weight: 700;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      border: 2px solid white;
      font-family: 'DM Sans', system-ui, sans-serif;
    ">${text}</div>`,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function PharmacyMap({
  markers,
  center = [51.474, -0.069],
  zoom = 13,
  onMarkerClick,
}: PharmacyMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={createIcon(!!m.isCurrentUser, m.count)}
          eventHandlers={{
            click: () => onMarkerClick?.(m.id),
          }}
        >
          <Popup>
            <strong>{m.label}</strong>
            {m.count !== undefined && <div>{m.count} listings</div>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
