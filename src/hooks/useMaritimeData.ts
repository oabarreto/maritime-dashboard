"use client";
import { useState, useEffect } from "react";
import { MaritimeData, Ship, Alert, ShipTelemetry } from "@/types/maritime";
import shipsData from "@/data/ships.json";
const generateRealTimeTelemetry = (shipId: string): ShipTelemetry => {
  const now = new Date();
  const baseValues = {
    VES001: { engineTemp: 75, fuelLevel: 80, speed: 12 },
    VES002: { engineTemp: 85, fuelLevel: 75, speed: 15 },
    VES003: { engineTemp: 70, fuelLevel: 90, speed: 10 },
    VES004: { engineTemp: 80, fuelLevel: 85, speed: 14 },
    VES005: { engineTemp: 78, fuelLevel: 70, speed: 11 },
  };
  const base =
    baseValues[shipId as keyof typeof baseValues] || baseValues.VES001;
  const generateDataPoints = (baseValue: number, variation: number) => {
    const points = [];
    for (let i = 96; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 15 * 60 * 1000);
      const hour = timestamp.getHours();
      let timeMultiplier = 1;
      if (hour >= 6 && hour <= 18) {
        timeMultiplier = 1 + Math.sin(((hour - 6) * Math.PI) / 12) * 0.2;
      } else {
        timeMultiplier = 0.8 + Math.random() * 0.2;
      }
      const randomVariation = (Math.random() - 0.5) * variation;
      const value = Math.max(0, baseValue * timeMultiplier + randomVariation);
      points.push({
        timestamp: timestamp.toISOString(),
        value: Math.round(value * 10) / 10,
      });
    }
    return points;
  };
  return {
    engineTemp: generateDataPoints(base.engineTemp, 15),
    fuelLevel: generateDataPoints(base.fuelLevel, 10),
    speed: generateDataPoints(base.speed, 3),
  };
};
export const useMaritimeData = () => {
  const [data, setData] = useState<MaritimeData>(shipsData as MaritimeData);
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<
    "1h" | "6h" | "12h" | "24h"
  >("6h");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const telemetryData: { [key: string]: ShipTelemetry } = {};
    data.ships.forEach((ship) => {
      telemetryData[ship.id] = generateRealTimeTelemetry(ship.id);
    });
    setData((prevData) => ({
      ...prevData,
      telemetry: telemetryData,
    }));
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const telemetryData: { [key: string]: ShipTelemetry } = {};
        prevData.ships.forEach((ship) => {
          telemetryData[ship.id] = generateRealTimeTelemetry(ship.id);
        });
        return {
          ...prevData,
          telemetry: telemetryData,
          ships: prevData.ships.map((ship) => ({
            ...ship,
            lastUpdate: new Date().toISOString(),
            position: {
              lat: ship.position.lat + (Math.random() - 0.5) * 0.001,
              lng: ship.position.lng + (Math.random() - 0.5) * 0.001,
            },
            speed: Math.max(0, ship.speed + (Math.random() - 0.5) * 2),
          })),
        };
      });
    }, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getActiveAlerts = (): Alert[] => {
    return data.alerts.filter((alert) => !alert.resolved);
  };
  const getCriticalAlerts = (): Alert[] => {
    return data.alerts.filter(
      (alert) => !alert.resolved && alert.type === "critical"
    );
  };
  const getShipsByStatus = (status: Ship["status"]): Ship[] => {
    return data.ships.filter((ship) => ship.status === status);
  };
  const getShipTelemetry = (shipId: string) => {
    return data.telemetry[shipId] || null;
  };
  const refreshData = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const telemetryData: { [key: string]: ShipTelemetry } = {};
    data.ships.forEach((ship) => {
      telemetryData[ship.id] = generateRealTimeTelemetry(ship.id);
    });
    setData((prevData) => ({
      ...prevData,
      telemetry: telemetryData,
    }));
    setIsLoading(false);
  };
  return {
    data,
    selectedShip,
    selectedTimeRange,
    isLoading,
    setSelectedShip,
    setSelectedTimeRange,
    getActiveAlerts,
    getCriticalAlerts,
    getShipsByStatus,
    getShipTelemetry,
    refreshData,
  };
};
