"use client";
import { useState, useEffect } from "react";
import { Ship } from "@/types/maritime";
import { Search, Filter, X, Calendar, MapPin } from "lucide-react";
interface ShipFiltersProps {
  ships: Ship[];
  onFilteredShips: (filteredShips: Ship[]) => void;
  className?: string;
}
type StatusFilter = "all" | "active" | "critical" | "warning" | "maintenance";
type TypeFilter =
  | "all"
  | "Cargo"
  | "Tanker"
  | "Container"
  | "Bulk Carrier"
  | "Ferry";
export default function ShipFilters({
  ships,
  onFilteredShips,
  className,
}: ShipFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const applyFilters = () => {
    let filtered = ships;
    if (searchTerm) {
      filtered = filtered.filter(
        (ship) =>
          ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ship.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ship.captain.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ship.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((ship) => ship.status === statusFilter);
    }
    if (typeFilter !== "all") {
      filtered = filtered.filter((ship) => ship.type === typeFilter);
    }
    onFilteredShips(filtered);
  };
  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, typeFilter, ships]);
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
  };
  const statusCounts = {
    all: ships.length,
    active: ships.filter((s) => s.status === "active").length,
    critical: ships.filter((s) => s.status === "critical").length,
    warning: ships.filter((s) => s.status === "warning").length,
    maintenance: ships.filter((s) => s.status === "maintenance").length,
  };
  const typeCounts = {
    all: ships.length,
    Cargo: ships.filter((s) => s.type === "Cargo").length,
    Tanker: ships.filter((s) => s.type === "Tanker").length,
    Container: ships.filter((s) => s.type === "Container").length,
    "Bulk Carrier": ships.filter((s) => s.type === "Bulk Carrier").length,
    Ferry: ships.filter((s) => s.type === "Ferry").length,
  };
  const hasActiveFilters =
    searchTerm || statusFilter !== "all" || typeFilter !== "all";
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-500" />
            Filtros de Embarcações
          </h3>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="w-4 h-4" />
                Limpar
              </button>
            )}
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="lg:hidden flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              {isFiltersOpen ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, destino, capitão ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div
        className={`p-4 space-y-4 ${
          isFiltersOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status da Embarcação
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as StatusFilter)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  statusFilter === status
                    ? status === "active"
                      ? "bg-green-600 text-white"
                      : status === "critical"
                      ? "bg-red-600 text-white"
                      : status === "warning"
                      ? "bg-yellow-600 text-white"
                      : status === "maintenance"
                      ? "bg-gray-600 text-white"
                      : "bg-blue-600 text-white"
                    : status === "active"
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : status === "critical"
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : status === "warning"
                    ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    : status === "maintenance"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status === "all"
                  ? "Todos"
                  : status === "active"
                  ? "Ativo"
                  : status === "critical"
                  ? "Crítico"
                  : status === "warning"
                  ? "Aviso"
                  : "Manutenção"}{" "}
                ({count})
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Embarcação
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(typeCounts).map(([type, count]) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type as TypeFilter)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  typeFilter === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type === "all" ? "Todos os Tipos" : type} ({count})
              </button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Mostrando resultados filtrados</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
