"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Ship, ShipTelemetry, TelemetryPoint } from "@/types/maritime";
import { formatTimestamp } from "@/lib/utils";
import { Thermometer, Fuel, Gauge, Calendar } from "lucide-react";
interface TelemetryChartProps {
  ship: Ship;
  telemetry: ShipTelemetry;
  timeRange: "1h" | "6h" | "12h" | "24h";
  onTimeRangeChange: (range: "1h" | "6h" | "12h" | "24h") => void;
  className?: string;
}
type MetricType = "engineTemp" | "fuelLevel" | "speed";
export default function TelemetryChart({
  ship,
  telemetry,
  timeRange,
  onTimeRangeChange,
  className,
}: TelemetryChartProps) {
  const [selectedMetric, setSelectedMetric] =
    useState<MetricType>("engineTemp");
  const getChartData = (metric: MetricType) => {
    const data = telemetry[metric] || [];
    const now = new Date();
    const timeRangeHours = {
      "1h": 1,
      "6h": 6,
      "12h": 12,
      "24h": 24,
    };
    const startTime = new Date(
      now.getTime() - timeRangeHours[timeRange] * 60 * 60 * 1000
    );
    const filteredData = data.filter((point) => {
      const pointTime = new Date(point.timestamp);
      return pointTime >= startTime;
    });
    return filteredData.map((point: TelemetryPoint) => ({
      time: new Date(point.timestamp).getTime(),
      value: point.value,
      formattedTime: formatTimestamp(point.timestamp),
    }));
  };
  const metricConfigs = {
    engineTemp: {
      label: "Temperatura do Motor",
      unit: "°C",
      icon: <Thermometer className="w-5 h-5" />,
      color: "#ef4444",
      gradientId: "engineTempGradient",
      criticalThreshold: 100,
    },
    fuelLevel: {
      label: "Nível de Combustível",
      unit: "%",
      icon: <Fuel className="w-5 h-5" />,
      color: "#3b82f6",
      gradientId: "fuelGradient",
      criticalThreshold: 20,
    },
    speed: {
      label: "Velocidade",
      unit: " nós",
      icon: <Gauge className="w-5 h-5" />,
      color: "#10b981",
      gradientId: "speedGradient",
      criticalThreshold: null,
    },
  };
  const currentConfig = metricConfigs[selectedMetric];
  const chartData = getChartData(selectedMetric);
  const currentValue = chartData[chartData.length - 1]?.value || 0;
  const isInCriticalZone =
    currentConfig.criticalThreshold &&
    ((selectedMetric === "engineTemp" &&
      currentValue > currentConfig.criticalThreshold) ||
      (selectedMetric === "fuelLevel" &&
        currentValue < currentConfig.criticalThreshold));
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600">{data.formattedTime}</p>
          <p
            className="text-lg font-semibold"
            style={{ color: currentConfig.color }}
          >
            {payload[0].value.toFixed(1)}
            {currentConfig.unit}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className={`bg-white rounded-lg shadow-lg mb-6 ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-blue-500" />
            Telemetria - {ship.name}
          </h2>
          <span className="text-sm text-gray-500">{ship.id}</span>
        </div>

        <div className="flex gap-2 mb-4">
          {Object.entries(metricConfigs).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key as MetricType)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedMetric === key
                  ? "bg-blue-100 text-blue-700 ring-2 ring-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {config.icon}
              {config.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 mr-2">Período:</span>
          <div className="flex gap-1">
            {(["1h", "6h", "12h", "24h"] as const).map((range) => (
              <button
                key={range}
                onClick={() => onTimeRangeChange(range)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  timeRange === range
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-3 rounded-full"
              style={{
                backgroundColor: currentConfig.color + "20",
                color: currentConfig.color,
              }}
            >
              {currentConfig.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {currentConfig.label} Atual
              </p>
              <p
                className="text-2xl font-bold"
                style={{ color: currentConfig.color }}
              >
                {currentValue.toFixed(1)}
                {currentConfig.unit}
              </p>
            </div>
          </div>
          {isInCriticalZone && (
            <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-2 rounded-lg">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Zona Crítica</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        {chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Gauge className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-medium">Dados não disponíveis</p>
              <p className="text-sm">
                Não há dados de telemetria para esta embarcação
              </p>
            </div>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id={currentConfig.gradientId}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={currentConfig.color}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={currentConfig.color}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="time"
                  type="number"
                  scale="time"
                  domain={["dataMin", "dataMax"]}
                  tickFormatter={(time) =>
                    new Date(time).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(value) => `${value}${currentConfig.unit}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={currentConfig.color}
                  strokeWidth={2}
                  fill={`url(#${currentConfig.gradientId})`}
                  dot={{ fill: currentConfig.color, strokeWidth: 2, r: 4 }}
                  activeDot={{
                    r: 6,
                    stroke: currentConfig.color,
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                />

                {currentConfig.criticalThreshold && (
                  <Line
                    type="monotone"
                    dataKey={() => currentConfig.criticalThreshold}
                    stroke="#dc2626"
                    strokeDasharray="5 5"
                    strokeWidth={1}
                    dot={false}
                    activeDot={false}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">
              Mínimo
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {chartData.length > 0
                ? Math.min(...chartData.map((d) => d.value)).toFixed(1)
                : "--"}
              <span className="text-sm text-gray-500">
                {currentConfig.unit}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">
              Máximo
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {chartData.length > 0
                ? Math.max(...chartData.map((d) => d.value)).toFixed(1)
                : "--"}
              <span className="text-sm text-gray-500">
                {currentConfig.unit}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">
              Média
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {chartData.length > 0
                ? (
                    chartData.reduce((acc, d) => acc + d.value, 0) /
                    chartData.length
                  ).toFixed(1)
                : "--"}
              <span className="text-sm text-gray-500">
                {currentConfig.unit}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
