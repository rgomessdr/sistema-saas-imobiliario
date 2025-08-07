# 🏠 Sistema SaaS Imobiliário

> **Sistema completo de gestão imobiliária com dashboard administrativo moderno e responsivo**

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://seu-usuario.github.io/sistema-saas-imobiliario)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)](https://supabase.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📋 Índice

- [✨ Funcionalidades](#-funcionalidades)
- [🚀 Demo](#-demo)
- [📦 Instalação](#-instalação)
- [🔧 Configuração](#-configuração)
- [💻 Uso](#-uso)
- [🏗️ Arquitetura](#️-arquitetura)
- [🌐 Deploy](#-deploy)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## ✨ Funcionalidades

### 🏢 **Dashboard Administrativo**
- Interface moderna e responsiva
- Múltiplos tipos de usuário (Master, Admin, Corretor)
- Navegação intuitiva com abas dinâmicas
- Tema escuro/claro (em desenvolvimento)

### 🏠 **Gestão de Imóveis**
- ✅ Cadastro completo de propriedades
- ✅ Upload de imagens
- ✅ Filtros avançados (tipo, preço, localização)
- ✅ Busca em tempo real
- ✅ Status de disponibilidade
- ✅ Edição e exclusão

### 👥 **Gestão de Leads**
- ✅ Captura automática de interessados
- ✅ Formulário de contato integrado
- ✅ Status de acompanhamento
- ✅ Histórico de interações
- ✅ Filtros por origem e status

### 🏢 **Gestão de Corretores**
- ✅ Cadastro de corretores
- ✅ Informações profissionais (CRECI)
- ✅ Especialidades e áreas de atuação
- ✅ Status ativo/inativo
- ✅ Avatar personalizado

### 💼 **Gestão de Planos**
- ✅ Diferentes níveis de assinatura
- ✅ Recursos por plano
- ✅ Preços flexíveis
- ✅ Planos populares destacados
- ✅ Limites configuráveis

### 🔐 **Sistema de Autenticação**
- ✅ Login seguro
- ✅ Diferentes níveis de acesso
- ✅ Sessão persistente
- ✅ Logout automático

### 📱 **Responsividade**
- ✅ Design mobile-first
- ✅ Adaptação para tablets
- ✅ Interface desktop otimizada
- ✅ Componentes flexíveis

## 🚀 Demo

### 🌐 **Demo Online**
[**Acesse a demonstração ao vivo**](https://seu-usuario.github.io/sistema-saas-imobiliario)

### 👤 **Credenciais de Teste**

| Tipo | Email | Senha | Acesso |
|------|-------|-------|--------|
| **Master** | `admin@smartimoveis.com` | `123456` | Acesso completo |
| **Admin** | `admin@empresa.com` | `123456` | Gestão limitada |
| **Corretor** | `corretor@empresa.com` | `123456` | Apenas leads |

### 📸 **Screenshots**

<details>
<summary>🖼️ Ver capturas de tela</summary>

#### Dashboard Principal
![Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Dashboard+Principal)

#### Gestão de Imóveis
![Imóveis](https://via.placeholder.com/800x400/059669/FFFFFF?text=Gestão+de+Imóveis)

#### Gestão de Leads
![Leads](https://via.placeholder.com/800x400/DC2626/FFFFFF?text=Gestão+de+Leads)

#### Mobile Responsivo
![Mobile](https://via.placeholder.com/400x600/7C3AED/FFFFFF?text=Mobile+Responsivo)

</details>

## 📦 Instalação

### 🚀 **Instalação Rápida (Recomendada)**

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/sistema-saas-imobiliario.git

# 2. Entre na pasta
cd sistema-saas-imobiliario

# 3. Execute o setup automático (Windows)
.\setup-deploy.bat

# 4. Abra no navegador
start sistema-saas-final.html
```

### 🛠️ **Instalação Manual**

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/sistema-saas-imobiliario.git

# 2. Entre na pasta
cd sistema-saas-imobiliario

# 3. Instale dependências (opcional)
npm install

# 4. Inicie servidor local
npm start
# ou
python -m http.server 3000
# ou simplesmente abra o arquivo HTML
```

### 📋 **Pré-requisitos**

- **Navegador moderno** (Chrome 80+, Firefox 75+, Safari 13+)
- **Git** (para clonagem)
- **Node.js 14+** (opcional, para servidor local)
- **Conta Supabase** (para backend)
- **Conta GitHub** (para deploy)

## 🔧 Configuração

### 🗄️ **Configuração do Supabase**

1. **Criar projeto no Supabase**
   ```bash
   # Acesse: https://supabase.com
   # Crie um novo projeto
   # Anote a URL e a chave anônima
   ```

2. **Configurar credenciais**
   ```javascript
   // Edite o arquivo: supabase-config.js
   const SUPABASE_URL = 'https://seu-project-id.supabase.co';
   const SUPABASE_ANON_KEY = 'sua-chave-anonima-aqui';
   ```

3. **Criar tabelas do banco**
   ```sql
   -- Execute no SQL Editor do Supabase
   -- Consulte DEPLOY-GUIDE.md para scripts completos
   ```

### 🌐 **Configuração do GitHub Pages**

1. **Fazer fork/clone do projeto**
2. **Configurar Pages nas configurações do repositório**
3. **Escolher branch `main` como source**
4. **Aguardar deploy automático**

### ⚙️ **Variáveis de Ambiente**

```javascript
// Opcional: criar arquivo .env.local
SUPABASE_URL=https://seu-project-id.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima
GITHUB_PAGES_URL=https://seu-usuario.github.io/sistema-saas-imobiliario
```

## 💻 Uso

### 🚪 **Fazendo Login**

```javascript
// Credenciais padrão para teste
const credentials = {
  master: { email: 'admin@smartimoveis.com', password: '123456' },
  admin: { email: 'admin@empresa.com', password: '123456' },
  corretor: { email: 'corretor@empresa.com', password: '123456' }
};
```

### 🏠 **Gerenciando Imóveis**

1. **Adicionar novo imóvel**
   - Clique em "+ Novo Imóvel"
   - Preencha os dados obrigatórios
   - Faça upload da imagem
   - Salve

2. **Editar imóvel existente**
   - Clique no botão "Editar" do card
   - Modifique os campos necessários
   - Salve as alterações

3. **Filtrar imóveis**
   - Use a barra de busca
   - Selecione filtros por tipo
   - Combine múltiplos filtros

### 👥 **Gerenciando Leads**

1. **Visualizar leads**
   - Acesse a aba "Leads"
   - Veja status e origem
   - Filtre por período

2. **Atualizar status**
   - Clique em "Editar"
   - Altere o status
   - Adicione observações

### 🏢 **Gerenciando Corretores** (Apenas Master)

1. **Cadastrar corretor**
   - Aba "Corretores"
   - "+ Novo Corretor"
   - Preencha dados profissionais

2. **Definir especialidades**
   - Edite o corretor
   - Adicione áreas de atuação
   - Configure status

## 🏗️ Arquitetura

### 📁 **Estrutura do Projeto**

```
sistema-saas-imobiliario/
├── 📄 sistema-saas-final.html      # Aplicação principal
├── 🔧 supabase-config.js           # Configuração do backend
├── 📊 supabase-services.js         # Serviços de API
├── 🎨 dashboard-inline.html        # Versão com CSS inline
├── 📋 index.html                   # Página inicial
├── 📖 README.md                    # Documentação principal
├── 🚀 DEPLOY-GUIDE.md             # Guia de deploy
├── ⚙️ setup-deploy.bat            # Script de setup automático
├── 📦 package.json                # Configuração do projeto
├── 🚫 .gitignore                  # Arquivos ignorados
└── 📝 conversa.txt                # Log de desenvolvimento
```

### 🔧 **Tecnologias Utilizadas**

| Categoria | Tecnologia | Versão | Uso |
|-----------|------------|--------|-----|
| **Frontend** | HTML5 | Latest | Estrutura |
| **Estilo** | CSS3 | Latest | Design responsivo |
| **Script** | JavaScript ES6+ | Latest | Lógica da aplicação |
| **Backend** | Supabase | Latest | Banco de dados |
| **Hospedagem** | GitHub Pages | Latest | Deploy gratuito |
| **Versionamento** | Git | Latest | Controle de versão |

### 🎯 **Padrões de Código**

- **Componentes modulares** em JavaScript
- **CSS responsivo** com mobile-first
- **Nomenclatura semântica** para classes
- **Comentários descritivos** no código
- **Estrutura organizada** por funcionalidade

## 🌐 Deploy

### 🚀 **Deploy Automático (Recomendado)**

```bash
# Execute o script de setup
.\setup-deploy.bat

# Siga as instruções na tela
# O script irá:
# 1. Configurar Git
# 2. Fazer commit inicial
# 3. Enviar para GitHub
# 4. Configurar repositório remoto
```

### 🛠️ **Deploy Manual**

1. **GitHub Pages**
   ```bash
   git add .
   git commit -m "Deploy inicial"
   git push origin main
   # Configurar Pages nas settings do repo
   ```

2. **Netlify**
   ```bash
   # Conecte seu repositório GitHub
   # Configure build: nenhum comando necessário
   # Publish directory: /
   ```

3. **Vercel**
   ```bash
   npx vercel
   # Siga as instruções
   ```

### 🔗 **URLs de Produção**

- **GitHub Pages**: `https://seu-usuario.github.io/sistema-saas-imobiliario`
- **Netlify**: `https://seu-app.netlify.app`
- **Vercel**: `https://seu-app.vercel.app`

## 🤝 Contribuição

### 🐛 **Reportar Bugs**

1. Verifique se o bug já foi reportado
2. Crie uma [nova issue](https://github.com/seu-usuario/sistema-saas-imobiliario/issues/new)
3. Descreva o problema detalhadamente
4. Inclua screenshots se possível

### 💡 **Sugerir Melhorias**

1. Abra uma [issue de feature](https://github.com/seu-usuario/sistema-saas-imobiliario/issues/new)
2. Descreva a funcionalidade desejada
3. Explique o caso de uso
4. Aguarde feedback da comunidade

### 🔧 **Contribuir com Código**

```bash
# 1. Fork o projeto
# 2. Crie uma branch para sua feature
git checkout -b feature/nova-funcionalidade

# 3. Faça suas alterações
# 4. Commit suas mudanças
git commit -m "feat: adiciona nova funcionalidade"

# 5. Push para sua branch
git push origin feature/nova-funcionalidade

# 6. Abra um Pull Request
```

### 📋 **Diretrizes de Contribuição**

- **Código limpo** e bem comentado
- **Testes** para novas funcionalidades
- **Documentação** atualizada
- **Commits semânticos** (feat, fix, docs, etc.)
- **Responsividade** mantida

## 📄 Licença

```
MIT License

Copyright (c) 2024 Sistema SaaS Imobiliário

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Agradecimentos

- **Supabase** pela infraestrutura de backend
- **GitHub** pela hospedagem gratuita
- **Comunidade open source** pelas inspirações
- **Desenvolvedores** que contribuíram

## 📞 Suporte

- 📧 **Email**: seu.email@exemplo.com
- 💬 **Discord**: [Servidor da Comunidade](https://discord.gg/seu-servidor)
- 🐛 **Issues**: [GitHub Issues](https://github.com/seu-usuario/sistema-saas-imobiliario/issues)
- 📖 **Documentação**: [Wiki do Projeto](https://github.com/seu-usuario/sistema-saas-imobiliario/wiki)

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

[![GitHub stars](https://img.shields.io/github/stars/seu-usuario/sistema-saas-imobiliario?style=social)](https://github.com/seu-usuario/sistema-saas-imobiliario/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/seu-usuario/sistema-saas-imobiliario?style=social)](https://github.com/seu-usuario/sistema-saas-imobiliario/network/members)

**Feito com ❤️ para a comunidade imobiliária**

</div>