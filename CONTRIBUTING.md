# Contributing

## Publicar nova versão no npm

Pacote: [`n8n-nodes-chatlabs`](https://www.npmjs.com/package/n8n-nodes-chatlabs)

A publicação é automática pelo workflow `.github/workflows/publish.yml`:

1. No PR, suba a versão sem criar tag:
   ```bash
   npm version patch --no-git-tag-version   # ou minor / major
   yarn build && git add -A && git commit -m "chore: release x.y.z"
   ```
2. Faça o merge na `main`.
3. O workflow vê que a versão do `package.json` ainda não está no npm e pede aprovação no environment `npm` (aba **Actions** → run → **Review deployments**).
4. Depois da aprovação, ele builda, publica com `--provenance` e cria a tag `vX.Y.Z`.

Merge sem mudança de versão não publica nada.

## Autenticação

Usa **Trusted Publishing (OIDC)**, sem token. Configuração no npmjs.com → pacote → **Settings** → **Trusted Publisher**:

| Campo | Valor |
|---|---|
| Publisher | GitHub Actions |
| Organization or user | `Chatlabs-com-br` |
| Repository | `chatlabs-community-n8n` |
| Workflow filename | `publish.yml` |
| Environment name | `npm` |

O environment `npm` precisa existir no GitHub (**Settings** → **Environments**) com **Required reviewers** marcado.

## Erros comuns

| Erro | Causa | Solução |
|---|---|---|
| `E404` no `PUT` do publish | Trusted Publisher não configurado ou com campo errado | Conferir repo, `publish.yml` e environment `npm` no npm |
| `E403 cannot publish over previously published version` | Versão já existe | Subir a versão no `package.json` de novo |
