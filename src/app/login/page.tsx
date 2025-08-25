"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { Info } from "lucide-react";

export default function LoginPage() {
  const { login, enterDemoMode } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div></div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password);

      if (success) {
        router.push("/");
      } else {
        setError("Credenciais inválidas");
      }
    } catch (err) {
      setError("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemo = () => {
    enterDemoMode();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Image
              src="/favicon.svg"
              alt="NavScope"
              width={40}
              height={40}
              className="text-white"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NavScope</h1>
          <p className="text-gray-600">Monitoramento Marítimo Inteligente</p>
        </div>

        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 overflow-hidden">
          <div className="bg-blue-600 px-4 py-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-white" />
              <h3 className="text-sm font-semibold text-white">
                Sistema de Demonstração
              </h3>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-700 mb-3">
              Esta é uma versão demonstrativa do sistema NavScope para
              apresentação de funcionalidades técnicas.
            </p>
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">
                  Credenciais de Acesso:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("demo@navscope.com");
                    setPassword("demo123");
                  }}
                  className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded-md transition-colors font-medium"
                >
                  Preencher
                </button>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600">Email:</span>
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-700">
                    demo@navscope.com
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600">Senha:</span>
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-700">
                    demo123
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900 placeholder-gray-400 font-medium"
              placeholder="demo@navscope.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900 placeholder-gray-400 font-medium"
              placeholder="demo123"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Entrando...
              </div>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                ou
              </span>
            </div>
          </div>

          <button
            onClick={handleDemo}
            className="w-full mt-6 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200 border-2 border-gray-200 hover:border-gray-300"
          >
            Continuar sem Login
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            NavScope © 2025 - Sistema de Demonstração
          </p>
        </div>
      </div>
    </div>
  );
}
