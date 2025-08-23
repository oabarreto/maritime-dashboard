import { Ship, Alert, ShipStatusColor, AlertTypeColor } from "@/types/maritime";
export const shipStatusColors: ShipStatusColor = {
  active: "text-green-600 bg-green-100",
  critical: "text-red-600 bg-red-100",
  warning: "text-yellow-600 bg-yellow-100",
  maintenance: "text-gray-600 bg-gray-100",
};
export const alertTypeColors: AlertTypeColor = {
  critical: "text-red-600 bg-red-100 border-red-200",
  warning: "text-yellow-600 bg-yellow-100 border-yellow-200",
  info: "text-blue-600 bg-blue-100 border-blue-200",
};
export const getShipStatusIcon = (status: Ship["status"]): string => {
  switch (status) {
    case "active":
      return "🟢";
    case "critical":
      return "🔴";
    case "warning":
      return "🟡";
    case "maintenance":
      return "⚪";
    default:
      return "⚪";
  }
};
export const getAlertPriorityIcon = (priority: Alert["priority"]): string => {
  switch (priority) {
    case "high":
      return "";
    case "medium":
      return "";
    case "low":
      return "";
    default:
      return "";
  }
};
export const formatSpeed = (speed: number): string => {
  return `${speed.toFixed(1)} nós`;
};
export const formatCourse = (course: number): string => {
  return `${course}°`;
};
export const formatDistance = (distance: number): string => {
  return `${distance.toFixed(1)} nm`;
};
export const calculateDistance = (
  pos1: { lat: number; lng: number },
  pos2: { lat: number; lng: number }
): number => {
  const R = 3440.065;
  const dLat = ((pos2.lat - pos1.lat) * Math.PI) / 180;
  const dLng = ((pos2.lng - pos1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((pos1.lat * Math.PI) / 180) *
      Math.cos((pos2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
export const getWindDirection = (degrees: number): string => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};
export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const formatETA = (eta: string): string => {
  const etaDate = new Date(eta);
  const now = new Date();
  const diffMs = etaDate.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  if (diffMs < 0) {
    return "Atrasado";
  }
  if (diffHours > 24) {
    const days = Math.floor(diffHours / 24);
    return `${days}d ${diffHours % 24}h`;
  }
  return `${diffHours}h ${diffMinutes}m`;
};
