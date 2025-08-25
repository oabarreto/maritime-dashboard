"use client";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

export default function UserInfo() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="hidden md:block text-right">
        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
        <p className="text-xs text-gray-600">{user.role}</p>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
        </div>

        <button
          onClick={logout}
          className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Sair"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
