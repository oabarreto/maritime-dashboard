"use client";
import { useState, useEffect } from "react";
import { Alert } from "@/types/maritime";
import {
  Bell,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
} from "lucide-react";
interface NotificationsProps {
  alerts: Alert[];
  className?: string;
}
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "critical" | "warning" | "info" | "success";
  timestamp: Date;
  read: boolean;
}
export default function Notifications({
  alerts,
  className,
}: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAlertCount, setLastAlertCount] = useState(alerts.length);
  useEffect(() => {
    const unresolvedAlerts = alerts.filter((alert) => !alert.resolved);
    if (unresolvedAlerts.length > lastAlertCount) {
      const newNotifications = unresolvedAlerts
        .slice(lastAlertCount)
        .map((alert) => ({
          id: `alert-${alert.id}`,
          title: `Novo ${
            alert.type === "critical"
              ? "Alerta Crítico"
              : alert.type === "warning"
              ? "Aviso"
              : "Informação"
          }`,
          message: alert.title,
          type: alert.type as "critical" | "warning" | "info",
          timestamp: new Date(alert.timestamp),
          read: false,
        }));
      setNotifications((prev) => [...newNotifications, ...prev].slice(0, 10));
    }
    setLastAlertCount(unresolvedAlerts.length);
  }, [alerts, lastAlertCount]);
  useEffect(() => {
    const interval = setInterval(() => {
      const systemNotifications = [
        {
          id: `system-${Date.now()}`,
          title: "Sistema Atualizado",
          message: "Dados de telemetria atualizados com sucesso",
          type: "success" as const,
          timestamp: new Date(),
          read: false,
        },
        {
          id: `system-${Date.now()}`,
          title: "Conexão Restabelecida",
          message: "Conexão com embarcação VES003 restabelecida",
          type: "info" as const,
          timestamp: new Date(),
          read: false,
        },
      ];
      if (Math.random() < 0.1) {
        const randomNotification =
          systemNotifications[
            Math.floor(Math.random() * systemNotifications.length)
          ];
        setNotifications((prev) => [randomNotification, ...prev].slice(0, 10));
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };
  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "critical":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };
  const getBgColor = (type: Notification["type"]) => {
    switch (type) {
      case "critical":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      case "success":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notificações
                </h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Marcar todas como lidas
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {unreadCount} notificação{unreadCount !== 1 ? "ões" : ""} não
                  lida{unreadCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="font-medium">Nenhuma notificação</p>
                  <p className="text-sm mt-1">Você está em dia!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4
                              className={`text-sm font-medium truncate ${
                                !notification.read
                                  ? "text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.title}
                            </h4>
                            <button
                              onClick={() =>
                                removeNotification(notification.id)
                              }
                              className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {notification.timestamp.toLocaleTimeString(
                                "pt-BR",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Marcar como lida
                              </button>
                            )}
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full absolute right-2 top-4"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => {
                    setNotifications([]);
                    setIsOpen(false);
                  }}
                  className="w-full text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Limpar todas as notificações
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
