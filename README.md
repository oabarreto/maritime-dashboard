# 🌊 Maritime Dashboard

Dashboard profissional para monitoramento marítimo em tempo real, desenvolvido com Next.js 15, TypeScript e Tailwind CSS.

## 🎯 Sobre o Projeto

Sistema completo de monitoramento naval com interface moderna e responsiva, criado como projeto showcase para demonstração de habilidades técnicas. O dashboard simula operações marítimas reais com dados em tempo real.

### ✨ Características Principais

- **⚡ Monitoramento em Tempo Real**: Simulação de dados de embarcações com atualizações automáticas
- **🗺️ Mapas Interativos**: Visualização oceânica com React-Leaflet e posicionamento preciso
- **🚨 Central de Alertas**: Sistema inteligente de notificações com resolução e filtros
- **📊 Telemetria Avançada**: Gráficos dinâmicos com filtros temporais usando Recharts
- **📱 Design Responsivo**: Interface otimizada para todos os dispositivos
- **🎯 TypeScript**: Código 100% tipado e manutenível
- **🎨 UI/UX Profissional**: Design clean com ícones Lucide e sem emojis

## 🚀 Stack Tecnológica

- **Framework**: Next.js 15 com App Router e Turbopack
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Mapas**: React-Leaflet + OpenStreetMap
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Utilitários**: date-fns para manipulação de datas
- **Deploy**: Vercel Ready

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Configuração do Projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/maritime-dashboard.git

# Entre no diretório
cd maritime-dashboard

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

🌐 **Acesse**: `http://localhost:3000`

### Scripts Disponíveis

```bash
npm run dev          # Servidor desenvolvimento (Turbopack)
npm run build        # Build de produção otimizado
npm run start        # Servidor de produção
npm run lint         # ESLint para verificação de código
```

## 🏗️ Arquitetura do Projeto

```
maritime-dashboard/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── layout.tsx             # Layout global
│   │   ├── page.tsx               # Dashboard principal
│   │   └── globals.css            # Estilos globais
│   ├── 📁 components/             # Componentes React
│   │   ├── Map.tsx               # Mapa interativo com embarcações
│   │   ├── AlertPanel.tsx        # Central de alertas com resolução
│   │   └── TelemetryChart.tsx    # Gráficos de telemetria
│   ├── 📁 data/                   # Dados simulados
│   │   └── ships.json            # Dataset completo
│   ├── 📁 hooks/                  # Custom Hooks
│   │   └── useMaritimeData.ts    # Gerenciamento de estado
│   ├── 📁 lib/                    # Utilitários
│   │   └── utils.ts              # Funções auxiliares
│   └── 📁 types/                  # Definições TypeScript
│       └── maritime.ts           # Tipos do domínio marítimo
├── 📁 public/                     # Assets estáticos (limpo)
└── 📄 Arquivos de configuração   # Next.js, TypeScript, Tailwind
```

## 🔧 Funcionalidades Implementadas

### 🗺️ **Mapa Marítimo Interativo**

- ✅ Visualização oceânica com OpenStreetMap
- ✅ Posicionamento real de embarcações em águas do Atlântico
- ✅ Markers dinâmicos com cores por status
- ✅ Popups informativos com detalhes das embarcações
- ✅ Controles de zoom e navegação fluidos

### 🚨 **Central de Alertas Profissional**

- ✅ Classificação por criticidade (Crítico, Aviso, Info)
- ✅ Sistema de resolução de alertas
- ✅ Contadores dinâmicos em tempo real
- ✅ Interface clean com ícones Lucide
- ✅ Sincronização com status da frota
- ✅ Layout responsivo otimizado

### � **Telemetria e Gráficos**

- ✅ Gráficos de linha para temperatura do motor
- ✅ Monitoramento de nível de combustível
- ✅ Histórico de velocidade das embarcações
- ✅ Filtros temporais (1h, 6h, 12h, 24h)
- ✅ Recharts com animações suaves
- ✅ Cores diferenciadas por embarcação

### 🎛️ **Dashboard Central**

- ✅ Overview consolidado da frota
- ✅ Estatísticas em tempo real
- ✅ Cards informativos com métricas
- ✅ Layout responsivo para mobile/desktop
- ✅ Filtros avançados de embarcações
- ✅ Sistema de notificações

### 🔄 **Simulação de Dados Realistas**

- ✅ **5 embarcações** com características únicas
- ✅ **Telemetria temporal** com dados de 2 horas
- ✅ **Alertas dinâmicos** de diferentes criticidades
- ✅ **Posicionamento oceânico** preciso
- ✅ **Atualizações em tempo real** simuladas

## 🎯 Destaques Técnicos

### 🏗️ **Arquitetura Moderna**

- **Next.js 15** com App Router e Turbopack para performance
- **TypeScript** com tipagem completa do domínio marítimo
- **Tailwind CSS** com design system consistente
- **Component-driven development** com reutilização

### 🔄 **Gerenciamento de Estado**

- Custom hook `useMaritimeData` para centralizar lógica
- Estado compartilhado entre componentes
- Simulação de dados em tempo real
- Callbacks para comunicação entre componentes

### 🎨 **UI/UX Excellence**

- Interface limpa e profissional
- Responsividade para todos os dispositivos
- Ícones consistentes (Lucide React)
- Feedback visual imediato para ações do usuário

### ⚡ **Performance**

- Otimizações de re-render com React
- Lazy loading de componentes pesados
- Build otimizado para produção
- Componentes puros para evitar re-renders desnecessários

## 📸 Preview

O dashboard inclui:

1. **�️ Mapa Principal**: Embarcações posicionadas em oceano real
2. **📊 Painel de Telemetria**: Gráficos interativos e filtros temporais
3. **🚨 Central de Alertas**: Sistema completo de gerenciamento
4. **📈 Estatísticas**: Métricas da frota em tempo real
5. **🔍 Filtros**: Busca e filtros avançados de embarcações

## 🚀 Status do Projeto

✅ **100% Concluído:**

- ✅ Configuração completa Next.js 15 + TypeScript
- ✅ Estrutura de dados marítimos simulados
- ✅ Sistema de tipos TypeScript robusto
- ✅ Hook customizado de gerenciamento de estado
- ✅ Todos os componentes funcionais implementados
- ✅ Layout responsivo e profissional
- ✅ Sistema de alertas com resolução
- ✅ Sincronização de estado entre componentes
- ✅ Servidor de desenvolvimento operacional
- ✅ Build de produção funcional

🎯 **Pronto para Deploy:**

- ✅ Código production-ready
- ✅ Performance otimizada
- ✅ Interface responsiva
- ✅ Dados simulados realistas
- ✅ Funcionalidades completas

---

**💼 Projeto desenvolvido como demonstração técnica de habilidades em desenvolvimento frontend moderno**

_Tecnologias: Next.js 15, TypeScript, Tailwind CSS, React-Leaflet, Recharts_
