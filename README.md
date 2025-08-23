# 🌊 Maritime Dashboard

Um dashboard moderno para monitoramento marítimo em tempo real, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## 🎯 Sobre o Projeto

Dashboard de demonstração para monitoramento de embarcações e condições oceânicas, criado como projeto showcase para posição de **Frontend Developer Pleno** na **Oceanpact**.

### ✨ Características Principais

- **Monitoramento em Tempo Real**: Acompanhamento de embarcações com dados simulados
- **Mapas Interativos**: Visualização de posições usando Leaflet
- **Alertas Inteligentes**: Sistema de notificações por criticidade
- **Telemetria Avançada**: Gráficos de temperatura, combustível e velocidade
- **Design Responsivo**: Interface otimizada para desktop e mobile
- **TypeScript**: Código type-safe e manutenível

## 🚀 Tecnologias

- **Frontend**: Next.js 15 + TypeScript
- **Estilização**: Tailwind CSS
- **Mapas**: React-Leaflet
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Datas**: date-fns
- **Deploy**: Vercel

## 📦 Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/maritime-dashboard.git

# Entre no diretório
cd maritime-dashboard

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## 🏗️ Estrutura do Projeto

```
src/
├── app/                 # Pages do Next.js App Router
├── components/          # Componentes React reutilizáveis
│   ├── Map.tsx         # Mapa interativo com embarcações
│   ├── AlertPanel.tsx  # Painel de alertas
│   └── TelemetryChart.tsx # Gráficos de telemetria
├── data/               # Dados simulados
│   └── ships.json      # Embarcações, telemetria e alertas
├── hooks/              # Custom React Hooks
│   └── useMaritimeData.ts # Hook para gerenciar dados marítimos
├── lib/                # Utilitários
│   └── utils.ts        # Funções auxiliares
└── types/              # Definições TypeScript
    └── maritime.ts     # Tipos para dados marítimos
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
```

## 📊 Funcionalidades Planejadas

### 🗺️ Mapa Interativo

- Visualização de embarcações em tempo real
- Markers coloridos por status (ativo, crítico, aviso, manutenção)
- Popups com informações detalhadas
- Controles de zoom e navegação

### 🚨 Sistema de Alertas

- Classificação por criticidade (crítico, aviso, info)
- Filtragem por tipo e status
- Timestamps e descrições detalhadas
- Badge indicators por prioridade

### 📈 Telemetria

- Gráficos de temperatura do motor
- Monitoramento de combustível
- Histórico de velocidade
- Seleção de período temporal

### 🎛️ Dashboard Principal

- Overview consolidado de todas as embarcações
- Estatísticas em tempo real
- Interface responsiva e intuitiva
- Tema moderno com Tailwind CSS

## 🔄 Dados Simulados

O projeto utiliza dados fictícios para demonstração:

- **5 embarcações** com diferentes tipos e status
- **Telemetria** com histórico de 2 horas
- **Alertas** de diferentes criticidades
- **Dados meteorológicos** para principais portos brasileiros

## 👨‍💻 Status do Desenvolvimento

✅ **Concluído:**

- Configuração do projeto Next.js + TypeScript + Tailwind
- Estrutura de dados simulados
- Tipos TypeScript completos
- Hook customizado para gerenciamento de estado
- Funções utilitárias
- Servidor de desenvolvimento rodando

🔄 **Em Desenvolvimento:**

- Componentes de interface (Map, AlertPanel, TelemetryChart)
- Layout do dashboard principal
- Integração dos componentes

📅 **Próximos Passos:**

- Implementação dos componentes visuais
- Testes e otimizações
- Deploy na Vercel

---

_Projeto desenvolvido como demonstração técnica para vaga de Frontend Developer Pleno na Oceanpact_
