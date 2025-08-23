"use client";
import { useState } from "react";
import { Alert, Ship } from "@/types/maritime";
import {
  alertTypeColors,
  getAlertPriorityIcon,
  formatTimestamp,
} from "@/lib/utils";
import { AlertTriangle, Info, XCircle } from "lucide-react";

interface AlertPanelProps {
  alerts: Alert[];
  ships: Ship[];
  className?: string;
  onAlertResolve?: (alertId: string) => void;
}

type AlertFilter = "all" | "critical" | "warning" | "info" | "unresolved";

export default function AlertPanel({
  alerts,
  ships,
  className,
  onAlertResolve,
}: AlertPanelProps) {
  const [filter, setFilter] = useState<AlertFilter>("unresolved");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [resolvedAlerts, setResolvedAlerts] = useState<Set<string>>(new Set());

  const markAsResolved = (alertId: string) => {
    setResolvedAlerts((prev) => new Set([...prev, alertId]));

    onAlertResolve?.(alertId);

    if (selectedAlert?.id === alertId) {
      setSelectedAlert(null);
    }
  };

  const isAlertResolved = (alert: Alert) => {
    return alert.resolved || resolvedAlerts.has(alert.id);
  };

  const filteredAlerts = alerts.filter((alert) => {
    const resolved = isAlertResolved(alert);

    switch (filter) {
      case "critical":
        return alert.type === "critical";
      case "warning":
        return alert.type === "warning";
      case "info":
        return alert.type === "info";
      case "unresolved":
        return !resolved;
      default:
        return true;
    }
  });

  const sortedAlerts = filteredAlerts.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const getShipName = (shipId: string) => {
    const ship = ships.find((s) => s.id === shipId);
    return ship?.name || shipId;
  };

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return <XCircle className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "info":
        return <Info className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const alertCounts = {
    total: alerts.length,
    critical: alerts.filter((a) => a.type === "critical" && !isAlertResolved(a))
      .length,
    warning: alerts.filter((a) => a.type === "warning" && !isAlertResolved(a))
      .length,
    info: alerts.filter((a) => a.type === "info" && !isAlertResolved(a)).length,
    unresolved: alerts.filter((a) => !isAlertResolved(a)).length,
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col ${className}`}
    >
      <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Central de Alertas
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Monitore alertas em tempo real
            </p>
          </div>
          <div className="text-center ml-3">
            <div className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-sm">
              {alertCounts.unresolved}
            </div>
            <p className="text-xs text-gray-600 mt-1">Ativos</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1 mb-3">
          <div className="bg-white rounded p-2 text-center border border-red-200">
            <div className="text-sm font-bold text-red-600">
              {alertCounts.critical}
            </div>
            <div className="text-xs text-gray-600">Críticos</div>
          </div>
          <div className="bg-white rounded p-2 text-center border border-yellow-200">
            <div className="text-sm font-bold text-yellow-600">
              {alertCounts.warning}
            </div>
            <div className="text-xs text-gray-600">Avisos</div>
          </div>
          <div className="bg-white rounded p-2 text-center border border-blue-200">
            <div className="text-sm font-bold text-blue-600">
              {alertCounts.info}
            </div>
            <div className="text-xs text-gray-600">Info</div>
          </div>
          <div className="bg-white rounded p-2 text-center border border-gray-200">
            <div className="text-sm font-bold text-gray-600">
              {alertCounts.total}
            </div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex gap-1">
            <button
              onClick={() => setFilter("unresolved")}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                filter === "unresolved"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              Não Resolvidos ({alertCounts.unresolved})
            </button>
            <button
              onClick={() => setFilter("critical")}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                filter === "critical"
                  ? "bg-red-600 text-white"
                  : "bg-white text-red-700 hover:bg-red-50 border border-red-300"
              }`}
            >
              Críticos ({alertCounts.critical})
            </button>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setFilter("warning")}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                filter === "warning"
                  ? "bg-yellow-600 text-white"
                  : "bg-white text-yellow-700 hover:bg-yellow-50 border border-yellow-300"
              }`}
            >
              Avisos ({alertCounts.warning})
            </button>
            <button
              onClick={() => setFilter("info")}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                filter === "info"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-700 hover:bg-blue-50 border border-blue-300"
              }`}
            >
              Informativos ({alertCounts.info})
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                filter === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              Todos ({alertCounts.total})
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ minHeight: "300px" }}>
        {sortedAlerts.length === 0 ? (
          <div className="p-8 text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum alerta na categoria selecionada
            </h3>
            <p className="text-gray-600 max-w-md mx-auto text-sm">
              {filter === "unresolved"
                ? "Excelente! Todos os alertas foram resolvidos e os sistemas estão funcionando normalmente."
                : filter === "critical"
                ? "Não há alertas críticos no momento. A frota está operando com segurança."
                : filter === "warning"
                ? "Não há avisos pendentes. Todos os sistemas estão estáveis."
                : filter === "info"
                ? "Não há alertas informativos recentes."
                : "Não há alertas registrados no sistema."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {sortedAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 cursor-pointer transition-all duration-200 border-l-4 ${
                  selectedAlert?.id === alert.id
                    ? "bg-blue-50 border-l-blue-500 shadow-md"
                    : "bg-white border-l-transparent hover:bg-gray-50 hover:border-l-gray-200"
                }`}
                onClick={() =>
                  setSelectedAlert(
                    selectedAlert?.id === alert.id ? null : alert
                  )
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`p-1.5 rounded-lg ${
                        alert.type === "critical"
                          ? "bg-red-100 text-gray-600"
                          : alert.type === "warning"
                          ? "bg-yellow-100 text-gray-600"
                          : "bg-blue-100 text-gray-600"
                      }`}
                    >
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            alert.type === "critical"
                              ? "bg-red-100 text-red-800"
                              : alert.type === "warning"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {alert.type === "critical"
                            ? "CRÍTICO"
                            : alert.type === "warning"
                            ? "AVISO"
                            : "INFO"}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            alert.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : alert.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          Prioridade{" "}
                          {alert.priority === "high"
                            ? "Alta"
                            : alert.priority === "medium"
                            ? "Média"
                            : "Baixa"}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {alert.title}
                      </h4>
                      <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>Embarcação: {getShipName(alert.shipId)}</span>
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-2">
                    {isAlertResolved(alert) ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Resolvido
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        Ativo
                      </span>
                    )}
                  </div>
                </div>

                {selectedAlert?.id === alert.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold text-gray-900 text-sm mb-2">
                          Detalhes Completos
                        </h5>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {alert.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-900">
                            Tipo:
                          </span>
                          <span className="ml-2 text-gray-600">
                            {alert.type}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">
                            Prioridade:
                          </span>
                          <span className="ml-2 text-gray-600">
                            {alert.priority}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">
                            Embarcação:
                          </span>
                          <span className="ml-2 text-gray-600">
                            {getShipName(alert.shipId)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">
                            Timestamp:
                          </span>
                          <span className="ml-2 text-gray-600">
                            {formatTimestamp(alert.timestamp)}
                          </span>
                        </div>
                      </div>

                      {!isAlertResolved(alert) && (
                        <div className="pt-3 border-t border-gray-100">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsResolved(alert.id);
                            }}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                          >
                            <div className="w-4 h-4 border-2 border-white rounded-sm flex items-center justify-center">
                              <div className="w-2 h-1 bg-white rounded-sm transform rotate-45 origin-left"></div>
                            </div>
                            Marcar como Resolvido
                          </button>
                        </div>
                      )}

                      {isAlertResolved(alert) && !alert.resolved && (
                        <div className="pt-3 border-t border-gray-100">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                            <div className="flex items-center justify-center gap-2 text-green-700">
                              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-1 bg-white rounded-sm transform rotate-45 origin-left"></div>
                              </div>
                              <span className="font-medium text-sm">
                                Alerta marcado como resolvido
                              </span>
                            </div>
                            <p className="text-xs text-green-600 mt-1">
                              Este alerta foi resolvido durante esta sessão
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
