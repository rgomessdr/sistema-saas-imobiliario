# 🚀 Guia de Deploy - Sistema SaaS Imobiliário

Este guia te ajudará a fazer o deploy do seu sistema para GitHub e Supabase.

## 📋 Pré-requisitos

- Conta no GitHub
- Conta no Supabase
- Git instalado no seu computador
- Node.js (opcional, para desenvolvimento local)

## 🐙 Deploy no GitHub

### 1. Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em "New repository"
3. Nome sugerido: `sistema-saas-imobiliario`
4. Descrição: "Sistema SaaS completo para gestão imobiliária com dashboard administrativo"
5. Marque como "Public" (ou Private se preferir)
6. **NÃO** marque "Initialize with README" (já temos arquivos)

### 2. Configurar Git Local

```bash
# Navegar para a pasta do projeto
cd "C:\Users\USER\Downloads\dashboard-moderno-smartimóveis"

# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "🎉 Initial commit: Sistema SaaS Imobiliário completo"

# Adicionar repositório remoto (substitua SEU_USUARIO pelo seu username)
git remote add origin https://github.com/SEU_USUARIO/sistema-saas-imobiliario.git

# Enviar para GitHub
git branch -M main
git push -u origin main
```

### 3. Configurar GitHub Pages (Hospedagem Gratuita)

1. No seu repositório GitHub, vá em "Settings"
2. Role até "Pages" no menu lateral
3. Em "Source", selecione "Deploy from a branch"
4. Escolha "main" branch e "/ (root)"
5. Clique "Save"
6. Seu site estará disponível em: `https://SEU_USUARIO.github.io/sistema-saas-imobiliario`

## 🗄️ Deploy no Supabase

### 1. Criar Projeto no Supabase

1. Acesse [Supabase](https://supabase.com)
2. Clique "Start your project"
3. Clique "New project"
4. Nome: `sistema-saas-imobiliario`
5. Escolha uma senha forte para o banco
6. Região: escolha a mais próxima (ex: South America)
7. Clique "Create new project"

### 2. Configurar Banco de Dados

#### Tabela: properties (Imóveis)
```sql
CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area DECIMAL(10,2),
  description TEXT,
  image_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Tabela: leads (Leads)
```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  property_interest VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  source VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Tabela: corretores (Corretores)
```sql
CREATE TABLE corretores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  creci VARCHAR(50),
  specialty VARCHAR(255),
  avatar_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Tabela: planos (Planos)
```sql
CREATE TABLE planos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  features TEXT[] NOT NULL,
  max_properties INTEGER,
  max_leads INTEGER,
  support_level VARCHAR(100),
  popular BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Configurar RLS (Row Level Security)

```sql
-- Habilitar RLS nas tabelas
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE corretores ENABLE ROW LEVEL SECURITY;
ALTER TABLE planos ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (ajuste conforme necessário)
CREATE POLICY "Enable read access for all users" ON properties FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON leads FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON corretores FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON planos FOR SELECT USING (true);
```

### 4. Obter Credenciais do Supabase

1. No dashboard do Supabase, vá em "Settings" > "API"
2. Copie:
   - **Project URL**
   - **anon public key**

### 5. Configurar Arquivo de Configuração

Crie o arquivo `supabase-config.js` (se não existir):

```javascript
// Configuração do Supabase
const SUPABASE_URL = 'SUA_PROJECT_URL_AQUI';
const SUPABASE_ANON_KEY = 'SUA_ANON_KEY_AQUI';

// Inicializar cliente Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

## 🔧 Configuração Final

### 1. Atualizar URLs no Código

No arquivo `sistema-saas-final.html`, substitua os dados mockados pelas chamadas reais do Supabase.

### 2. Testar Localmente

```bash
# Servir arquivos localmente (opcional)
npx serve .
# ou
python -m http.server 8000
```

### 3. Deploy Final

```bash
# Adicionar mudanças
git add .
git commit -m "🚀 Configuração Supabase e deploy"
git push origin main
```

## 🌐 URLs Finais

- **GitHub Repository**: `https://github.com/SEU_USUARIO/sistema-saas-imobiliario`
- **GitHub Pages**: `https://SEU_USUARIO.github.io/sistema-saas-imobiliario`
- **Supabase Dashboard**: `https://app.supabase.com/project/SEU_PROJECT_ID`

## 📝 Próximos Passos

1. ✅ Configurar domínio personalizado (opcional)
2. ✅ Implementar autenticação de usuários
3. ✅ Configurar backup automático
4. ✅ Monitoramento e analytics
5. ✅ SSL/HTTPS (automático no GitHub Pages)

## 🆘 Suporte

Se precisar de ajuda:
- GitHub: [Documentação](https://docs.github.com)
- Supabase: [Documentação](https://supabase.com/docs)
- Comunidade: [Discord do Supabase](https://discord.supabase.com)

---

**🎉 Parabéns! Seu sistema estará online e funcionando!**