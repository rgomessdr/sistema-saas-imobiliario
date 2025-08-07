@echo off
echo ============================================
echo 🚀 SETUP AUTOMATICO - SISTEMA SAAS IMOBILIARIO
echo ============================================
echo.

:: Verificar se Git está instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git não está instalado!
    echo 📥 Baixe em: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git encontrado!
echo.

:: Solicitar informações do usuário
set /p GITHUB_USERNAME="Digite seu username do GitHub: "
set /p REPO_NAME="Digite o nome do repositório (padrão: sistema-saas-imobiliario): "
if "%REPO_NAME%"=="" set REPO_NAME=sistema-saas-imobiliario

echo.
echo 📋 Configurações:
echo    Username: %GITHUB_USERNAME%
echo    Repositório: %REPO_NAME%
echo.

set /p CONFIRM="Confirma as configurações? (s/n): "
if /i not "%CONFIRM%"=="s" (
    echo ❌ Operação cancelada.
    pause
    exit /b 1
)

echo.
echo 🔧 Configurando Git...

:: Inicializar repositório Git
if not exist ".git" (
    git init
    echo ✅ Repositório Git inicializado
) else (
    echo ℹ️ Repositório Git já existe
)

:: Configurar usuário Git (se não configurado)
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    set /p GIT_NAME="Digite seu nome para o Git: "
    git config user.name "%GIT_NAME%"
)

git config user.email >nul 2>&1
if %errorlevel% neq 0 (
    set /p GIT_EMAIL="Digite seu email para o Git: "
    git config user.email "%GIT_EMAIL%"
)

echo ✅ Configuração do Git concluída
echo.

echo 📁 Adicionando arquivos...
git add .
echo ✅ Arquivos adicionados

echo 💾 Fazendo commit inicial...
git commit -m "🎉 Initial commit: Sistema SaaS Imobiliário completo

✨ Funcionalidades incluídas:
- Dashboard administrativo completo
- Gestão de imóveis, leads, corretores e planos
- Interface responsiva e moderna
- Integração com Supabase preparada
- Sistema de autenticação
- Formulários dinâmicos
- Filtros e busca avançada

🚀 Pronto para deploy no GitHub Pages!"

if %errorlevel% neq 0 (
    echo ❌ Erro no commit
    pause
    exit /b 1
)

echo ✅ Commit realizado com sucesso
echo.

echo 🌐 Configurando repositório remoto...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
echo ✅ Repositório remoto configurado
echo.

echo 📤 Enviando para GitHub...
echo ⚠️ IMPORTANTE: Você precisará fazer login no GitHub quando solicitado
echo.
git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ❌ Erro ao enviar para GitHub
    echo 💡 Possíveis soluções:
    echo    1. Verifique se o repositório existe no GitHub
    echo    2. Verifique suas credenciais
    echo    3. Crie o repositório manualmente em: https://github.com/new
    echo.
    echo 🔗 URL do repositório: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
    pause
    exit /b 1
)

echo.
echo ============================================
echo 🎉 DEPLOY CONCLUÍDO COM SUCESSO!
echo ============================================
echo.
echo 🔗 Links importantes:
echo    📁 Repositório: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo    🌐 GitHub Pages: https://%GITHUB_USERNAME%.github.io/%REPO_NAME%
echo    ⚙️ Configurações: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%/settings/pages
echo.
echo 📋 Próximos passos:
echo    1. Configure o GitHub Pages nas configurações do repositório
echo    2. Configure suas credenciais do Supabase
echo    3. Teste o sistema online
echo.
echo 📖 Consulte o arquivo DEPLOY-GUIDE.md para instruções detalhadas
echo.
pause