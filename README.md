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
| GET