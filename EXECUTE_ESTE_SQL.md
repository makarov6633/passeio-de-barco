# 🚀 CRIAR TABELAS NO SUPABASE

## ⚡ SUPER RÁPIDO (3 MINUTOS)

### Passo 1: Abrir SQL Editor
1. Acesse: https://supabase.com/dashboard/project/zxleknqgkfnglfqdduoj/sql/new
2. Faça login se necessário

### Passo 2: Copiar o SQL
Copie TODO o conteúdo abaixo (Ctrl+A, Ctrl+C):

```sql
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
-- ✅ PRONTO! Tabelas criadas com sucesso!
-- ================================================
```

### Passo 3: Executar
1. Cole no editor SQL do Supabase (Ctrl+V)
2. Clique em "Run" (botão verde no canto inferior direito)
3. Aguarde aparecer: "Success"

### Passo 4: Verificar
1. No menu lateral, clique em "Table Editor"
2. Você deve ver 4 tabelas:
   - ✅ clientes
   - ✅ passeios
   - ✅ reservas
   - ✅ conversation_contexts

## ✅ PRONTO!

Depois disso, volte aqui e me avise que está pronto!

Eu vou:
- Testar a conexão
- Fazer o primeiro deploy
- Configurar o webhook do Twilio
- Testar o agente de IA no WhatsApp

---

## 📊 O QUE ESSAS TABELAS FAZEM?

- **clientes**: Armazena dados dos clientes (nome, telefone, email)
- **passeios**: Catálogo de passeios disponíveis (Barco, Escuna, Jet Ski, etc)
- **reservas**: Todas as reservas com voucher único e status
- **conversation_contexts**: Memória do agente de IA (lembra de cada conversa)

---

## ❓ TEM ALGUM PROBLEMA?

Se aparecer erro tipo "relation already exists", tudo bem! Significa que a tabela já existe.

Se aparecer outro erro, me mande uma captura de tela!
