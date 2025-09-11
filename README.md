# BEWEAR - E-commerce de Roupas

## 📋 Descrição

BEWEAR é uma plataforma de e-commerce moderna desenvolvida com Next.js 15, focada na venda de roupas e acessórios. O projeto implementa uma arquitetura full-stack com autenticação, gerenciamento de carrinho, processamento de pagamentos e sistema de pedidos.

## 🚀 Tecnologias Principais

### Frontend

- **Next.js 15** - Framework React com App Router e Server Components
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS 4** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes baseada em Radix UI
- **Radix UI** - Componentes de interface acessíveis
- **Lucide React** - Ícones modernos
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas

### Backend & Banco de Dados

- **Drizzle ORM** - ORM TypeScript-first para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Better Auth** - Sistema de autenticação moderno
- **Stripe** - Processamento de pagamentos

### Estado & Cache

- **TanStack Query (React Query)** - Gerenciamento de estado do servidor
- **Server Actions** - Ações do servidor integradas ao Next.js

### Ferramentas de Desenvolvimento

- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Drizzle Kit** - Migrações e seed do banco de dados

### 🛠️ Método de Desenvolvimento

- **Mobile First**
- O design e a interface foram planejados priorizando dispositivos móveis.
- Componentes responsivos adaptam-se a diferentes tamanhos de tela.
- Layouts, grids e tipografia foram otimizados para experiência mobile antes do desktop.
- Utilização de Tailwind CSS para facilitar a criação de breakpoints e estilos responsivos.

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas

```
src/
├── app/                    # App Router do Next.js 15
│   ├── api/               # Rotas da API (Stripe webhooks)
│   ├── authentication/    # Páginas de autenticação
│   ├── cart/             # Páginas do carrinho (identificação, confirmação)
│   ├── category/         # Páginas de categorias
│   ├── checkout/         # Páginas de checkout
│   ├── my-orders/        # Páginas de pedidos
│   └── product-variant/  # Páginas de produtos
├── actions/              # Server Actions
│   ├── add-cart-product/ # Adicionar produtos ao carrinho
│   ├── get-cart/         # Buscar carrinho
│   ├── finish-order/     # Finalizar pedido
│   └── ...               # Outras ações
├── components/           # Componentes reutilizáveis
│   ├── common/          # Componentes comuns (Header, Footer, Cart)
│   └── ui/              # Componentes shadcn/ui
├── data/                # Funções de acesso a dados (Server Components)
├── db/                  # Configuração do banco de dados
├── hooks/               # Custom hooks React (queries e mutations)
├── lib/                 # Utilitários e configurações
└── providers/           # Providers React
```

### Padrões de Desenvolvimento

#### Server Components

- Utilização extensiva de Server Components do Next.js 15
- Renderização no servidor para melhor performance
- SEO otimizado com metadados dinâmicos

#### Server Actions

- Ações do servidor para operações de dados
- Validação com Zod
- Integração com React Hook Form
- Autenticação automática via headers

#### Gerenciamento de Estado

- TanStack Query para cache e sincronização de dados
- Server State management
- Otimistic updates
- Hooks customizados para queries e mutations

## 🔐 Sistema de Autenticação

### Better Auth

- Autenticação com email/senha
- Login social com Google OAuth
- Sessões seguras com tokens
- Verificação de email

### Funcionalidades

- Registro e login de usuários
- Login social com Google OAuth
- Recuperação de senha
- Perfil de usuário
- Sessões persistentes
- Middleware de checagem de autenticação (`checkAuthentication`)

## 🛒 Sistema de E-commerce

### Produtos e Categorias

- Catálogo de produtos com variantes
- Sistema de categorias
- Busca e filtros
- Imagens otimizadas

### Carrinho de Compras

- Adição/remoção de produtos com verificação de autenticação
- Atualização de quantidades
- Persistência de dados
- Cálculo de totais
- Verificação de carrinho vazio
- Toast notifications para feedback do usuário

### Checkout e Pagamentos

- Integração com Stripe
- Processamento seguro de pagamentos
- Webhooks para confirmação
- Histórico de pedidos

### Endereços de Entrega

- Múltiplos endereços por usuário
- Seleção de endereço para entrega
- Validação de endereços
- Formulário de cadastro de novos endereços

## 💳 Integração com Stripe

### Funcionalidades

- Criação de sessões de checkout
- Processamento de pagamentos
- Webhooks para atualizações
- Histórico de transações

### Segurança

- Verificação de assinatura de webhooks
- Tokens seguros
- Validação de sessões

## 🎨 Interface do Usuário

### Design System

- Componentes baseados em shadcn/ui e Radix UI
- Sistema de design consistente e acessível
- Tema escuro/claro
- Responsividade completa
- Componentes customizáveis com Tailwind CSS

### Componentes Principais

- Header com navegação e carrinho
- Footer informativo
- Cards de produtos
- Formulários validados com React Hook Form
- Modais e sheets
- Componentes shadcn/ui (Button, Card, Dialog, Form, Input, etc.)
- Carrinho lateral com estados de autenticação
- Resumo de compra com valores unitários e totais

## 📊 Banco de Dados

### Schema Principal

- **Users** - Informações dos usuários
- **Products** - Catálogo de produtos
- **Categories** - Categorias de produtos
- **Cart** - Carrinho de compras
- **Orders** - Pedidos realizados
- **Shipping Addresses** - Endereços de entrega

### Relacionamentos

- Usuários podem ter múltiplos endereços
- Produtos pertencem a categorias
- Carrinho vinculado ao usuário
- Pedidos com histórico completo

## 🔧 Configuração e Deploy

### Variáveis de Ambiente Necessárias

```env
DATABASE_URL=postgresql://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
NEXT_PUBLIC_APP_URL=...
```

### Scripts Disponíveis

- `npm run dev` - Desenvolvimento local
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código

## 🚀 Funcionalidades Principais

### Para Usuários

- Navegação por categorias
- Busca de produtos
- Carrinho de compras
- Checkout seguro
- Histórico de pedidos
- Gerenciamento de perfil

### Para Administradores

- Dashboard de vendas
- Gerenciamento de produtos
- Controle de estoque
- Relatórios de pedidos

## 📱 Responsividade

- Design mobile-first
- Performance otimizada

## 🔒 Segurança

- Autenticação segura
- Validação de dados
- Sanitização de inputs

## 📈 Performance

- Server Components para renderização
- Otimização de imagens
- Lazy loading
- Cache inteligente
- Parallel data fetching (Promise.all) para funções independentes
- Server Actions otimizadas
- Cálculos de totais em paralelo
- Queries paralelas para produtos relacionados

---

## 👨‍💻 Desenvolvido por

**Matheus Carvalho**

- LinkedIn: [@matheusscarvalho](https://www.linkedin.com/in/matheusscarvalho/)
- GitHub: [@matheusscarvalho1](https://github.com/matheusscarvalho1)
