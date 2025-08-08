-- ============================================
-- SCRIPT DE CONFIGURAÇÃO DO BANCO DE DADOS
-- Sistema SaaS Imobiliário - Smart Imóveis
-- ============================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELA: properties (Imóveis)
-- ============================================
CREATE TABLE IF NOT EXISTS properties (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    type VARCHAR(50) NOT NULL, -- apartamento, casa, cobertura, terreno, etc.
    bedrooms INTEGER,
    bathrooms INTEGER,
    area DECIMAL(10,2), -- área em m²
    address TEXT NOT NULL,
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    status VARCHAR(50) DEFAULT 'disponivel', -- disponivel, vendido, alugado, reservado
    images TEXT[], -- array de URLs das imagens
    features TEXT[], -- características do imóvel
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABELA: leads (Leads/Interessados)
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    interest TEXT, -- interesse específico
    budget DECIMAL(12,2), -- orçamento
    status VARCHAR(50) DEFAULT 'novo', -- novo, contato, qualificado, convertido, perdido
    source VARCHAR(100), -- origem do lead
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABELA: corretores (Corretores)
-- ============================================
CREATE TABLE IF NOT EXISTS corretores (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    creci VARCHAR(50), -- número do CRECI
    vendas_mes INTEGER DEFAULT 0,
    comissao_total DECIMAL(12,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'ativo', -- ativo, inativo
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABELA: planos (Planos de Assinatura)
-- ============================================
CREATE TABLE IF NOT EXISTS planos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    features TEXT[], -- características do plano
    max_properties INTEGER, -- máximo de imóveis
    max_leads INTEGER, -- máximo de leads
    max_users INTEGER, -- máximo de usuários
    status VARCHAR(50) DEFAULT 'ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

-- Índices para properties
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at);

-- Índices para leads
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Índices para corretores
CREATE INDEX IF NOT EXISTS idx_corretores_email ON corretores(email);
CREATE INDEX IF NOT EXISTS idx_corretores_status ON corretores(status);

-- ============================================
-- POLÍTICAS RLS (Row Level Security)
-- ============================================

-- Habilitar RLS nas tabelas
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE corretores ENABLE ROW LEVEL SECURITY;
ALTER TABLE planos ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir acesso público (ajuste conforme necessário)
CREATE POLICY "Permitir acesso público a properties" ON properties FOR ALL USING (true);
CREATE POLICY "Permitir acesso público a leads" ON leads FOR ALL USING (true);
CREATE POLICY "Permitir acesso público a corretores" ON corretores FOR ALL USING (true);
CREATE POLICY "Permitir acesso público a planos" ON planos FOR ALL USING (true);

-- ============================================
-- DADOS INICIAIS (OPCIONAL)
-- ============================================

-- Inserir alguns corretores de exemplo
INSERT INTO corretores (name, email, phone, creci, vendas_mes, comissao_total) VALUES
('Ana Costa', 'ana.costa@smartimoveis.com', '(21) 96666-1111', 'CRECI 12345-RJ', 5, 45000),
('Carlos Mendes', 'carlos.mendes@smartimoveis.com', '(21) 95555-2222', 'CRECI 67890-RJ', 3, 28000)
ON CONFLICT (email) DO NOTHING;

-- Inserir alguns planos de exemplo
INSERT INTO planos (name, description, price, features, max_properties, max_leads, max_users) VALUES
('Básico', 'Plano ideal para corretores iniciantes', 99.90, ARRAY['Dashboard básico', 'Até 50 imóveis', 'Até 100 leads'], 50, 100, 1),
('Profissional', 'Plano para corretores experientes', 199.90, ARRAY['Dashboard avançado', 'Até 200 imóveis', 'Até 500 leads', 'Relatórios'], 200, 500, 3),
('Empresarial', 'Plano para imobiliárias', 399.90, ARRAY['Dashboard completo', 'Imóveis ilimitados', 'Leads ilimitados', 'Multi-usuários'], -1, -1, 10)
ON CONFLICT DO NOTHING;

-- ============================================
-- FUNÇÕES AUXILIARES
-- ============================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_corretores_updated_at BEFORE UPDATE ON corretores
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_planos_updated_at BEFORE UPDATE ON planos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FINALIZAÇÃO
-- ============================================

-- Verificar se as tabelas foram criadas
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE tablename IN ('properties', 'leads', 'corretores', 'planos')
ORDER BY tablename;

-- Mensagem de sucesso
SELECT 'Banco de dados configurado com sucesso! 🎉' as status;