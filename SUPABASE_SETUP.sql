-- ============================================
-- CALEB'S TOUR - SETUP DO BANCO DE DADOS
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20) NOT NULL UNIQUE,
  whatsapp VARCHAR(20),
  total_reservas INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Reservas
CREATE TABLE IF NOT EXISTS reservas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  nome_cliente VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  passeio_id VARCHAR(100) NOT NULL,
  passeio_nome VARCHAR(255) NOT NULL,
  data_preferida DATE NOT NULL,
  data_confirmada DATE,
  numero_pessoas INTEGER DEFAULT 1,
  valor_estimado DECIMAL(10, 2),
  observacoes TEXT,
  voucher VARCHAR(50) UNIQUE,
  status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'cancelado', 'realizado')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Passeios (opcional - catálogo)
CREATE TABLE IF NOT EXISTS passeios (
  id VARCHAR(100) PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  categoria VARCHAR(100),
  descricao TEXT,
  duracao VARCHAR(50),
  preco_base DECIMAL(10, 2),
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Contextos de Conversação (para o agente IA)
CREATE TABLE IF NOT EXISTS conversation_contexts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  telefone VARCHAR(20) UNIQUE NOT NULL,
  context_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_reservas_status ON reservas(status);
CREATE INDEX IF NOT EXISTS idx_reservas_data ON reservas(data_preferida);
CREATE INDEX IF NOT EXISTS idx_reservas_cliente ON reservas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_reservas_voucher ON reservas(voucher);
CREATE INDEX IF NOT EXISTS idx_clientes_telefone ON clientes(telefone);
CREATE INDEX IF NOT EXISTS idx_contexts_telefone ON conversation_contexts(telefone);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_clientes_updated_at
  BEFORE UPDATE ON clientes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservas_updated_at
  BEFORE UPDATE ON reservas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contexts_updated_at
  BEFORE UPDATE ON conversation_contexts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger para incrementar total_reservas do cliente
CREATE OR REPLACE FUNCTION increment_cliente_reservas()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE clientes 
  SET total_reservas = total_reservas + 1 
  WHERE id = NEW.cliente_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_reservas_count
  AFTER INSERT ON reservas
  FOR EACH ROW
  EXECUTE FUNCTION increment_cliente_reservas();

-- Inserir dados de exemplo de passeios
INSERT INTO passeios (id, nome, categoria, duracao, preco_base) VALUES
  ('barco-arraial', 'Passeio de Barco - Arraial', 'Passeios de Barco', '3h30 a 4h', 150.00),
  ('barco-buzios', 'Escuna - Búzios', 'Passeios de Barco', '2h30', NULL),
  ('barco-cabofrio', 'Passeio de Barco - Cabo Frio', 'Passeios de Barco', '2h30 a 3h', NULL),
  ('quadriciclo', 'Quadriciclo', 'Aventura Off-Road', '2h30', NULL),
  ('buggy', 'Passeio de Buggy', 'Aventura Off-Road', '2h', NULL),
  ('mergulho', 'Mergulho de Batismo', 'Esportes Aquáticos', '2-3h', NULL),
  ('jet-ski', 'Jet Ski', 'Esportes Aquáticos', '20-30min', NULL),
  ('rio-de-janeiro', 'City Tour Rio', 'City Tours', 'Dia inteiro', NULL),
  ('lancha', 'Lancha Privada', 'Passeios de Barco', 'Personalizado', NULL)
ON CONFLICT (id) DO NOTHING;

-- Habilitar Row Level Security (RLS)
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE passeios ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_contexts ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (permissão total para service role)
CREATE POLICY "Service role can do anything on clientes"
  ON clientes FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can do anything on reservas"
  ON reservas FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can read passeios"
  ON passeios FOR SELECT
  TO anon, authenticated
  USING (ativo = true);

CREATE POLICY "Service role can do anything on contexts"
  ON conversation_contexts FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- View para estatísticas (opcional)
CREATE OR REPLACE VIEW reservas_stats AS
SELECT 
  COUNT(*) as total_reservas,
  COUNT(*) FILTER (WHERE status = 'pendente') as pendentes,
  COUNT(*) FILTER (WHERE status = 'confirmado') as confirmadas,
  COUNT(*) FILTER (WHERE status = 'realizado') as realizadas,
  COUNT(*) FILTER (WHERE status = 'cancelado') as canceladas,
  SUM(numero_pessoas) as total_pessoas,
  COUNT(DISTINCT cliente_id) as total_clientes
FROM reservas;

-- ============================================
-- CONFIGURAÇÃO COMPLETA!
-- 
-- Próximos passos:
-- 1. Copie as credenciais do Supabase:
--    - Project URL
--    - Anon/Public Key  
--    - Service Role Key
-- 2. Cole no arquivo .env.local
-- 3. Restart do servidor Next.js
-- ============================================
