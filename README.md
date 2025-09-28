# Sistema de Gestão Alyssom Acessórios

Sistema de gestão completo para oficina automotiva desenvolvido com Next.js 14, React 18, TypeScript, React Query, React Hook Form, Zod e Tailwind CSS.

## 🚀 Funcionalidades Implementadas

### ✅ Estrutura Base
- ✅ Configuração de tipos TypeScript para todas as entidades
- ✅ Validações com Zod para todos os formulários
- ✅ Cliente API configurado com Axios e interceptors
- ✅ Hooks React Query para operações CRUD
- ✅ Providers configurados (React Query + Toast)

### ✅ Interface do Dashboard
- ✅ Layout responsivo com sidebar e navegação
- ✅ Dashboard principal com estatísticas
- ✅ Estrutura de rotas completa
- ✅ Sistema de toasts integrado

### ✅ Módulo de Clientes
- ✅ Listagem de clientes com busca e paginação
- ✅ Formulário de cadastro de cliente
- ✅ Visualização detalhada do cliente
- ✅ Edição de cliente (estrutura pronta)
- ✅ Exclusão de cliente com confirmação

### 📋 Entidades Disponíveis
- **Clientes**: Nome, CPF/CNPJ, email, telefone, endereço
- **Veículos**: Marca, modelo, ano, placa, cor, combustível, quilometragem
- **Itens**: Código, nome, descrição, preço, categoria, estoque, fornecedor
- **Serviços**: Código, nome, descrição, preço, tempo estimado, categoria
- **Ordens de Serviço**: Cliente, veículo, itens, serviços, status, valores

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Estilização**: Tailwind CSS
- **Formulários**: React Hook Form + Zod
- **Estado/API**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Ícones**: Lucide React
- **Notificações**: React Hot Toast

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🌐 API Backend

O frontend está configurado para consumir uma API REST. Configure a URL base da API no arquivo `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### Endpoints Esperados:

#### Clientes
- `GET /clientes` - Listar clientes (com paginação)
- `GET /clientes/:uuid` - Obter cliente específico
- `POST /clientes` - Criar cliente
- `PUT /clientes/:uuid` - Atualizar cliente
- `DELETE /clientes/:uuid` - Excluir cliente

#### Veículos
- `GET /veiculos` - Listar veículos
- `GET /clientes/:uuid/veiculos` - Listar veículos do cliente
- `GET /veiculos/:uuid` - Obter veículo específico
- `POST /veiculos` - Criar veículo
- `PUT /veiculos/:uuid` - Atualizar veículo
- `DELETE /veiculos/:uuid` - Excluir veículo

#### Itens
- `GET /itens` - Listar itens
- `GET /itens/search` - Buscar itens (autocomplete)
- `GET /itens/:uuid` - Obter item específico
- `POST /itens` - Criar item
- `PUT /itens/:uuid` - Atualizar item
- `DELETE /itens/:uuid` - Excluir item

#### Serviços
- `GET /servicos` - Listar serviços
- `GET /servicos/search` - Buscar serviços (autocomplete)
- `GET /servicos/:uuid` - Obter serviço específico
- `POST /servicos` - Criar serviço
- `PUT /servicos/:uuid` - Atualizar serviço
- `DELETE /servicos/:uuid` - Excluir serviço

#### Ordens de Serviço
- `GET /ordens-servico` - Listar ordens
- `GET /ordens-servico/:uuid` - Obter ordem específica
- `GET /clientes/:uuid/ordens-servico` - Ordens do cliente
- `GET /veiculos/:uuid/ordens-servico` - Ordens do veículo
- `POST /ordens-servico` - Criar ordem
- `PUT /ordens-servico/:uuid` - Atualizar ordem
- `PATCH /ordens-servico/:uuid/status` - Atualizar status
- `DELETE /ordens-servico/:uuid` - Excluir ordem

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Pages (App Router)
│   ├── dashboard/         # Dashboard layout e páginas
│   │   ├── clientes/     # CRUD de clientes
│   │   ├── veiculos/     # CRUD de veículos
│   │   ├── itens/        # CRUD de itens
│   │   ├── servicos/     # CRUD de serviços
│   │   └── ordens/       # CRUD de ordens de serviço
│   ├── layout.tsx        # Layout root
│   └── page.tsx          # Página inicial (redirect)
├── components/           # Componentes reutilizáveis
│   └── providers/       # Providers (React Query, Toast)
├── hooks/               # Hooks customizados React Query
├── lib/                 # Utilitários
│   ├── api.ts          # Configuração do Axios
│   └── validations.ts  # Schemas Zod
└── types/              # Definições de tipos TypeScript
```

## 🎨 Características da Interface

### Layout Responsivo
- Sidebar retrátil em mobile
- Navegação clara entre módulos
- Design limpo e profissional

### Componentes Reutilizáveis
- Formulários validados automaticamente
- Tabelas com paginação e busca
- Sistema de toast para feedback
- Botões de ação consistentes

### UX/UI Features
- Loading states em todas as operações
- Confirmação para ações destrutivas
- Busca em tempo real
- Paginação eficiente
- Links contextuais entre entidades

## 📝 Próximos Passos

Para expandir o sistema, você pode:

1. **Implementar formulários completos** para veículos, itens e serviços
2. **Adicionar relatórios** e dashboards analíticos
3. **Implementar autenticação** de usuários
4. **Adicionar filtros avançados** nas listagens
5. **Criar módulo de configurações** da oficina
6. **Implementar backup/restore** de dados
7. **Adicionar impressão** de ordens de serviço

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.