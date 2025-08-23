"use client";
import { Ship, Alert } from "@/types/maritime";
import {
  Ship as ShipIcon,
  AlertTriangle,
  Activity,
  TrendingUp,
  Clock,
  Anchor,
  Navigation,
  Fuel,
} from "lucide-react";
interface DashboardStatsProps {
  ships: Ship[];
  alerts: Alert[];
  className?: string;
}
export default function DashboardStats({
  ships,
  alerts,
  className,
}: DashboardStatsProps) {
  const stats = {
    totalShips: ships.length,
    activeShips: ships.filter((s) => s.status === "active").length,
    criticalShips: ships.filter((s) => s.status === "critical").length,
    activeAlerts: alerts.filter((a) => !a.resolved).length,
    criticalAlerts: alerts.filter((a) => !a.resolved && a.type === "critical")
      .length,
    averageSpeed:
      ships.reduce((acc, ship) => acc + ship.speed, 0) / ships.length,
    shipsInPort: ships.filter((s) => s.speed === 0).length,
    shipsAtSea: ships.filter((s) => s.speed > 0).length,
  };
  const operationalPercentage = (
    (stats.activeShips / stats.totalShips) *
    100
  ).toFixed(1);
  const statCards = [
    {
      title: "Embarcações Monitoradas",
      value: stats.totalShips,
      icon: <ShipIcon className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      trend: null,
      description: "Total da frota",
    },
    {
      title: "Taxa Operacional",
      value: `${operationalPercentage}%`,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
      trend: "+2.3%",
      description: `${stats.activeShips}/${stats.totalShips} ativas`,
    },
    {
      title: "Alertas Ativos",
      value: stats.activeAlerts,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      trend:
        stats.criticalAlerts > 0 ? `${stats.criticalAlerts} críticos` : null,
      description: "Requer atenção",
    },
    {
      title: "Status Crítico",
      value: stats.criticalShips,
      icon: <Activity className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-100",
      trend: stats.criticalShips > 0 ? "Ação necessária" : "Tudo normal",
      description: "Embarcações críticas",
    },
    {
      title: "Velocidade Média",
      value: `${stats.averageSpeed.toFixed(1)} nós`,
      icon: <Navigation className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      trend: null,
      description: "Frota em movimento",
    },
    {
      title: "No Porto",
      value: stats.shipsInPort,
      icon: <Anchor className="w-6 h-6" />,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
      trend: null,
      description: `${stats.shipsAtSea} no mar`,
    },
  ];
  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}>
                {stat.icon}
              </div>
              {stat.trend && (
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.trend.includes("+") || stat.trend === "Tudo normal"
                      ? "bg-green-100 text-green-700"
                      : stat.trend.includes("críticos") ||
                        stat.trend === "Ação necessária"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {stat.trend}
                </span>
              )}
            </div>

            <div className="mb-2">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            </div>

            <p className="text-xs text-gray-500">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ShipIcon className="w-5 h-5 text-blue-500" />
            Status da Frota
          </h3>
          <div className="space-y-3">
            {[
              {
                status: "active",
                label: "Operacionais",
                count: stats.activeShips,
                color: "bg-green-500",
              },
              {
                status: "critical",
                label: "Críticas",
                count: stats.criticalShips,
                color: "bg-red-500",
              },
              {
                status: "warning",
                label: "Em Aviso",
                count: ships.filter((s) => s.status === "warning").length,
                color: "bg-yellow-500",
              },
              {
                status: "maintenance",
                label: "Manutenção",
                count: ships.filter((s) => s.status === "maintenance").length,
                color: "bg-gray-500",
              },
            ].map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full ${item.color} shadow-sm border border-white`}
                  ></div>
                  <span className="text-sm font-semibold text-gray-800">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-md">
                    {item.count}
                  </span>
                  <span className="text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                    ({((item.count / stats.totalShips) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Resumo de Alertas
          </h3>
          <div className="space-y-3">
            {[
              {
                type: "critical",
                label: "Críticos",
                count: alerts.filter(
                  (a) => !a.resolved && a.type === "critical"
                ).length,
                color: "bg-red-500",
              },
              {
                type: "warning",
                label: "Avisos",
                count: alerts.filter((a) => !a.resolved && a.type === "warning")
                  .length,
                color: "bg-yellow-500",
              },
              {
                type: "info",
                label: "Informativos",
                count: alerts.filter((a) => !a.resolved && a.type === "info")
                  .length,
                color: "bg-blue-500",
              },
              {
                type: "resolved",
                label: "Resolvidos",
                count: alerts.filter((a) => a.resolved).length,
                color: "bg-green-500",
              },
            ].map((item) => (
              <div
                key={item.type}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
