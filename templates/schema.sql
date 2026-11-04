-- Tabelas usadas pelo template atendimento-ia.json (histórico, debounce e log de erro).
-- Se o Postgres já tem o schema chatlabs (Mase/UAI/Voalle/Martelli), não precisa rodar.
CREATE SCHEMA IF NOT EXISTS chatlabs;

CREATE TABLE IF NOT EXISTS chatlabs.chat_sessions (
  chat_id             TEXT PRIMARY KEY,
  company_id          INTEGER NOT NULL,
  client_name         TEXT,
  client_phone        TEXT,
  attendant_id        TEXT,
  last_interaction_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chatlabs.chat_messages (
  id          BIGSERIAL PRIMARY KEY,
  chat_id     TEXT NOT NULL,
  company_id  INTEGER NOT NULL,
  direction   TEXT NOT NULL,        -- incoming | outgoing
  sender_type TEXT NOT NULL,        -- client | ai
  conteudo    TEXT,
  tipo_midia  TEXT,                 -- TEXT, AUDIO, IMAGE, BLOQUEIO_SAIDA, BLOQUEIO_ENTRADA:<motivo>...
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS chat_messages_chat_id_id_idx ON chatlabs.chat_messages (chat_id, id);

CREATE TABLE IF NOT EXISTS chatlabs.error_log (
  id            BIGSERIAL PRIMARY KEY,
  workflow_name TEXT,
  node_name     TEXT,
  error_message TEXT,
  execution_id  TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
