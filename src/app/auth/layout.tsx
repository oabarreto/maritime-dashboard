import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Acesso ao Sistema",
  description:
    "Faça login no Maritime Dashboard para acessar o sistema de monitoramento marítimo profissional",
  robots: "noindex, nofollow",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
