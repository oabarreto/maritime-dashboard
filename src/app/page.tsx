"use client";
import { useState } from "react";
import { useMaritimeData } from "@/hooks/useMaritimeData";
import Map from "@/components/Map";
import AlertPanel from "@/components/AlertPanel";
import TelemetryChart from "@/components/TelemetryChart";
import { Ship } from "@/types/maritime";
import {
  Ship as ShipIcon,
  AlertTriangle,
  Activity,
  RefreshCw,
  Waves,
  Navigation,
  Users,
  ShipWheel,
  TrendingUp,
} from "lucide-react";
export default function Home() {
  const [resolvedAlerts, setResolvedAlerts] = useState<Set<string>>(new Set());

  const {
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
  } = useMaritimeData();

  const handleAlertResolve = (alertId: string) => {
    setResolvedAlerts((prev) => new Set([...prev, alertId]));
  };

  const isAlertResolved = (alertId: string) => {
    const alert = data.alerts.find((a) => a.id === alertId);
    return alert?.resolved || resolvedAlerts.has(alertId);
  };

  const unresolvedAlerts = data.alerts.filter(
    (alert) => !isAlertResolved(alert.id)
  );
  const activeAlerts = unresolvedAlerts.filter((alert) => !alert.resolved);
  const criticalAlerts = unresolvedAlerts.filter(
    (alert) => alert.type === "critical"
  );

  const activeShips = getShipsByStatus("active");
  const criticalShips = getShipsByStatus("critical");
  const stats = [
    {
      label: "Embarcações Monitoradas",
      value: data.ships.length,
      icon: <ShipIcon className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Alertas Ativos",
      value: activeAlerts.length,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      label: "Status Crítico",
      value: criticalAlerts.length,
      icon: <Activity className="w-5 h-5" />,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      label: "Operacionais",
      value: activeShips.length,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Maritime Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Monitoramento em Tempo Real
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
                {isLoading ? "Atualizando..." : "Atualizar"}
              </button>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleTimeString("pt-BR")}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date().toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            <div className="xl:col-span-3">
              <Map
                ships={data.ships}
                selectedShip={selectedShip}
                onShipSelect={setSelectedShip}
                className="h-[600px]"
              />
            </div>
            <div className="xl:col-span-2">
              <AlertPanel
                alerts={data.alerts}
                ships={data.ships}
                onAlertResolve={handleAlertResolve}
                className="h-[600px]"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
              <ShipWheel className="w-5 h-5 text-blue-500" />
              Status da Frota
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {data.ships.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Total de Embarcações
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {activeShips.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Operacionais</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600">
                  {activeAlerts.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Alertas Ativos</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">
                  {criticalAlerts.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Alertas Críticos
                </div>
              </div>
            </div>
          </div>

          {selectedShip && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Navigation className="w-6 h-6 text-blue-500" />
                    Detalhes da Embarcação: {selectedShip.name}
                  </h3>
                  <button
                    onClick={() => setSelectedShip(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Nome</p>
                    <p className="font-semibold text-gray-900">
                      {selectedShip.name}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Tipo</p>
                    <p className="font-semibold text-gray-900">
                      {selectedShip.type}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Destino</p>
                    <p className="font-semibold text-gray-900">
                      {selectedShip.destination}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Capitão</p>
                    <p className="font-semibold text-gray-900">
                      {selectedShip.captain}
                    </p>
                  </div>
                </div>
              </div>
              {getShipTelemetry(selectedShip.id) && (
                <TelemetryChart
                  ship={selectedShip}
                  telemetry={getShipTelemetry(selectedShip.id)!}
                  timeRange={selectedTimeRange}
                  onTimeRangeChange={setSelectedTimeRange}
                  className="h-auto"
                />
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <ShipIcon className="w-5 h-5 text-blue-500" />
              Todas as Embarcações
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Embarcação
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Velocidade
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destino
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ETA
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.ships.map((ship) => (
                  <tr
                    key={ship.id}
                    className={`hover:bg-gray-50 cursor-pointer ${
                      selectedShip?.id === ship.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedShip(ship)}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            ship.status === "active" ? "bg-green-500" : ""
                          }${ship.status === "critical" ? "bg-red-500" : ""}${
                            ship.status === "warning" ? "bg-yellow-500" : ""
                          }${
                            ship.status === "maintenance" ? "bg-gray-500" : ""
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {ship.name}
                          </p>
                          <p className="text-sm text-gray-500">{ship.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          ship.status === "active"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }${
                          ship.status === "critical"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }${
                          ship.status === "warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                        }${
                          ship.status === "maintenance"
                            ? "bg-gray-100 text-gray-800"
                            : ""
                        }`}
                      >
                        {ship.status === "active" && "Ativo"}
                        {ship.status === "critical" && "Crítico"}
                        {ship.status === "warning" && "Aviso"}
                        {ship.status === "maintenance" && "Manutenção"}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ship.speed.toFixed(1)} nós
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ship.destination}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(ship.eta).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedShip(ship);
                        }}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
