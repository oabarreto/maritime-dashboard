import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - NavScope",
  description: "Acesso ao sistema de monitoramento marítimo NavScope",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
