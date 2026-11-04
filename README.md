# n8n-nodes-chatlabs

Custom nodes do [Chatlabs](https://chatlabs.com.br) para o [n8n](https://n8n.io), permitindo integrar a plataforma de atendimento Chatlabs em seus fluxos de automação.

---

## Nodes disponíveis

### Chatlabs (node de ação)

Node principal com suporte a 6 recursos e suas respectivas operações:

#### Atendente
| Operação | Método | Endpoint |
|---|---|---|
| Listar | GET | `/api/attendant` |
| Obter por ID | GET | `/api/attendant/:id` |

#### Canal
| Operação | Método | Endpoint |
|---|---|---|
| Listar | GET | `/api/channel` |

#### Chat
| Operação | Método | Endpoint |
|---|---|---|
| Listar | GET | `/api/chat` |
| Obter por ID | GET | `/api/chat/:id` |
| Listar Mensagens | GET | `/api/chat/:id/messages` |
| Enviar Mensagem | POST | `/api/chat/:id/message` |
| Enviar Template | POST | `/api/send-message` (`type: WHATSAPP_TEMPLATE`, inicia conversa com template aprovado; com "Enviar Arquivo" manda o arquivo do cabeçalho em multipart) |
| Transferir | POST | `/api/chat/:id/transfer` (atendente, departamento, atendente disponível ou fluxo do bot) |
| Enviar Mensagem de Sistema | POST | `/api/chat/:id/message` (com `subject: "SYSTEM"`) |
| Obter Arquivo de Mensagem | GET | `/api/chat/message/:id/file` |
| Enviar Digitando | POST | `/api/chat/:id/typing-indicator` (`type: TEXT \| AUDIO`, só WhatsApp API oficial; some após 25s) |

#### Cliente
| Operação | Método | Endpoint |
|---|---|---|
| Listar | GET | `/api/client` |
| Obter por ID | GET | `/api/client/:id` |
| Criar | POST | `/api/client` |
| Atualizar | PUT | `/api/client/:id` |
| Deletar | DELETE | `/api/client/:id` |
| Adicionar Etiqueta | POST | `/api/client/:id/add-tag` (`tagName` ou `tagId`) |
| Remover Etiqueta | POST | `/api/client/:id/remove-tag` (`tagName` ou `tagId`) |

#### Etiqueta
| Operação | Método | Endpoint |
|---|---|---|
| Listar | GET | `/api/client-tag` |
| Obter por ID | GET | `/api/client-tag/:id` |
| Criar | POST | `/api/client-tag` |
| Atualizar | PATCH | `/api/client-tag/:id` |
| Deletar | DELETE | `/api/client-tag/:id` |

#### Setor
| Operação | Método | Endpoint |
|---|---|---|
| Listar | GET | `/api/department` |
| Obter por ID | GET | `/api/department/:id` |

---

### Chatlabs Trigger (node de gatilho)

Inicia um fluxo quando o Chatlabs dispara um evento via **Bot Action**. Expõe um webhook no caminho `chatlabs-trigger` que deve ser configurado como URL de destino na Bot Action do Chatlabs.

Além do `body`, `headers` e `query` crus, a saída traz campos prontos para mapear:

| Campo | Origem |
|---|---|
| `event` | `body.event` em maiúsculas (`MESSAGE`, `TRANSFER`...) |
| `chatId`, `companyId` | `body.chatId`, `body.companyId` (número) |
| `attendantId` | `body.attendant.id` |
| `clientName`, `clientPhone` | `body.client.name`, `body.client.phone` |
| `text` | texto da mensagem ou título do botão/lista clicado; vazio quando `fromActionBlock` |
| `actionOption` | opção do menu quando o chat veio de bloco de ação |
| `messageType` | `body.message.type` em maiúsculas (`TEXT`, `AUDIO`, `IMAGE`, `INTERACTIVE`...) |
| `fileUrl` | `body.message.file.url` |
| `fromActionBlock` | `true` quando é transferência vinda de bloco de ação |

---

## Uso com AI Agent

O node **Chatlabs** tem `usableAsTool`, então pode ser ligado direto na entrada **Tool** do AI Agent (transferir chat, etiquetar cliente, buscar cliente etc.). Use `$fromAI()` nos campos que o agente deve preencher.

> Em versões do n8n que ainda bloqueiam community nodes como tool, defina `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true` no container.

## Template: atendente de IA

`templates/atendimento-ia.json` é um fluxo pronto de atendimento com IA (OpenAI), baseado no fluxo da Martelli (CHATLABS-916):

Bot Action → config/validação → áudio (transcrição) e imagem (análise) viram texto → Postgres → digitando → debounce → filtro de entrada (prompt injection, SQL, segredos) → AI Agent → filtro de saída (valores, horários, links/telefones não oficiais, vazamento de prompt) → responde ou transfere para setor humano com nota interna.

Para usar:

1. Rode `templates/schema.sql` no Postgres (se as tabelas `chatlabs.*` ainda não existirem).
2. No n8n, **Import from File** com `templates/atendimento-ia.json`.
3. No node **NORM**, preencha `company_id`, `departamento_humano_id`, `nome_ia`, `nome_empresa` e quais regras do filtro de saída ligar.
4. No node **AGENTE**, troque todo `PREENCHER` do system message (condução, regras e BASE de conhecimento).
5. Configure as credenciais Chatlabs API, OpenAI e Postgres.
6. Aponte a Bot Action para a **Production URL** do Chatlabs Trigger.

---

## Credenciais

Configure a credencial **Chatlabs API** com:

- **API Key** — Bearer token gerado no painel do Chatlabs
- **Base URL** — URL base da sua instância (ex: `https://app.chatlabs.com.br`)

---

## Instalação

### Opção 1 — Via npm (recomendado)

No painel do n8n, acesse **Settings > Community Nodes** e instale o pacote:

```
n8n-nodes-chatlabs
```

Ou, se estiver rodando n8n via CLI:

```bash
npm install n8n-nodes-chatlabs
```

### Opção 2 — Copiando o build para o servidor Docker

Use essa opção para desenvolvimento local ou para ambientes sem acesso ao npm.

**1. Instale as dependências e faça o build:**

```bash
yarn install
yarn build
```

**2. Copie os arquivos compilados para o container e reinicie:**

```bash
docker cp . n8n:/home/node/.n8n/custom/chatlabs-community-n8n && docker restart n8n
```

> Na primeira vez, é necessário registrar o pacote dentro do container:
>
> ```bash
> docker exec -u root n8n sh -c "cd /home/node/.n8n/nodes && npm install /home/node/.n8n/custom/chatlabs-community-n8n"
> docker restart n8n
> ```
>
> Nas atualizações seguintes, basta buildar, copiar e reiniciar.

---

## Desenvolvimento

```bash
# Build único
yarn build

# Watch mode (recompila a cada alteração)
yarn dev
```
