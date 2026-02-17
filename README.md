# Atendimento Frontend

Interface web para gerenciamento de ordens de servico tecnico, construida com Vue 3 e Vite.

## Tecnologias

- **Vue 3** (Composition API)
- **Vite 7** - build tool
- **Axios** - requisicoes HTTP
- **CSS** customizado - UI moderna com tema indigo/violeta

## Funcionalidades

- Criar novas ordens de servico (cliente, equipamento, descricao)
- Listar todas as ordens de servico em tabela
- Status com badges coloridos (ABERTA, EM ANDAMENTO, FINALIZADA)
- Layout responsivo

## Estrutura

```
src/
├── assets/
│   └── main.css                  # Estilos globais
├── components/
│   ├── OrdemServicoForm.vue      # Formulario de nova OS
│   └── OrdemServicoList.vue      # Tabela de ordens
├── services/
│   └── api.js                    # Axios conectado ao backend
├── App.vue                       # Componente principal
└── main.js                       # Entry point
```

## Configuracao Local

### Pre-requisitos

- Node.js 20+ ou 22+

### Instalar dependencias

```bash
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:5173

### Build para producao

```bash
npm run build
```

## Deploy

- **Hosting:** [Vercel](https://vercel.com)
- **URL de producao:** https://atendimento-frontend-six.vercel.app

## Backend

A API REST Spring Boot esta em um repositorio separado:
[service_order_manager](https://github.com/josue-pinto/service_order_manager)

## Licenca

Este projeto e de uso academico/pessoal.
