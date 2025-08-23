export interface Position {
  lat: number;
  lng: number;
}
export interface Ship {
  id: string;
  name: string;
  type:
    | "Cargo"
    | "Tanker"
    | "Container"
    | "Bulk Carrier"
    | "Ferry"
    | "Passenger";
  status: "active" | "critical" | "warning" | "maintenance";
  position: Position;
  course: number;
  speed: number;
  destination: string;
  eta: string;
  captain: string;
  flag: string;
  imo: string;
  mmsi: string;
  lastUpdate: string;
}
export interface TelemetryPoint {
  timestamp: string;
  value: number;
}
export interface ShipTelemetry {
  engineTemp: TelemetryPoint[];
  fuelLevel: TelemetryPoint[];
  speed: TelemetryPoint[];
}
export interface Alert {
  id: string;
  shipId: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  priority: "high" | "medium" | "low";
}
export interface WeatherData {
  location: string;
  lat: number;
  lng: number;
  temperature: number;
  windSpeed: number;
  windDirection: number;
  waveHeight: number;
  visibility: number;
  timestamp: string;
}
export interface MaritimeData {
  ships: Ship[];
  telemetry: Record<string, ShipTelemetry>;
  alerts: Alert[];
  weatherData: WeatherData[];
}
export type ShipStatusColor = {
  [K in Ship["status"]]: string;
};
export type AlertTypeColor = {
  [K in Alert["type"]]: string;
};
