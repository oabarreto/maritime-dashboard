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
  Navigation,
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 sm:py-0 sm:h-16 gap-4 sm:gap-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/favicon.svg"
                  alt="NavScope"
                  className="w-8 h-8 rounded-md"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  NavScope
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Monitoramento Marítimo Inteligente
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 disabled:opacity-50 transition-colors w-full sm:w-auto text-sm"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
                {isLoading ? "Atualizando..." : "Atualizar"}
              </button>
              <div className="text-left sm:text-right">
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <div
                  className={`p-2 rounded-lg ${stat.bgColor} ${stat.color} shrink-0`}
                >
                  {stat.icon}
                </div>
                <div className="text-center sm:text-left min-w-0">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
            <div className="lg:col-span-3">
              <Map
                ships={data.ships}
                selectedShip={selectedShip}
                onShipSelect={setSelectedShip}
                className="h-[300px] sm:h-[400px] lg:h-[600px]"
              />
            </div>
            <div className="lg:col-span-2">
              <AlertPanel
                alerts={data.alerts}
                ships={data.ships}
                onAlertResolve={handleAlertResolve}
                className="h-[300px] sm:h-[400px] lg:h-[600px] overflow-hidden"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6 mt-4 mb-6 sm:mt-6">
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3 sm:mb-6">
              <ShipWheel className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500" />
              Status da Frota
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
              <div className="text-center p-2 sm:p-4 bg-blue-50 rounded-lg">
                <div className="text-lg sm:text-3xl font-bold text-blue-600">
                  {data.ships.length}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1 leading-tight">
                  Total Embarcações
                </div>
              </div>
              <div className="text-center p-2 sm:p-4 bg-green-50 rounded-lg">
                <div className="text-lg sm:text-3xl font-bold text-green-600">
                  {activeShips.length}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1 leading-tight">
                  Operacionais
                </div>
              </div>
              <div className="text-center p-2 sm:p-4 bg-red-50 rounded-lg">
                <div className="text-lg sm:text-3xl font-bold text-red-600">
                  {activeAlerts.length}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1 leading-tight">
                  Alertas Ativos
                </div>
              </div>
              <div className="text-center p-2 sm:p-4 bg-orange-50 rounded-lg">
                <div className="text-lg sm:text-3xl font-bold text-orange-600">
                  {criticalAlerts.length}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1 leading-tight">
                  Alertas Críticos
                </div>
              </div>
            </div>
          </div>

          {selectedShip && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Navigation className="w-5 sm:w-6 h-5 sm:h-6 text-blue-500" />
                    <span className="break-all sm:break-normal">
                      Detalhes: {selectedShip.name}
                    </span>
                  </h3>
                  <button
                    onClick={() => setSelectedShip(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg self-end sm:self-auto"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                      Nome
                    </p>
                    <p className="font-semibold text-gray-900 break-all sm:break-normal">
                      {selectedShip.name}
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                      Tipo
                    </p>
                    <p className="font-semibold text-gray-900">
                      {selectedShip.type}
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                      Destino
                    </p>
                    <p className="font-semibold text-gray-900 break-all sm:break-normal">
                      {selectedShip.destination}
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                      Capitão
                    </p>
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
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
              <ShipIcon className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500" />
              Todas as Embarcações
            </h3>
          </div>

          <div className="block sm:hidden">
            <div className="divide-y divide-gray-200">
              {data.ships.map((ship) => (
                <div
                  key={ship.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    selectedShip?.id === ship.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedShip(ship)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          ship.status === "active" ? "bg-green-500" : ""
                        }${ship.status === "critical" ? "bg-red-500" : ""}${
                          ship.status === "warning" ? "bg-yellow-500" : ""
                        }${ship.status === "maintenance" ? "bg-gray-500" : ""}`}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {ship.name}
                        </p>
                        <p className="text-xs text-gray-500">{ship.type}</p>
                      </div>
                    </div>
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
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Velocidade:</span>
                      <span className="ml-1 font-medium">
                        {ship.speed.toFixed(1)} nós
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">ETA:</span>
                      <span className="ml-1 font-medium">
                        {new Date(ship.eta).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs">
                    <span className="text-gray-500">Destino:</span>
                    <span className="ml-1 font-medium">{ship.destination}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden sm:block overflow-x-auto">
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
