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

### Chatlabs CRM (node de ação)

Consome a API de integração do CRM (`{baseUrl}/api/integration/...`). Usa a credencial **Chatlabs CRM API**. Listagens que devolvem array viram um item por elemento.

#### Funil
| Operação | Método | Endpoint |
|---|---|---|
| Listar (workspaces com boards e colunas) | GET | `/api/integration/workspace/list` |

#### Card (Negociação)
| Operação | Método | Endpoint |
|---|---|---|
| Listar | GET | `/api/integration/card/list` |
| Obter | GET | `/api/integration/card/load/:id` |
| Criar | POST | `/api/integration/card/store` |
| Atualizar | PUT | `/api/integration/card/update/:id` |
| Mover | PUT | `/api/integration/card/move/:id` |
| Listar por Contato | GET | `/api/integration/chatlabs/card/list` |
| Criar para Contato | POST | `/api/integration/chatlabs/card/store` |
| Mover por Contato | PUT | `/api/integration/chatlabs/card/move` |

#### Comentário de Card / Tarefa de Card
| Operação | Método | Endpoint |
|---|---|---|
| Listar comentários | GET | `/api/integration/crm-card-comment/list` |
| Criar comentário | POST | `/api/integration/crm-card-comment/store` |
| Listar tarefas | GET | `/api/integration/crm-card-task/list` |
| Criar tarefa | POST | `/api/integration/crm-card-task/store` |

#### Contato / Empresa / Etiqueta de Card
| Recurso | Endpoints |
|---|---|
| Contato | `/api/integration/contact/{list, load/:id, store, update/:id, delete/:id}` |
| Empresa | `/api/integration/client/{list, load/:id, store, update/:id, delete/:id}` |
| Etiqueta de Card | `/api/integration/crm-tag/{list, load/:id, store, update/:id, delete/:id}` |

#### Usuário
| Operação | Método | Endpoint |
|---|---|---|
| Listar | GET | `/api/integration/user/list` |

---

### Chatlabs Trigger (node de gatilho)

Inicia um fluxo quando o Chatlabs dispara um evento via **Bot Action**. Expõe um webhook no caminho `chatlabs-trigger` que deve ser configurado como URL de destino na Bot Action do Chatlabs.

---

## Credenciais

Configure a credencial **Chatlabs API** com:

- **API Key** — Bearer token gerado no painel do Chatlabs
- **Base URL** — URL base da sua instância (ex: `https://app.chatlabs.com.br`)

Configure a credencial **Chatlabs CRM API** com:

- **Base URL** — URL base da API do CRM
- **Tenant Token** — token da empresa no CRM (header `tenant-token`)
- **System Token** — opcional; enviado no header `system-token` quando preenchido

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
