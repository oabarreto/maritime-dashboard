# NavScope

Plataforma de monitoramento marítimo em tempo real desenvolvida com Next.js 15 e TypeScript.

## Sobre

Sistema de dashboard para visualização e monitoramento de embarcações com dados simulados em tempo real. Criado para demonstrar habilidades em desenvolvimento frontend moderno.

## Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Leaflet** - Mapas interativos
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones

## Instalação

```bash
# Clone o repositório
git clone https://github.com/oabarreto/maritime-dashboard.git

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

Acesse `http://localhost:3000`

## Funcionalidades

- **Mapa interativo** com posicionamento de embarcações
- **Painel de alertas** com diferentes níveis de criticidade
- **Gráficos de telemetria** (temperatura, combustível, velocidade)
- **Interface responsiva** para desktop e mobile
- **Dados simulados** atualizados em tempo real

## Scripts

```bash
npm run dev    # Desenvolvimento
npm run build  # Build de produção
npm run start  # Servidor de produção
npm run lint   # Verificação de código
```

## Estrutura

```
src/
├── app/           # Pages e layouts (App Router)
├── components/    # Componentes React
├── data/          # Dados simulados
├── hooks/         # Custom hooks
├── lib/           # Utilitários
└── types/         # Definições TypeScript
```

---

Desenvolvido com Next.js 15 e TypeScript
