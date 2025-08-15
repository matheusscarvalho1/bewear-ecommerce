# Bewear - E-commerce de Moda

## Visão Geral

Bewear é uma aplicação de e-commerce moderna, desenvolvida para proporcionar alta performance, escalabilidade e uma experiência de usuário diferenciada. O projeto utiliza o que há de mais atual no ecossistema React/Next.js, integrações robustas com métodos de pagamento (Stripe), autenticação segura, arquitetura modular e foco em boas práticas de desenvolvimento fullstack.

---

## Tecnologias e Ferramentas Utilizadas

- **Next.js 15**: Framework React para aplicações web modernas, com suporte a server components, server actions, roteamento avançado e otimizações automáticas.
- **React 19**: Biblioteca para construção de interfaces reativas, declarativas e com novo modelo de rendering.
- **TypeScript**: Tipagem estática para maior segurança, produtividade e refatoração.
- **TailwindCSS**: Utilitário de CSS para estilização rápida, responsiva e consistente.
- **Drizzle ORM**: ORM moderno para Node.js, utilizado para modelagem, migrations e manipulação do banco de dados relacional (PostgreSQL).
- **PostgreSQL**: Banco de dados relacional robusto, seguro e escalável.
- **Stripe**: Plataforma de pagamentos utilizada para processar transações, criar sessões de checkout e receber notificações via webhooks.
- **React Query (@tanstack/react-query)**: Gerenciamento de estado assíncrono, cache de dados, sincronização e revalidação automática no frontend.
- **Better Auth**: Solução de autenticação moderna, com suporte a login social (Google) e email/senha, integração com Drizzle ORM e gerenciamento de sessão seguro.
- **Zod**: Validação de schemas e dados, tanto no backend quanto no frontend.
- **Radix UI**: Componentes de UI acessíveis, customizáveis e com foco em acessibilidade.
- **React Hook Form**: Gerenciamento de formulários, validação e integração com Zod.
- **Lucide React**: Ícones modernos e customizáveis para interfaces ricas.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **ESLint, Prettier**: Padronização de código, linting e formatação automática.
- **Vercel**: Deploy rápido, escalável e com preview automático de PRs.

---

## Principais Funcionalidades

- **Catálogo de Produtos**: Listagem, filtragem, busca e visualização de produtos e variantes (cores, tamanhos, etc).
- **Carrinho de Compras**: Adição, remoção, alteração de quantidade, seleção e gerenciamento de endereço de entrega.
- **Checkout Integrado com Stripe**: Criação de sessão de pagamento, redirecionamento seguro e confirmação automática via webhook.
- **Gestão de Pedidos**: Histórico de pedidos, status (pendente, pago, cancelado), detalhes completos e rastreabilidade.
- **Autenticação Completa**: Login via Google ou email/senha, gerenciamento de sessão, proteção de rotas e recuperação de senha.
- **Endereços de Entrega**: Cadastro, seleção, edição e gerenciamento de múltiplos endereços por usuário.
- **Painel do Usuário**: Visualização de pedidos, endereços, informações pessoais e preferências.
- **Acessibilidade**: Componentes com foco em acessibilidade (Radix UI, navegação por teclado, ARIA).
- **Internacionalização (i18n)**: Estrutura pronta para múltiplos idiomas.
- **Responsividade**: Layout adaptado para mobile, tablet e desktop.
- **UX Moderna**: Feedback visual, loaders, animações e navegação fluida.

---

## Arquitetura e Métodos de Desenvolvimento

### Server Actions + React Query

- Utilização de **server actions** do Next.js para manipulação de dados sensíveis e operações críticas (ex: adicionar/remover produtos do carrinho, finalizar pedido, etc), garantindo segurança e performance.
- **React Query** para cache, sincronização e atualização automática dos dados do lado do cliente, proporcionando uma experiência fluida e responsiva.
- Hooks customizados encapsulam as server actions, promovendo separação de responsabilidades, reuso de lógica e fácil manutenção.

### Autenticação

- Implementada com **Better Auth** e integração com Drizzle ORM.
- Suporte a login social (Google) e email/senha, com fluxo de cadastro, login e logout.
- Sessões persistentes, seguras e proteção de rotas sensíveis.
- Estrutura pronta para autenticação multifator (MFA) e recuperação de senha.

### Banco de Dados

- Modelagem relacional com Drizzle ORM e PostgreSQL.
- Tabelas para usuários, sessões, contas, verificações, categorias, produtos, variantes, endereços, carrinho, pedidos e itens de pedido.
- Scripts de seed para popular o banco com categorias, produtos e variantes.
- Migrations versionadas e seguras.

### Integração com Stripe (Pagamentos)

- Criação de sessão de checkout Stripe via server action, com envio de metadados do pedido.
- Webhook Stripe configurado para receber notificações de pagamento e atualizar o status do pedido automaticamente.
- Segurança garantida por validação de assinatura do Stripe no webhook.
- Suporte a múltiplos métodos de pagamento e fácil expansão para outros gateways.

#### Exemplo de Webhook Stripe:

```ts
export const POST = async (request: Request) => {
  // ...
  const signature = request.headers.get("stripe-signature");
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );
  if (event.type === "checkout.session.completed") {
    // Atualiza status do pedido para 'paid'
  }
  // ...
};
```

---

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente (`.env.local`):
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
   - DATABASE_URL
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - NEXT_PUBLIC_APP_URL
   - Outras necessárias
3. Execute as migrations e o seed do banco:
   ```bash
   npm run drizzle-kit:push
   npm run drizzle-kit:seed
   ```
4. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. (Opcional) Execute os testes:
   ```bash
   npm run test
   ```

---

## Estrutura de Pastas

- `src/app/` - Páginas, rotas, server actions e API routes
- `src/actions/` - Server actions para manipulação de dados e integrações
- `src/db/` - Schema, conexão, migrations e seed do banco
- `src/lib/` - Lógicas utilitárias (auth, utils, helpers)
- `src/hooks/` - Hooks customizados (queries e mutations React Query)
- `src/components/` - Componentes de UI reutilizáveis, comuns e de layout
- `public/` - Imagens, ícones e assets estáticos

---

## Padrões Adotados

- **Componentização**: UI modular, reutilizável e fácil de manter.
- **Acessibilidade**: Uso de Radix UI, ARIA e navegação por teclado.
- **Responsividade**: Layout mobile-first com TailwindCSS.
- **Validação**: Zod para schemas e validação de dados em todas as camadas.
- **Padronização de Código**: ESLint, Prettier e convenções de projeto.
- **Deploy**: Pronto para deploy na Vercel, com preview automático de PRs.

---
