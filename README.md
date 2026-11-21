# 🤖 OmniAI — Plataforma Inteligente de Automação Empresarial

> Plataforma multiempresa para centralização de comunicações, gerenciamento de atividades e automação de processos utilizando Inteligência Artificial.

## 📌 Sobre o projeto

O **OmniAI** é uma plataforma de automação empresarial desenvolvida para integrar diferentes canais de comunicação, organizar solicitações e otimizar processos internos por meio de Inteligência Artificial.

A proposta é permitir que empresas gerenciem seus colaboradores, acompanhem atividades e automatizem fluxos de trabalho em um ambiente centralizado.

O sistema contará com dois ambientes principais: um **portal administrativo**, destinado às empresas, e um **portal do usuário**, voltado aos colaboradores.

O projeto está em desenvolvimento e faz parte de um processo de aprendizado prático em desenvolvimento backend, banco de dados, integração de sistemas e arquitetura de software.

## 🎯 Objetivos

- Centralizar comunicações empresariais.
- Permitir o cadastro e gerenciamento de empresas e usuários.
- Automatizar tarefas e solicitações internas.
- Integrar WhatsApp, Microsoft Teams e assistentes de IA.
- Disponibilizar dashboards e indicadores gerenciais.
- Notificar colaboradores sobre mensagens e atividades próximas do prazo.
- Registrar execuções e ações para acompanhamento e auditoria.

## 🛠️ Tecnologias

| Tecnologia | Utilização |
|---|---|
| Node.js | Ambiente de execução do backend |
| TypeScript | Linguagem principal do backend |
| Express.js | Desenvolvimento da API REST |
| MySQL | Banco de dados relacional |
| MySQL2 | Comunicação entre Node.js e MySQL |
| dotenv | Gerenciamento de variáveis de ambiente |
| React | Interface web (planejado) |
| n8n | Automação de workflows (planejado) |
| OpenAI API | Integração de IA (planejado) |
| WhatsApp Cloud API | Comunicação pelo WhatsApp (planejado) |
| Microsoft Teams | Comunicação corporativa (planejado) |

## 🏗️ Arquitetura

O backend utiliza uma arquitetura modular, organizada em três camadas principais:

**Routes → Controllers → Services → Database**

- **Routes:** definem os endpoints HTTP.
- **Controllers:** recebem as requisições, validam dados e retornam respostas.
- **Services:** implementam as operações de acesso aos dados.
- **Database:** armazena as informações de forma persistente no MySQL.

Essa separação facilita a manutenção, a organização e a evolução do sistema.

## 📁 Estrutura do projeto

```text
omniai-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── modules/
│   │   │   ├── users/
│   │   │   │   ├── users.types.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   ├── users.controller.ts
│   │   │   │   └── users.routes.ts
│   │   │   ├── companies/
│   │   │   │   ├── companies.types.ts
│   │   │   │   ├── companies.service.ts
│   │   │   │   ├── companies.controller.ts
│   │   │   │   └── companies.routes.ts
│   │   │   └── conversations/
│   │   │       └── conversations.types.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
├── ai-service/
├── automation/
├── database/
├── docs/
└── README.md
```

*Estrutura atual e planejada. Algumas pastas ainda serão preenchidas durante o desenvolvimento. O arquivo `.env.example` será adicionado para documentar a configuração.*

## 🗄️ Banco de dados

O projeto utiliza MySQL, com o banco `omniai_bd`.

As tabelas atuais são:

| Tabela | Descrição |
|---|---|
| `empresas` | Cadastro das organizações |
| `usuarios` | Usuários vinculados às empresas |
| `canais` | Canais de comunicação |
| `conversas` | Conversas realizadas |
| `mensagens` | Mensagens das conversas |
| `solicitacoes` | Solicitações registradas |
| `aprovacoes` | Aprovações de solicitações |
| `logs_automacoes` | Histórico de execuções |
| `logs_auditoria` | Histórico de ações do sistema |

As tabelas `atividades` e `avisos` estão previstas para próximas etapas.

O banco utiliza chaves primárias e estrangeiras para estabelecer relacionamentos entre as entidades.

## 🔗 Endpoints da API

