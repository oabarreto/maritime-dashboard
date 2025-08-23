"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Ship } from "@/types/maritime";
import { getShipStatusIcon, formatSpeed, formatETA } from "@/lib/utils";
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
  }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false,
  }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false,
  }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
interface MapProps {
  ships: Ship[];
  selectedShip?: Ship | null;
  onShipSelect?: (ship: Ship) => void;
  className?: string;
}
const createShipIcon = (ship: Ship) => {
  if (typeof window === "undefined") return null;
  const L = require("leaflet");
  const iconHtml = `
    <div class="relative">
      <div class="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold
        ${ship.status === "active" ? "bg-green-500" : ""}
        ${ship.status === "critical" ? "bg-red-500" : ""}
        ${ship.status === "warning" ? "bg-yellow-500" : ""}
        ${ship.status === "maintenance" ? "bg-gray-500" : ""}
      ">
        🚢
      </div>
      <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white
        ${ship.status === "active" ? "bg-green-400" : ""}
        ${ship.status === "critical" ? "bg-red-400 animate-pulse" : ""}
        ${ship.status === "warning" ? "bg-yellow-400" : ""}
        ${ship.status === "maintenance" ? "bg-gray-400" : ""}
      "></div>
    </div>
  `;
  return L.divIcon({
    html: iconHtml,
    className: "custom-ship-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};
export default function Map({
  ships,
  selectedShip,
  onShipSelect,
  className,
}: MapProps) {
  const [isClient, setIsClient] = useState(false);
  const [mapCenter] = useState<[number, number]>([-25.0, -45.0]);
  const [mapZoom] = useState(6);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return (
      <div
        className={`bg-blue-50 rounded-lg flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Carregando mapa...</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
        className="z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {ships.map((ship) => (
          <Marker
            key={ship.id}
            position={[ship.position.lat, ship.position.lng]}
            icon={createShipIcon(ship)}
            eventHandlers={{
              click: () => onShipSelect?.(ship),
            }}
          >
            <Popup>
              <div className="p-2 max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">
                    {getShipStatusIcon(ship.status)}
                  </span>
                  <h3 className="font-bold text-gray-900">{ship.name}</h3>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium">{ship.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Velocidade:</span>
                    <span className="font-medium">
                      {formatSpeed(ship.speed)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Destino:</span>
                    <span className="font-medium">{ship.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ETA:</span>
                    <span className="font-medium">{formatETA(ship.eta)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capitão:</span>
                    <span className="font-medium">{ship.captain}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        ship.status === "active"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                      ${
                        ship.status === "critical"
                          ? "bg-red-100 text-red-800"
                          : ""
                      }
                      ${
                        ship.status === "warning"
                          ? "bg-yellow-100 text-yellow-800"
                          : ""
                      }
                      ${
                        ship.status === "maintenance"
                          ? "bg-gray-100 text-gray-800"
                          : ""
                      }
                    `}
                    >
                      {ship.status === "active" && "Ativo"}
                      {ship.status === "critical" && "Crítico"}
                      {ship.status === "warning" && "Aviso"}
                      {ship.status === "maintenance" && "Manutenção"}
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute top-4 right-4 bg-gray-200 p-3 rounded-lg shadow-lg z-20">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">
          Status das Embarcações
        </h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-700">Ativo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-700">Crítico</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-700">Aviso</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-gray-700">Manutenção</span>
          </div>
        </div>
      </div>
    </div>
  );
}
