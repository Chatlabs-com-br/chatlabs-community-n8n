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
| Obter Arquivo de Mensagem | GET | `/api/chat/message/:id/file` |

#### Cliente
| Operação | Método | Endpoint |
|---|---|---|
| Listar | GET | `/api/client` |
| Obter por ID | GET | `/api/client/:id` |
| Criar | POST | `/api/client` |
| Atualizar | PUT | `/api/client/:id` |
| Deletar | DELETE | `/api/client/:id` |

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
