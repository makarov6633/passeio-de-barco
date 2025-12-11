-- ================================================
-- CRIAÇÃO COMPLETA DO BANCO DE DADOS
-- Caleb's Tour - Sistema de Reservas + Agente IA
-- ================================================

-- 1. CRIAR TABELA DE CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255),
    cpf VARCHAR(14),
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
    categoria VARCHAR(100),
    includes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. CRIAR TABELA DE RESERVAS
CREATE TABLE IF NOT EXISTS reservas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
    passeio_id UUID REFERENCES passeios(id) ON DELETE CASCADE,
    data_passeio DATE NOT NULL,
    num_pessoas INTEGER NOT NULL,
    voucher VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDENTE',
    observacoes TEXT,
    valor_total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. CRIAR TABELA DE CONTEXTO DE CONVERSAS
CREATE TABLE IF NOT EXISTS conversation_contexts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    telefone VARCHAR(20) NOT NULL,
    context JSONB NOT NULL DEFAULT '{}',
    last_message TEXT,
    last_intent VARCHAR(50),
    last_updated TIMESTAMP DEFAULT NOW()
);

-- 5. CRIAR ÍNDICES PARA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_clientes_telefone ON clientes(telefone);
CREATE INDEX IF NOT EXISTS idx_reservas_status ON reservas(status);
CREATE INDEX IF NOT EXISTS idx_reservas_data ON reservas(data_passeio);
CREATE INDEX IF NOT EXISTS idx_context_telefone ON conversation_contexts(telefone);

-- 6. INSERIR PASSEIOS PADRÃO
INSERT INTO passeios (nome, descricao, preco_min, preco_max, duracao, local, categoria, includes)
VALUES 
    (
        'Passeio de Barco - Arraial do Cabo',
        'Conheça as praias paradisíacas de Arraial do Cabo! Visitamos Praia do Forno, Prainhas, Gruta Azul e muito mais. Águas cristalinas e paisagens de tirar o fôlego!',
        150.00,
        280.00,
        '4-5 horas',
        'Arraial do Cabo, RJ',
        'Passeio de Barco',
        'Colete salva-vidas, Guia turístico, Paradas para banho e mergulho, Água mineral'
    ),
    (
        'Escuna - Búzios',
        'Passeio de escuna pelas 3 ilhas de Búzios com paradas estratégicas para mergulho. Águas calmas e cristalinas, perfeito para toda família!',
        120.00,
        200.00,
        '3-4 horas',
        'Búzios, RJ',
        'Passeio de Escuna',
        'Equipamentos de mergulho, Guia, Open bar de bebidas não alcoólicas'
    ),
    (
        'Jet Ski',
        'Adrenalina pura! Pilotar jet ski pelas águas cristalinas de Arraial do Cabo. Experiência inesquecível para aventureiros!',
        200.00,
        350.00,
        '30min-1h',
        'Arraial do Cabo, RJ',
        'Esporte Aquático',
        'Equipamento completo de segurança, Instrutor, Colete salva-vidas'
    ),
    (
        'Mergulho com Cilindro',
        'Descubra o fundo do mar de Arraial do Cabo! Acompanhamento de instrutor certificado. Não precisa de experiência!',
        250.00,
        400.00,
        '2-3 horas',
        'Arraial do Cabo, RJ',
        'Mergulho',
        'Equipamento completo, Instrutor certificado, Seguro, Fotos subaquáticas'
    ),
    (
        'Buggy nas Dunas',
        'Aventura pelas dunas de Cabo Frio! Passeio radical com paisagens incríveis e muita emoção!',
        180.00,
        300.00,
        '2-3 horas',
        'Cabo Frio, RJ',
        'Aventura Terrestre',
        'Buggy equipado, Motorista experiente, Paradas para fotos, Água mineral'
    ),
    (
        'Van Tour Região dos Lagos',
        'Conheça os principais pontos turísticos da Região dos Lagos em uma van confortável. Arraial, Búzios, Cabo Frio e mais!',
        80.00,
        150.00,
        'Dia todo',
        'Região dos Lagos, RJ',
        'City Tour',
        'Transporte em van climatizada, Guia turístico, Paradas estratégicas'
    )
ON CONFLICT DO NOTHING;

-- ================================================
-- ✅ TABELAS CRIADAS COM SUCESSO!
-- ================================================
