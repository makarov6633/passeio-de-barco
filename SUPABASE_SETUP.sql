-- ================================================
-- SETUP COMPLETO DO BANCO DE DADOS
-- Caleb's Tour - Sistema de Reservas
-- ================================================

-- 1. CRIAR TABELA DE CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. CRIAR TABELA DE PASSEIOS
CREATE TABLE IF NOT EXISTS passeios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  preco_min DECIMAL(10,2),
  preco_max DECIMAL(10,2),
  duracao VARCHAR(100),
  local VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. CRIAR TABELA DE RESERVAS
CREATE TABLE IF NOT EXISTS reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id),
  passeio_id UUID REFERENCES passeios(id),
  data_passeio DATE NOT NULL,
  num_pessoas INTEGER NOT NULL,
  voucher VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDENTE',
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. CRIAR TABELA DE CONTEXTO DE CONVERSAS (para o agente de IA)
CREATE TABLE IF NOT EXISTS conversation_contexts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telefone VARCHAR(20) NOT NULL,
  context JSONB NOT NULL,
  last_updated TIMESTAMP DEFAULT NOW()
);

-- 5. INSERIR PASSEIOS PADRÃO
INSERT INTO passeios (nome, descricao, preco_min, preco_max, duracao, local)
VALUES 
  (
    'Passeio de Barco - Arraial do Cabo',
    'Conheça as praias paradisíacas de Arraial do Cabo em um passeio inesquecível!',
    150.00,
    280.00,
    '4-5 horas',
    'Arraial do Cabo'
  ),
  (
    'Escuna - Búzios',
    'Passeio de escuna pelas 3 ilhas de Búzios com paradas para mergulho',
    120.00,
    200.00,
    '3-4 horas',
    'Búzios'
  ),
  (
    'Jet Ski',
    'Aventura de jet ski pelas águas cristalinas',
    200.00,
    350.00,
    '30min-1h',
    'Arraial do Cabo'
  )
ON CONFLICT DO NOTHING;

-- ================================================
-- PRONTO! Tabelas criadas com sucesso!
-- ================================================
