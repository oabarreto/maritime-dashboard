<div align="center">
  <img src="https://navscope-maritime-dashboard.vercel.app/favicon.svg" alt="NavScope Logo" width="80" height="80">
  
  # ⚓ NavScope
  
  > Plataforma de monitoramento marítimo em tempo real desenvolvida com Next.js 15 e TypeScript.
</div>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-navscope--maritime--dashboard.vercel.app-blue?style=for-the-badge)](https://navscope-maritime-dashboard.vercel.app/)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

<div align="center">
  <img alt="Bundle Size" src="https://img.shields.io/badge/Bundle_Size-270kB-green?style=flat-square">
  <img alt="Build Time" src="https://img.shields.io/badge/Build_Time-2.6s-yellow?style=flat-square">
  <img alt="Status" src="https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=flat-square">
</div>

## 📸 Preview

<div align="center">
  <a href="https://navscope-maritime-dashboard.vercel.app/" target="_blank">
    <img width="1265" height="1152" alt="image" src="https://github.com/user-attachments/assets/8efe18f6-66d4-497d-a6c9-bc5b3aff6f85" />
  </a>
  
  **🔗 [Ver Demo Live →](https://navscope-maritime-dashboard.vercel.app/)**
  
  *Sistema completo de monitoramento marítimo com mapas interativos, alertas em tempo real e telemetria avançada*
</div>

### 🎯 Principais Telas

|    🗺️ Mapa Interativo     |   📊 Telemetria    |       🚨 Alertas        |
| :-----------------------: | :----------------: | :---------------------: |
| Embarcações em tempo real | Gráficos dinâmicos | Sistema de notificações |
|    Popups informativos    | Filtros temporais  |  Resolução de alertas   |

---

## 🎯 Sobre

Sistema profissional de dashboard para visualização e monitoramento de embarcações com dados simulados em tempo real. Desenvolvido para demonstrar habilidades em desenvolvimento frontend moderno com foco em UX/UI e performance.

### ✨ Funcionalidades

� **Sistema de autenticação** com login demo e modo visitante  
�🗺️ **Mapa interativo** com posicionamento de embarcações no oceano  
🚨 **Painel de alertas** com diferentes níveis de criticidade  
📊 **Gráficos de telemetria** (temperatura, combustível, velocidade)  
👤 **Gestão de usuários** com informações do perfil logado  
🎯 **Interface intuitiva** com detalhes expandidos das embarcações  
📱 **Interface responsiva** para desktop e mobile  
⚡ **Dados simulados** atualizados em tempo real  
🎨 **Design system** consistente e profissional

---

## 🛠️ Tecnologias

| Frontend   | Styling          | Maps & Charts | Tools      |
| ---------- | ---------------- | ------------- | ---------- |
| Next.js 15 | Tailwind CSS     | Leaflet       | TypeScript |
| React 19   | PostCSS          | Recharts      | ESLint     |
| App Router | CSS Grid/Flexbox | OpenStreetMap | Prettier   |

---

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/oabarreto/maritime-dashboard.git

# Entre no diretório
cd maritime-dashboard

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

**Acesse:** `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
src/
├── app/              # App Router (Next.js 15)
│   ├── layout.tsx    # Layout global + metadata
│   ├── page.tsx      # Dashboard principal
│   ├── login/        # Sistema de autenticação
│   │   └── page.tsx  # Página de login
│   └── globals.css   # Estilos globais
├── components/       # Componentes reutilizáveis
│   ├── Map.tsx       # Mapa interativo Leaflet
│   ├── AlertPanel.tsx # Sistema de alertas
│   ├── TelemetryChart.tsx # Gráficos telemetria
│   ├── AuthGuard.tsx # Proteção de rotas
│   └── UserInfo.tsx  # Informações do usuário
├── contexts/         # Contextos React
│   └── AuthContext.tsx # Gerenciamento de autenticação
├── data/            # Dados simulados
├── hooks/           # Custom hooks React
├── lib/             # Utilitários e helpers
└── types/           # Definições TypeScript
```

---

## 🎮 Scripts

```bash
npm run dev    # Desenvolvimento (Turbopack)
npm run build  # Build otimizado
npm run start  # Servidor produção
npm run lint   # Verificação código
```

---

## 🌟 Destaques

- **🔐 Autenticação:** Sistema completo com login demo e proteção de rotas
- **⚡ Performance:** Build otimizado (270kB) com pre-rendering SSR
- **🎨 Design:** Interface moderna inspirada em dashboards profissionais
- **📱 Responsivo:** Adaptável a todos os tamanhos de tela com UX otimizada
- **🔧 TypeScript:** Código 100% tipado para maior confiabilidade
- **🚀 Deploy:** Zero-config deployment na Vercel com CI/CD
- **♿ Acessibilidade:** Componentes com foco em usabilidade e contraste

---

## 📊 Demo Live

**🔗 [navscope-maritime-dashboard.vercel.app](https://navscope-maritime-dashboard.vercel.app/)**

### 🔐 Credenciais de Demonstração

Para acessar o sistema, use as credenciais demo ou continue sem login:

- **Email:** `demo@navscope.com`
- **Senha:** `demo123`
- **Ou:** Clique em "Continuar sem Login" para modo visitante

### 🎮 Explore as funcionalidades:

- **Login seguro** com sistema de autenticação completo
- **Clique nas embarcações** no mapa para ver detalhes expandidos
- **Teste os filtros** de telemetria (1h, 6h, 12h, 24h)
- **Resolva alertas** no painel lateral interativo
- **Navegue pela interface** responsiva em diferentes dispositivos
- **Atualize dados** em tempo real com o botão de refresh

---

<div align="center">

**Desenvolvido com ❤️ usando Next.js 15 + TypeScript**

_Projeto showcase demonstrando desenvolvimento frontend moderno_

</div>
