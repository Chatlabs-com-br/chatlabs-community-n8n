# Contributing

## Publicar nova versão no npm

Pacote: [`n8n-nodes-chatlabs`](https://www.npmjs.com/package/n8n-nodes-chatlabs)

```bash
# 1. Build
yarn build

# 2. Commitar o dist (ele é versionado no git)
git add dist && git commit -m "build: update dist"

# 3. Subir versão (cria commit + tag)
npm version patch   # ou minor / major

# 4. Publicar
npm publish

# 5. Enviar commit + tag
git push --follow-tags
```

> `npm version` falha se o working tree estiver sujo — por isso commitar o `dist` antes.

## Autenticação

A publicação usa **Granular Access Token** com bypass de 2FA.

1. npmjs.com → **Access Tokens** → **Generate New Token** → **Granular Access Token**
2. Permissão **Read and write** no pacote `n8n-nodes-chatlabs`
3. Marcar **Bypass two-factor authentication**
4. Configurar:
   ```bash
   npm config set //registry.npmjs.org/:_authToken=<TOKEN>
   npm whoami   # deve mostrar: eduardoxlord
   ```

O token expira (máx. 90 dias) — se o publish falhar, gerar outro.

## Erros comuns

| Erro | Causa | Solução |
|---|---|---|
| `E401` no `npm whoami` | Token expirado/revogado | Gerar novo token |
| `E404` no `PUT` do publish | Não autenticado (npm devolve 404) | Gerar novo token |
| `E403 Two-factor authentication ... is required` | Token sem bypass de 2FA | Gerar token com **Bypass 2FA** marcado |
| `E403 cannot publish over previously published version` | Versão já existe | `npm version patch` de novo |
