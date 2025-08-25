"use client";
import { useAuth } from "@/contexts/AuthContext";

export default function TestPage() {
  const { login, enterDemoMode, user } = useAuth();

  const testLogin = async () => {
    console.log("Test login button clicked");
    const result = await login("demo@navscope.com", "demo123");
    console.log("Login result:", result);
  };

  const testDemo = () => {
    console.log("Test demo button clicked");
    enterDemoMode();
  };

  return (
    <div className="p-8">
      <h1>Teste Auth</h1>
      <p>Usuário atual: {user ? JSON.stringify(user) : "Não logado"}</p>

      <div className="mt-4 space-x-4">
        <button
          onClick={testLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Teste Login
        </button>

        <button
          onClick={testDemo}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Teste Demo
        </button>
      </div>
    </div>
  );
}
