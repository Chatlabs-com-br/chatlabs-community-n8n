# chatlabs-community-n8n

Projeto de custom nodes do Chatlabs para n8n, rodando em Docker.

## Estrutura do projeto

```
chatlabs-community-n8n/
├── ChatlabsNodes.node.ts              # Node principal com as operações
├── credentials/
│   └── ChatlabsApi.credentials.ts    # Credenciais (API Key + Base URL)
├── index.ts                           # Exportações
├── tsconfig.json
├── package.json                       # Seção "n8n" registra nodes e credentials
└── dist/                              # Arquivos compilados (gerados pelo build)
```

## Como buildar

```bash
yarn build
# ou em watch mode durante desenvolvimento:
yarn dev
```

## Como atualizar o node no container Docker

Sempre que modificar qualquer arquivo `.ts`, rode:

```bash
yarn build && docker cp . n8n:/home/node/.n8n/custom/chatlabs-community-n8n && docker restart n8n
```

## Como o node está instalado no Docker

O n8n 2.x instala community nodes em `/home/node/.n8n/nodes/`. O pacote foi registrado lá com:

```bash
docker exec -u root n8n sh -c "cd /home/node/.n8n/nodes && npm install /home/node/.n8n/custom/chatlabs-community-n8n"
```

O `package.json` em `/home/node/.n8n/nodes/package.json` ficou assim:
```json
{
  "name": "installed-nodes",
  "private": true,
  "dependencies": {
    "n8n-nodes-chatlabs": "file:../custom/chatlabs-community-n8n"
  }
}
```

Isso só precisa ser feito **uma vez**. Nas próximas atualizações, basta buildar, copiar e reiniciar.

## Versão do n8n

`2.12.2` — usa pnpm internamente, mas o diretório `/home/node/.n8n/nodes/` aceita npm normal.

## Endpoints da API

Os endpoints atuais são de exemplo e precisam ser ajustados para a API real do Chatlabs:

| Operação | Método | Endpoint |
|---|---|---|
| Enviar Mensagem | POST | `/v1/conversations/{id}/messages` |
| Criar Conversa | POST | `/v1/conversations` |
| Listar Conversas | GET | `/v1/conversations` |
| Obter Conversa | GET | `/v1/conversations/{id}` |

## Credenciais

O node usa a credential `chatlabsApi` com dois campos:
- `apiKey` — Bearer token enviado no header `Authorization`
- `baseUrl` — URL base da API (ex: `https://api.chatlabs.io`)