### Usuários

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/users` | Listar usuários |
| GET | `/users/:id` | Buscar usuário por ID |
| POST | `/users` | Cadastrar usuário |

### Empresas

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/companies` | Listar empresas |
| POST | `/companies` | Cadastrar empresa |

### Verificação

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/health` | Verificar o funcionamento da API |

**Atenção:** os endpoints estão em fase de desenvolvimento e ainda não possuem autenticação e autorização. Não devem ser expostos publicamente nessa condição.

## 🚀 Como executar o projeto

### Pré-requisitos

- Node.js e npm
- MySQL Server 8.0
- Banco `omniai_bd` criado
- Git

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
cd omniai-platform/backend
```

Substitua `URL_DO_REPOSITORIO` pelo endereço real do projeto no GitHub.

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar o ambiente

Crie um arquivo `.env` dentro da pasta `backend`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=SUA_SENHA
DB_NAME=omniai_bd
```

O banco e suas tabelas precisam estar previamente criados no MySQL. A disponibilização de scripts de migração está planejada.

**Nunca publique o arquivo `.env` com credenciais reais.**

### 4. Iniciar o servidor

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3333
```

Para verificar seu funcionamento:

```text
http://localhost:3333/health
```

## 🖥️ Funcionalidades planejadas

### Portal da empresa

O ambiente administrativo permitirá:

- Cadastro e gerenciamento de colaboradores.
- Controle de permissões.
- Dashboard com indicadores.
- Acompanhamento de atividades e solicitações.
- Gerenciamento de automações.
- Visualização de históricos e relatórios.

### Portal do usuário

O ambiente do colaborador permitirá:

- Login individual.
- Visualização de mensagens recentes.
- Acompanhamento de atividades atribuídas.
- Avisos sobre prazos próximos.
- Consulta de solicitações.
- Interação com assistentes de IA.

### Inteligência Artificial e automação

A plataforma também deverá permitir:

- Atendimento automatizado.
- Interpretação e classificação de solicitações.
- Integração com canais de comunicação.
- Execução de workflows pelo n8n.
- Encaminhamento de tarefas.
- Fluxos de aprovação com supervisão humana.

## 🔐 Segurança

O projeto prevê a implementação de:

- Autenticação de usuários.
- Armazenamento seguro de senhas com hash.
- Controle de acesso baseado em permissões.
- Isolamento de dados entre empresas.
- Validação de entradas.
- Proteção de credenciais.
- Registro de auditoria.

Esses mecanismos ainda estão em desenvolvimento.

## 📈 Roadmap

- [x] Configuração inicial do backend.
- [x] API REST com Express e TypeScript.
- [x] Integração com MySQL.
- [x] Cadastro e consulta de usuários.
- [x] Estrutura inicial de empresas.
- [x] Cadastro e consulta de empresas.
- [x] Relacionamento entre empresas e usuários no banco.
- [ ] Cadastro de usuários vinculados à empresa pela API.
- [ ] Autenticação e autorização.
- [ ] Gerenciamento administrativo de colaboradores.
- [ ] Módulo de atividades e prazos.
- [ ] Sistema de avisos e notificações.
- [ ] Dashboard administrativo.
- [ ] Frontend com React.
- [ ] Integração com Inteligência Artificial.
- [ ] Integração com WhatsApp.
- [ ] Integração com Microsoft Teams.
- [ ] Workflows automatizados com n8n.
- [ ] Testes automatizados e documentação da API.
- [ ] Deploy da aplicação.

## 📚 Aprendizados

Durante o desenvolvimento do OmniAI, estão sendo aplicados conceitos de:

- Desenvolvimento de APIs REST.
- Programação assíncrona com `async/await`.
- TypeScript e tipagem estática.
- Arquitetura modular.
- SQL e modelagem relacional.
- Tratamento de erros HTTP.
- Integração entre backend e banco de dados.
- Versionamento com Git e GitHub.

## 📌 Status

**Em desenvolvimento — MVP**

O foco atual é a construção da arquitetura multiempresa, incluindo gerenciamento de usuários, autenticação e permissões.

---

Desenvolvido como projeto de estudo e portfólio em Engenharia de Software, Backend e Inteligência Artificial.