// <stdin>
import React, { useState, useEffect, useRef } from "https://esm.sh/react@18.2.0";
import { Chart } from "https://esm.sh/chart.js@4.4.0";
import { registerables } from "https://esm.sh/chart.js@4.4.0";

// Registrar componentes do Chart.js
Chart.register(...registerables);

var ModernDashboard = () => {
  // Refs para os gráficos
  const leadChartRef = useRef(null);
  const trafficChartRef = useRef(null);
  const deviceChartRef = useRef(null);
  const conversionChartRef = useRef(null);
  
  // Estados para tema e interface moderna
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado para notificações
  const [notifications, setNotifications] = useState([
    { id: 1, tipo: "lead", mensagem: "Novo lead para Apartamento Luxo Ipanema", tempo: "5 min atrás", lida: false },
    { id: 2, tipo: "visita", mensagem: "Visita agendada: Casa Moderna Barra", tempo: "2 horas atrás", lida: false },
    { id: 3, tipo: "proposta", mensagem: "Nova proposta recebida: Cobertura Leblon", tempo: "1 dia atrás", lida: true },
  ]);
  
  const [currentUser, setCurrentUser] = useState({
    nome: "Rodrigo Gomes",
    tipo: "admin",
    avatar: "RG",
    email: "rodrigo@smartimoveis.com",
    cargo: "Corretor Sênior",
    equipe: "Imóveis de Luxo"
  });
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [imoveis, setImoveis] = useState([]);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalImoveis: 127,
    leadsMes: 85,
    conversao: 8.6,
    faturamento: 45e3,
    visitasAgendadas: 32,
    propostasAtivas: 14
  });
  
  // Estados para analytics avançados e monitoramento em tempo real
  const [realTimeData, setRealTimeData] = useState({
    visitasOnline: 12,
    leadsHoje: 8,
    conversaoTempo: 9.2,
    alertas: [
      { id: 1, tipo: 'oportunidade', mensagem: 'Lead qualificado aguarda contato há 2h', prioridade: 'alta' },
      { id: 2, tipo: 'performance', mensagem: 'Taxa de conversão 15% acima da média', prioridade: 'media' },
      { id: 3, tipo: 'meta', mensagem: 'Faltam 3 vendas para bater meta mensal', prioridade: 'alta' }
    ]
  });
  
  const [predictiveData, setPredictiveData] = useState({
    previsaoLeads: [
      { periodo: 'Próximos 7 dias', valor: 45, confianca: 85 },
      { periodo: 'Próximos 30 dias', valor: 180, confianca: 78 },
      { periodo: 'Próximos 90 dias', valor: 520, confianca: 65 }
    ],
    tendenciaVendas: [
      { mes: 'Nov', previsto: 12, real: 10 },
      { mes: 'Dez', previsto: 15, real: null },
      { mes: 'Jan', previsto: 18, real: null }
    ],
    oportunidades: [
      { tipo: 'Segmento Premium', potencial: 'Alto', valor: '2.5M', probabilidade: 75 },
      { tipo: 'Mercado Corporativo', potencial: 'Médio', valor: '1.8M', probabilidade: 60 }
    ],
    riscos: [
      { tipo: 'Sazonalidade', impacto: 'Médio', probabilidade: 45 },
      { tipo: 'Concorrência', impacto: 'Alto', probabilidade: 30 }
    ]
  });
  
  const [performanceMetrics, setPerformanceMetrics] = useState({
    tempoResposta: 2.3, // horas
    satisfacaoCliente: 4.7, // de 5
    eficienciaEquipe: 87, // percentual
    custoPorLead: 125, // reais
    nps: 72, // Net Promoter Score
    churnRate: 3.2, // percentual
    ltv: 15000, // Lifetime Value
    cac: 450 // Customer Acquisition Cost
  });
  
  const [heatmapData, setHeatmapData] = useState({
    regioes: [
      { nome: 'Ipanema', atividade: 95, valor: 'R$ 25M', leads: 45 },
      { nome: 'Leblon', atividade: 88, valor: 'R$ 32M', leads: 38 },
      { nome: 'Copacabana', atividade: 72, valor: 'R$ 18M', leads: 52 },
      { nome: 'Barra', atividade: 65, valor: 'R$ 22M', leads: 41 },
      { nome: 'Botafogo', atividade: 58, valor: 'R$ 12M', leads: 29 }
    ],
    horarios: [
      { hora: '09:00', atividade: 45 },
      { hora: '12:00', atividade: 78 },
      { hora: '15:00', atividade: 92 },
      { hora: '18:00', atividade: 85 },
      { hora: '21:00', atividade: 32 }
    ]
  });
  
  const [perfilTab, setPerfilTab] = useState("perfil");
  const [perfilPublico, setPerfilPublico] = useState({
    ativo: true,
    link: "smartimoveis.com/corretor/rodrigo-gomes",
    bio: "Corretor especializado em imóveis de luxo no Rio de Janeiro. Mais de 10 anos de experiência no mercado imobiliário.",
    telefone: "(21) 99999-9999",
    email: "rodrigo@smartimoveis.com",
    instagram: "@rodrigoimoveis",
    whatsapp: "5521999999999",
    linkedin: "linkedin.com/in/rodrigogomes"
  });
  
  // Dados para gráficos melhorados
  // Dados de origem de tráfego com mais detalhes
  const graficoOrigem = [
    { nome: "WhatsApp", valor: 45, cor: "#25D366", crescimento: 12 },
    { nome: "Facebook", valor: 25, cor: "#4267B2", crescimento: -3 },
    { nome: "Instagram", valor: 20, cor: "#E4405F", crescimento: 8 },
    { nome: "Google", valor: 15, cor: "#4285F4", crescimento: 5 },
    { nome: "Direto", valor: 10, cor: "#6B7280", crescimento: 2 },
    { nome: "Email", valor: 8, cor: "#EA4335", crescimento: 15 }
  ];
  
  // Dados de dispositivos com mais detalhes
  const graficoDispositivos = [
    { nome: "Mobile", valor: 65, cor: "#8B5CF6", crescimento: 8 },
    { nome: "Desktop", valor: 30, cor: "#06B6D4", crescimento: -2 },
    { nome: "Tablet", valor: 5, cor: "#F59E0B", crescimento: -1 }
  ];
  
  // Dados de leads mensais expandidos para 12 meses
  const leadsMensais = [
    { mes: "Jan", valor: 45, conversao: 6 },
    { mes: "Fev", valor: 52, conversao: 7 },
    { mes: "Mar", valor: 38, conversao: 5 },
    { mes: "Abr", valor: 61, conversao: 8 },
    { mes: "Mai", valor: 75, conversao: 9 },
    { mes: "Jun", valor: 85, conversao: 10 },
    { mes: "Jul", valor: 78, conversao: 9 },
    { mes: "Ago", valor: 92, conversao: 11 },
    { mes: "Set", valor: 87, conversao: 10 },
    { mes: "Out", valor: 94, conversao: 12 },
    { mes: "Nov", valor: 99, conversao: 13 },
    { mes: "Dez", valor: 105, conversao: 15 }
  ];
  
  // Dados de conversão por tipo de imóvel
  const conversaoPorTipo = [
    { tipo: "Apartamento", taxa: 9.2, cor: "#3B82F6" },
    { tipo: "Casa", taxa: 7.8, cor: "#10B981" },
    { tipo: "Cobertura", taxa: 12.5, cor: "#F59E0B" },
    { tipo: "Terreno", taxa: 5.3, cor: "#6366F1" },
    { tipo: "Comercial", taxa: 6.7, cor: "#EC4899" }
  ];
  
  // Dados de performance por região
  const performancePorRegiao = [
    { regiao: "Zona Sul", leads: 145, vendas: 18, valor: 32e6 },
    { regiao: "Zona Oeste", leads: 98, vendas: 12, valor: 18e6 },
    { regiao: "Zona Norte", leads: 76, vendas: 8, valor: 9e6 },
    { regiao: "Centro", leads: 52, vendas: 5, valor: 7e6 },
    { regiao: "Niterói", leads: 67, vendas: 7, valor: 11e6 }
  ];
  
  // Efeito para carregar dados e inicializar gráficos
  useEffect(() => {
    // Dados simulados de imóveis com mais detalhes
    const imoveisSimulados = [
      {
        id: 1,
        titulo: "Apartamento Luxo Ipanema",
        tipo: "apartamento",
        preco: 25e5,
        cidade: "Rio de Janeiro",
        bairro: "Ipanema",
        area: 180,
        quartos: 4,
        banheiros: 3,
        vagas: 2,
        status: "disponivel",
        leads: 23,
        visualizacoes: 1247,
        destaque: true,
        dataInclusao: "2023-05-15",
        ultimaAtualizacao: "2023-10-02",
        fotos: 8,
        video: true
      },
      {
        id: 2,
        titulo: "Casa Moderna Barra",
        tipo: "casa",
        preco: 18e5,
        cidade: "Rio de Janeiro",
        bairro: "Barra da Tijuca",
        area: 320,
        quartos: 5,
        banheiros: 4,
        vagas: 3,
        status: "disponivel",
        leads: 18,
        visualizacoes: 892,
        destaque: true,
        dataInclusao: "2023-06-22",
        ultimaAtualizacao: "2023-09-28",
        fotos: 12,
        video: true
      },
      {
        id: 3,
        titulo: "Cobertura Duplex Leblon",
        tipo: "cobertura",
        preco: 42e5,
        cidade: "Rio de Janeiro",
        bairro: "Leblon",
        area: 280,
        quartos: 4,
        banheiros: 5,
        vagas: 3,
        status: "disponivel",
        leads: 31,
        visualizacoes: 1580,
        destaque: true,
        dataInclusao: "2023-04-10",
        ultimaAtualizacao: "2023-10-05",
        fotos: 15,
        video: true
      },
      {
        id: 4,
        titulo: "Apartamento Garden Botafogo",
        tipo: "apartamento",
        preco: 15e5,
        cidade: "Rio de Janeiro",
        bairro: "Botafogo",
        area: 150,
        quartos: 3,
        banheiros: 2,
        vagas: 1,
        status: "disponivel",
        leads: 15,
        visualizacoes: 720,
        destaque: false,
        dataInclusao: "2023-07-05",
        ultimaAtualizacao: "2023-09-15",
        fotos: 10,
        video: false
      },
      {
        id: 5,
        titulo: "Sala Comercial Centro",
        tipo: "comercial",
        preco: 8e5,
        cidade: "Rio de Janeiro",
        bairro: "Centro",
        area: 85,
        quartos: 0,
        banheiros: 1,
        vagas: 1,
        status: "disponivel",
        leads: 9,
        visualizacoes: 450,
        destaque: false,
        dataInclusao: "2023-08-12",
        ultimaAtualizacao: "2023-09-30",
        fotos: 6,
        video: false
      }
    ];
    
    // Dados simulados de leads
    const leadsSimulados = [
      { id: 1, nome: "Carlos Silva", email: "carlos@email.com", telefone: "(21) 98888-7777", imovel: "Apartamento Luxo Ipanema", origem: "WhatsApp", data: "2023-10-05", status: "novo" },
      { id: 2, nome: "Ana Oliveira", email: "ana@email.com", telefone: "(21) 97777-6666", imovel: "Casa Moderna Barra", origem: "Facebook", data: "2023-10-04", status: "contatado" },
      { id: 3, nome: "Marcos Santos", email: "marcos@email.com", telefone: "(21) 96666-5555", imovel: "Cobertura Duplex Leblon", origem: "Instagram", data: "2023-10-03", status: "qualificado" },
      { id: 4, nome: "Juliana Costa", email: "juliana@email.com", telefone: "(21) 95555-4444", imovel: "Apartamento Garden Botafogo", origem: "Google", data: "2023-10-02", status: "agendado" },
      { id: 5, nome: "Roberto Almeida", email: "roberto@email.com", telefone: "(21) 94444-3333", imovel: "Sala Comercial Centro", origem: "Email", data: "2023-10-01", status: "negociando" }
    ];
    
    // Atualizar estados
    setImoveis(imoveisSimulados);
    setLeads(leadsSimulados);
    
    // Inicializar gráficos com Chart.js
    if (leadChartRef.current) {
      const ctx = leadChartRef.current.getContext('2d');
      const leadChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: leadsMensais.map(item => item.mes),
          datasets: [
            {
              label: 'Leads',
              data: leadsMensais.map(item => item.valor),
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.3,
              fill: true
            },
            {
              label: 'Conversões',
              data: leadsMensais.map(item => item.conversao),
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.3,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Evolução de Leads e Conversões'
            }
          }
        }
      });
      
      // Limpar gráfico ao desmontar
      return () => {
        leadChart.destroy();
      };
    }
  }, [leadChartRef]);
  // Componente StatCard Ultra Moderno
  const StatCard = ({ titulo, valor, subvalor, icone, cor, crescimento, meta, tendencia, onClick, categoria }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    
    // Calcular progresso para o indicador visual
    const progresso = meta ? Math.min(100, Math.round((parseFloat(valor.toString().replace(/[^0-9.-]+/g, '')) / meta) * 100)) : null;
    
    // Cores modernas baseadas na categoria
    const coresModernas = {
      leads: {
        bg: 'from-blue-500 to-blue-600',
        icon: 'bg-blue-100 text-blue-600',
        accent: 'border-blue-200',
        glow: 'shadow-blue-500/20'
      },
      vendas: {
        bg: 'from-emerald-500 to-emerald-600',
        icon: 'bg-emerald-100 text-emerald-600',
        accent: 'border-emerald-200',
        glow: 'shadow-emerald-500/20'
      },
      receita: {
        bg: 'from-purple-500 to-purple-600',
        icon: 'bg-purple-100 text-purple-600',
        accent: 'border-purple-200',
        glow: 'shadow-purple-500/20'
      },
      conversao: {
        bg: 'from-amber-500 to-amber-600',
        icon: 'bg-amber-100 text-amber-600',
        accent: 'border-amber-200',
        glow: 'shadow-amber-500/20'
      },
      default: {
        bg: 'from-gray-500 to-gray-600',
        icon: 'bg-gray-100 text-gray-600',
        accent: 'border-gray-200',
        glow: 'shadow-gray-500/20'
      }
    };
    
    const corTema = coresModernas[categoria] || coresModernas.default;
    
    // Animação de entrada
    React.useEffect(() => {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }, [valor]);
    
    return React.createElement(
      "div",
      {
        className: `group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer transform ${isHovered ? 'scale-105 -translate-y-2' : 'scale-100'} ${darkMode ? 'bg-gray-800/90 backdrop-blur-sm border border-gray-700/50' : 'bg-white/80 backdrop-blur-sm border border-white/20'} ${isHovered ? `shadow-2xl ${corTema.glow}` : 'shadow-lg'}`,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onClick: onClick,
        style: {
          background: darkMode 
            ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(17, 24, 39, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: isHovered ? `2px solid ${corTema.accent.replace('border-', '')}` : '1px solid rgba(255, 255, 255, 0.1)'
        }
      },
      
      // Efeito de brilho no hover
      React.createElement("div", {
        className: `absolute inset-0 bg-gradient-to-r ${corTema.bg} opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-5' : ''}`
      }),
      
      // Partículas flutuantes
      React.createElement("div", {
        className: `absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${corTema.bg} rounded-full opacity-5 transform translate-x-16 -translate-y-16 transition-transform duration-700 ${isHovered ? 'scale-150' : 'scale-100'}`
      }),
      
      React.createElement("div", { className: "relative p-6 z-10" },
        // Header com ícone e título
        React.createElement("div", { className: "flex items-center justify-between mb-4" },
          React.createElement("div", { className: "flex items-center space-x-3" },
            React.createElement("div", {
              className: `relative p-3 rounded-xl ${corTema.icon} transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : 'scale-100'}`,
              style: {
                boxShadow: isHovered ? '0 10px 25px rgba(0, 0, 0, 0.15)' : '0 4px 6px rgba(0, 0, 0, 0.05)'
              }
            },
              React.createElement("span", { className: "text-2xl" }, icone),
              // Pulse effect
              React.createElement("div", {
                className: `absolute inset-0 rounded-xl ${corTema.icon.replace('100', '200')} animate-pulse opacity-0 ${isAnimating ? 'opacity-30' : ''}`
              })
            ),
            React.createElement("div", {},
              React.createElement("h3", {
                className: `text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`
              }, titulo),
              React.createElement("div", {
                className: `h-0.5 w-0 bg-gradient-to-r ${corTema.bg} transition-all duration-500 ${isHovered ? 'w-full' : ''}`
              })
            )
          ),
          
          // Badge de crescimento
          crescimento && React.createElement("div", {
            className: `px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${crescimento > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} ${isHovered ? 'scale-110' : ''}`
          },
            React.createElement("span", { className: "mr-1" }, crescimento > 0 ? "↗" : "↘"),
            Math.abs(crescimento), "%"
          )
        ),
        
        // Valor principal com animação
        React.createElement("div", { className: "mb-4" },
          React.createElement("div", {
            className: `text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} transition-all duration-500 ${isHovered ? 'scale-105' : ''} ${isAnimating ? 'animate-pulse' : ''}`,
            style: {
              background: isHovered ? `linear-gradient(135deg, ${corTema.bg.replace('from-', '').replace(' to-', ', ')})` : 'none',
              WebkitBackgroundClip: isHovered ? 'text' : 'unset',
              WebkitTextFillColor: isHovered ? 'transparent' : 'inherit',
              filter: isHovered ? 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))' : 'none'
            }
          }, valor),
          
          subvalor && React.createElement("p", {
            className: `text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1 transition-all duration-300 ${isHovered ? 'text-opacity-80' : ''}`
          }, subvalor)
        ),
        
        // Barra de progresso moderna (se meta fornecida)
        meta && React.createElement("div", { className: "mb-4" },
          React.createElement("div", { className: "flex justify-between text-xs mb-2" },
            React.createElement("span", { className: `${darkMode ? 'text-gray-400' : 'text-gray-500'}` }, "Meta"),
            React.createElement("span", {
              className: `font-bold transition-all duration-500 ${progresso >= 100 ? 'text-green-500' : darkMode ? 'text-gray-300' : 'text-gray-700'}`
            }, `${progresso}%`)
          ),
          React.createElement("div", {
            className: `w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden relative`
          },
            React.createElement("div", {
              className: `h-full rounded-full transition-all duration-1000 bg-gradient-to-r ${corTema.bg} relative overflow-hidden`,
              style: { width: `${progresso}%` }
            },
              // Efeito shimmer
              React.createElement("div", {
                className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"
              })
            )
          )
        ),
        
        // Mini gráfico de tendência ultra moderno
        tendencia && tendencia.length > 0 && React.createElement("div", { className: "mt-4" },
          React.createElement("div", { className: "flex items-end h-12 space-x-1" },
            tendencia.map((valor, index) => {
              const altura = Math.max(15, valor * 60);
              const delay = index * 100;
              return React.createElement("div", {
                key: index,
                className: `rounded-t-lg transition-all duration-700 bg-gradient-to-t ${corTema.bg} opacity-70 hover:opacity-100`,
                style: {
                  height: `${altura}%`,
                  width: `${100 / tendencia.length}%`,
                  animationDelay: `${delay}ms`,
                  transform: isHovered ? `scaleY(1.1) translateY(-2px)` : 'scaleY(1)',
                  boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none'
                }
              });
            })
          )
        )
      )
    );
  };
  
  // Sistema de Notificações Moderno
  const ModernNotificationSystem = () => {
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [unreadCount, setUnreadCount] = useState(3);
    
    const notificacoesRecentes = [
      {
        id: 1,
        tipo: 'lead',
        titulo: 'Novo Lead Qualificado',
        mensagem: 'Maria Silva demonstrou interesse no Apartamento Luxo Ipanema',
        tempo: '2 min atrás',
        lida: false,
        prioridade: 'alta'
      },
      {
        id: 2,
        tipo: 'venda',
        titulo: 'Proposta Aceita',
        mensagem: 'Proposta de R$ 1.2M para Casa Moderna Barra foi aceita',
        tempo: '15 min atrás',
        lida: false,
        prioridade: 'alta'
      },
      {
        id: 3,
        tipo: 'visita',
        titulo: 'Visita Agendada',
        mensagem: 'João Santos agendou visita para amanhã às 14h',
        tempo: '1 hora atrás',
        lida: false,
        prioridade: 'media'
      }
    ];
    
    return React.createElement("div", { className: "relative" },
      // Botão de notificações
      React.createElement("button", {
        className: `relative p-3 rounded-xl transition-all duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-700'} shadow-lg hover:shadow-xl`,
        onClick: () => setNotificationsVisible(!notificationsVisible)
      },
        React.createElement("i", { className: "fas fa-bell text-xl" }),
        unreadCount > 0 && React.createElement("div", {
          className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse"
        }, unreadCount)
      ),
      
      // Painel de notificações
      notificationsVisible && React.createElement("div", {
        className: `absolute right-0 top-16 w-96 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} z-50 overflow-hidden`
      },
        React.createElement("div", {
          className: `p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'}`
        },
          React.createElement("h3", {
            className: `font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`
          }, "Notificações"),
          React.createElement("p", {
            className: `text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`
          }, `${unreadCount} não lidas`)
        ),
        React.createElement("div", { className: "max-h-96 overflow-y-auto" },
          notificacoesRecentes.map(notif => 
            React.createElement(NotificationCard, {
              key: notif.id,
              notification: notif,
              onMarkAsRead: (id) => {
                setUnreadCount(prev => Math.max(0, prev - 1));
              }
            })
          )
        )
      )
    );
  }; 
                  height: `${altura}%`, 
                  width: `${100 / tendencia.length}%`,
                  opacity: isHovered ? 1 : 0.7,
                  transform: isHovered ? `scaleY(1.1) translateY(-${index % 2 * 2}px)` : 'scaleY(1)'
                }
              }
            );
          })
        )
      ),
      
      // Barra de progresso para meta (se fornecida)
      meta && React.createElement("div", { className: "mt-4" },
        React.createElement("div", { className: "flex justify-between text-xs mb-1" },
          React.createElement("span", { className: `${darkMode ? 'text-gray-400' : 'text-gray-500'}` }, "Progresso"),
          React.createElement("span", { 
            className: `font-medium transition-all duration-500 ${darkMode ? 'text-gray-300' : 'text-gray-700'} ${progresso >= 100 ? 'text-green-500' : ''}`,
            style: { fontWeight: isHovered ? 600 : 500 }
          }, 
            `${progresso}%`
          )
        ),
        React.createElement("div", { className: `w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden` },
          React.createElement("div", { 
            className: `h-full rounded-full transition-all duration-1000 ${cor.replace('text-', 'bg-').replace('-100', '-500')}`,
            style: { 
              width: `${progresso}%`,
              boxShadow: isHovered ? '0 0 8px rgba(0, 0, 0, 0.2)' : 'none',
              background: isHovered ? `linear-gradient(90deg, ${cor.replace('text-', '#').replace('bg-', '#').replace('-500', '99')} 0%, ${cor.replace('text-', '#').replace('bg-', '#').replace('-500', 'cc')} 100%)` : ''
            }
          })
        )
      )
    );
  };
  
  // Componente de card para notificações melhorado
  const NotificationCard = ({ notification, onMarkAsRead }) => {
    const { id, tipo, mensagem, tempo, lida, acao, titulo } = notification;
    
    // Estado para animação de hover
    const [isHovered, setIsHovered] = useState(false);
    
    // Definir ícone e cor com base no tipo de notificação
    let icone = React.createElement("i", { className: "fas fa-bell" });
    let corFundo = darkMode ? "bg-gray-700" : "bg-blue-50";
    let corBorda = "border-blue-500";
    let corTexto = "text-blue-600";
    let corIcone = "bg-blue-500";
    
    switch (tipo) {
      case "lead":
        icone = React.createElement("i", { className: "fas fa-user-plus" });
        corFundo = darkMode ? "bg-gray-700" : "bg-green-50";
        corBorda = "border-green-500";
        corTexto = "text-green-600";
        corIcone = "bg-green-500";
        break;
      case "visita":
        icone = React.createElement("i", { className: "fas fa-home" });
        corFundo = darkMode ? "bg-gray-700" : "bg-purple-50";
        corBorda = "border-purple-500";
        corTexto = "text-purple-600";
        corIcone = "bg-purple-500";
        break;
      case "proposta":
        icone = React.createElement("i", { className: "fas fa-file-contract" });
        corFundo = darkMode ? "bg-gray-700" : "bg-amber-50";
        corBorda = "border-amber-500";
        corTexto = "text-amber-600";
        corIcone = "bg-amber-500";
        break;
      case "venda":
        icone = React.createElement("i", { className: "fas fa-handshake" });
        corFundo = darkMode ? "bg-gray-700" : "bg-indigo-50";
        corBorda = "border-indigo-500";
        corTexto = "text-indigo-600";
        corIcone = "bg-indigo-500";
        break;
    }
    
    // Formatar a data relativa (ex: "há 2 horas")
    const formatRelativeTime = (timeString) => {
      // Se já estiver formatado, retornar como está
      if (timeString.includes('atrás') || timeString === 'agora') {
        return timeString;
      }
      
      // Caso contrário, tentar formatar a data
      try {
        const date = new Date(timeString);
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);
        
        if (diffDay > 0) return `${diffDay}d atrás`;
        if (diffHour > 0) return `${diffHour}h atrás`;
        if (diffMin > 0) return `${diffMin}m atrás`;
        return 'agora';
      } catch (e) {
        return timeString; // Em caso de erro, retornar o original
      }
    };
    
    const formattedTime = formatRelativeTime(tempo);
    const notificationTitle = titulo || (tipo === "lead" ? "Novo lead recebido" : 
                                        tipo === "visita" ? "Visita agendada" :
                                        tipo === "proposta" ? "Nova proposta" :
                                        tipo === "venda" ? "Venda concluída" : "Notificação");
    
    return React.createElement(
      "div",
      { 
        className: `p-4 mb-3 rounded-lg border-l-4 ${corBorda} ${corFundo} ${darkMode ? 'text-white' : ''} transition-all duration-300 ${lida ? (darkMode ? 'opacity-60' : 'opacity-80') : ''} ${isHovered ? 'shadow-md transform -translate-y-1' : ''}`,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onClick: () => onMarkAsRead && onMarkAsRead(id),
        style: { cursor: 'pointer' }
      },
      React.createElement("div", { className: "flex items-start" },
        // Ícone
        React.createElement("div", { 
          className: `rounded-full p-2 mr-3 ${corIcone} text-white flex items-center justify-center transition-all duration-300`,
          style: { 
            minWidth: "36px", 
            height: "36px",
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            boxShadow: isHovered ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
          }
        }, icone),
        
        // Conteúdo
        React.createElement("div", { className: "flex-1" },
          React.createElement("div", { className: "flex justify-between items-start" },
            React.createElement("h4", { 
              className: `text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'} transition-all duration-300`,
              style: { fontWeight: isHovered ? 600 : 500 }
            }, notificationTitle),
            React.createElement("div", { className: "flex items-center" },
              React.createElement("span", { 
                className: `text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-2` 
              }, formattedTime),
              !lida && React.createElement("div", { 
                className: `w-2 h-2 rounded-full ${corIcone} transition-all duration-300`,
                style: { transform: isHovered ? 'scale(1.5)' : 'scale(1)' }
              }),
              React.createElement("button", { 
                className: `ml-2 text-gray-400 hover:${corTexto} transition-colors`,
                onClick: (e) => {
                  e.stopPropagation();
                  onMarkAsRead && onMarkAsRead(id);
                },
                title: "Marcar como lida"
              }, React.createElement("i", { className: "fas fa-check" }))
            )
          ),
          React.createElement("p", { 
            className: `text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}` 
          }, mensagem),
          acao && React.createElement("div", { className: "mt-2" },
            React.createElement("button", { 
              className: `text-xs font-medium ${corTexto} hover:underline transition-all duration-300`,
              style: { opacity: isHovered ? 1 : 0.9 }
            }, acao)
          )
        )
      )
    );
  };
  
  // Componente de barra de progresso melhorado
  const ProgressBar = ({ label, valor, total, cor = "bg-blue-500", crescimento, icone }) => {
    const porcentagem = valor / total * 100;
    
    return React.createElement(
      "div", 
      { className: `mb-4 ${darkMode ? 'text-white' : ''}` },
      React.createElement("div", { className: "flex justify-between items-center mb-2" },
        React.createElement("div", { className: "flex items-center" },
          icone && React.createElement("span", { className: "mr-2" }, icone),
          React.createElement("span", { className: `text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}` }, label)
        ),
        React.createElement("div", { className: "flex items-center" },
          React.createElement("span", { className: `text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mr-2` }, valor, "%"),
          crescimento && React.createElement("span", { 
            className: `text-xs ${crescimento > 0 ? 'text-green-500' : 'text-red-500'}` 
          }, 
            crescimento > 0 ? "↑" : "↓", 
            Math.abs(crescimento), "%"
          )
        )
      ),
      React.createElement("div", { className: `w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5 overflow-hidden` },
        React.createElement("div", {
          className: `${cor} h-2.5 rounded-full transition-all duration-500`,
          style: { width: `${porcentagem}%` }
        })
      )
    );
  };
  
  // Componente de gráfico de pizza melhorado
  const PieChart = ({ dados, titulo, subtitulo, referencia }) => {
    const total = dados.reduce((acc, item) => acc + item.valor, 0);
    let startAngle = 0;
    
    // Estado para item selecionado no hover
    const [itemHover, setItemHover] = useState(null);
    
    return React.createElement(
      "div", 
      { className: `bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}` },
      React.createElement("div", { className: "flex justify-between items-start mb-4" },
        React.createElement("div", null,
          React.createElement("h3", { className: `text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}` }, titulo),
          subtitulo && React.createElement("p", { className: `text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1` }, subtitulo)
        ),
        referencia && React.createElement("div", { className: `text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center` },
          React.createElement("span", { className: "mr-1" }, "vs"),
          React.createElement("span", { className: `font-medium ${referencia.crescimento > 0 ? 'text-green-500' : 'text-red-500'}` },
            referencia.crescimento > 0 ? "↑" : "↓", 
            Math.abs(referencia.crescimento), "%"
          ),
          React.createElement("span", { className: "ml-1" }, referencia.periodo)
        )
      ),
      React.createElement("div", { className: "flex flex-col md:flex-row items-center" },
        React.createElement("div", { className: "relative w-48 h-48 md:w-40 md:h-40 lg:w-48 lg:h-48" },
          React.createElement("svg", { 
            width: "100%", 
            height: "100%", 
            viewBox: "0 0 200 200", 
            className: "transform -rotate-90" 
          },
            // Círculo de fundo para tema escuro
            darkMode && React.createElement("circle", {
              cx: 100,
              cy: 100,
              r: 80,
              fill: "#374151" // gray-700
            }),
            // Fatias do gráfico
            dados.map((item, index) => {
              const percentage = item.valor / total * 100;
              const angle = percentage / 100 * 360;
              const x1 = 100 + 80 * Math.cos(startAngle * Math.PI / 180);
              const y1 = 100 + 80 * Math.sin(startAngle * Math.PI / 180);
              const x2 = 100 + 80 * Math.cos((startAngle + angle) * Math.PI / 180);
              const y2 = 100 + 80 * Math.sin((startAngle + angle) * Math.PI / 180);
              const largeArcFlag = angle > 180 ? 1 : 0;
              const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
              
              // Calcular ângulo médio para animação de hover
              const midAngle = startAngle + angle / 2;
              const hoverOffset = itemHover === index ? 10 : 0;
              const translateX = hoverOffset * Math.cos((midAngle - 90) * Math.PI / 180);
              const translateY = hoverOffset * Math.sin((midAngle - 90) * Math.PI / 180);
              
              const result = React.createElement(
                "path",
                {
                  key: index,
                  d: pathData,
                  fill: item.cor,
                  className: "transition-all duration-300",
                  style: { 
                    opacity: itemHover !== null && itemHover !== index ? 0.7 : 1,
                    transform: `translate(${translateX}px, ${translateY}px)`,
                    filter: itemHover === index ? 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' : 'none'
                  },
                  onMouseEnter: () => setItemHover(index),
                  onMouseLeave: () => setItemHover(null)
                }
              );
              
              startAngle += angle;
              return result;
            }),
            // Círculo central
            React.createElement("circle", {
              cx: 100,
              cy: 100,
              r: 40,
              fill: darkMode ? "#1F2937" : "white", // gray-800 ou branco
              className: "drop-shadow-sm"
            })
          ),
          React.createElement("div", { className: "absolute inset-0 flex items-center justify-center" },
            React.createElement("div", { className: "text-center" },
              React.createElement("div", { className: `text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}` }, total, "%"),
              React.createElement("div", { className: `text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}` }, "Total")
            )
          )
        ),
        React.createElement("div", { className: "mt-4 md:mt-0 md:ml-6 flex-1 space-y-2 max-h-48 overflow-y-auto" },
          dados.map((item, index) => React.createElement(
            "div", 
            { 
              key: index, 
              className: `flex items-center justify-between p-2 rounded-lg transition-colors ${itemHover === index ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`,
              onMouseEnter: () => setItemHover(index),
              onMouseLeave: () => setItemHover(null)
            },
            React.createElement("div", { className: "flex items-center" },
              React.createElement("div", {
                className: "w-3 h-3 rounded-full mr-2",
                style: { backgroundColor: item.cor }
              }),
              React.createElement("span", { className: `text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}` }, item.nome)
            ),
            React.createElement("div", { className: "flex items-center" },
              React.createElement("span", { className: `text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mr-2` }, item.valor, "%"),
              item.crescimento !== undefined && React.createElement("span", { 
                className: `text-xs ${item.crescimento > 0 ? 'text-green-500' : 'text-red-500'}` 
              }, 
                item.crescimento > 0 ? "↑" : "↓", 
                Math.abs(item.crescimento), "%"
              )
            )
          ))
        )
      )
    );
  };
  
  // Componente de gráfico de barras melhorado
  const LineChart = ({ dados, titulo, subtitulo, referencia, tipo = "barras" }) => {
    const maxValor = Math.max(...dados.map((d) => d.valor));
    const [itemHover, setItemHover] = useState(null);
    
    return React.createElement(
      "div", 
      { className: `bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}` },
      React.createElement("div", { className: "flex justify-between items-start mb-4" },
        React.createElement("div", null,
          React.createElement("h3", { className: `text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}` }, titulo),
          subtitulo && React.createElement("p", { className: `text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1` }, subtitulo)
        ),
        referencia && React.createElement("div", { className: `text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center` },
          React.createElement("span", { className: "mr-1" }, "vs"),
          React.createElement("span", { className: `font-medium ${referencia.crescimento > 0 ? 'text-green-500' : 'text-red-500'}` },
            referencia.crescimento > 0 ? "↑" : "↓", 
            Math.abs(referencia.crescimento), "%"
          ),
          React.createElement("span", { className: "ml-1" }, referencia.periodo)
        )
      ),
      React.createElement("div", { className: "h-64 flex items-end justify-between relative" },
        // Linhas de grade horizontais
        [0, 25, 50, 75, 100].map(percent => React.createElement(
          "div", 
          { 
            key: `grid-${percent}`,
            className: `absolute w-full border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`,
            style: { bottom: `${percent}%` }
          },
          React.createElement("span", { 
            className: `absolute -left-6 -top-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}` 
          }, 
            Math.round(maxValor * percent / 100)
          )
        )),
        // Barras ou linhas do gráfico
        dados.map((item, index) => {
          const altura = item.valor / maxValor * 100;
          const isHovered = itemHover === index;
          
          return React.createElement(
            "div", 
            { 
              key: index, 
              className: "flex flex-col items-center relative group z-10",
              style: { flex: 1 },
              onMouseEnter: () => setItemHover(index),
              onMouseLeave: () => setItemHover(null)
            },
            // Tooltip no hover
            isHovered && React.createElement(
              "div", 
              { 
                className: `absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 z-20`,
                style: { whiteSpace: 'nowrap' }
              },
              `${item.mes}: ${item.valor} leads${item.conversao ? `, ${item.conversao} conversões` : ''}`
            ),
            // Barra principal
            React.createElement(
              "div",
              {
                className: `rounded-t w-full max-w-[30px] transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-90'}`,
                style: { 
                  height: `${altura}%`, 
                  background: isHovered 
                    ? 'linear-gradient(to top, #3B82F6, #60A5FA)' 
                    : 'linear-gradient(to top, #4B5563, #6B7280)',
                  boxShadow: isHovered ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
                }
              }
            ),
            // Barra secundária (conversões) se existir
            item.conversao && React.createElement(
              "div",
              {
                className: "absolute bottom-0 rounded-t w-full max-w-[30px] opacity-80 transition-all duration-300",
                style: { 
                  height: `${(item.conversao / maxValor) * 100}%`,
                  background: isHovered 
                    ? 'linear-gradient(to top, #10B981, #34D399)' 
                    : 'linear-gradient(to top, #059669, #10B981)',
                  width: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }
              }
            ),
            // Rótulo do mês
            React.createElement("span", { 
              className: `text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} ${isHovered ? 'font-medium' : ''}` 
            }, 
              item.mes
            )
          );
        })
      )
    );
  };

  // Componente de Monitoramento em Tempo Real
  const RealTimeMonitor = () => {
    const [isLive, setIsLive] = React.useState(true);
    
    return React.createElement(
      "div", 
      { className: `bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}` },
      React.createElement("div", { className: "flex items-center justify-between mb-4" },
        React.createElement("h3", { className: `text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}` }, "📊 Monitoramento em Tempo Real"),
        React.createElement("div", { className: "flex items-center space-x-2" },
          React.createElement("div", { className: `w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}` }),
          React.createElement("span", { className: `text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}` }, isLive ? 'Ao Vivo' : 'Offline')
        )
      ),
      
      React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4" },
        React.createElement("div", { className: "bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg" },
          React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("div", null,
              React.createElement("p", { className: "text-sm font-medium text-blue-700" }, "Visitantes Online"),
              React.createElement("p", { className: "text-2xl font-bold text-blue-900" }, realTimeData.visitantesOnline)
            ),
            React.createElement("div", { className: "text-blue-600 text-2xl" }, "👥")
          ),
          React.createElement("p", { className: "text-xs text-blue-600 mt-2" }, `+${Math.floor(Math.random() * 5)} nos últimos 5min`)
        ),
        
        React.createElement("div", { className: "bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg" },
          React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("div", null,
              React.createElement("p", { className: "text-sm font-medium text-green-700" }, "Leads Hoje"),
              React.createElement("p", { className: "text-2xl font-bold text-green-900" }, realTimeData.leadsHoje)
            ),
            React.createElement("div", { className: "text-green-600 text-2xl" }, "🎯")
          ),
          React.createElement("p", { className: "text-xs text-green-600 mt-2" }, "Meta: 50 leads/dia")
        ),
        
        React.createElement("div", { className: "bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg" },
          React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("div", null,
              React.createElement("p", { className: "text-sm font-medium text-yellow-700" }, "Alertas Ativos"),
              React.createElement("p", { className: "text-2xl font-bold text-yellow-900" }, realTimeData.alertas)
            ),
            React.createElement("div", { className: "text-yellow-600 text-2xl" }, "⚠️")
          ),
          React.createElement("p", { className: "text-xs text-yellow-600 mt-2" }, "Requer atenção")
        )
      ),
      
      React.createElement("div", { className: "mt-4 p-3 bg-gray-50 rounded-lg" },
        React.createElement("p", { className: `text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2` }, "Atividade Recente:"),
        React.createElement("div", { className: "space-y-1" },
          React.createElement("p", { className: `text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}` }, "• Novo lead: João Silva - Apartamento Copacabana"),
          React.createElement("p", { className: `text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}` }, "• Visualização: Casa Barra da Tijuca - 3 min atrás"),
          React.createElement("p", { className: `text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}` }, "• Contato WhatsApp: Maria Santos - 5 min atrás")
        )
      )
    );
  };

  // Componente de Análise Preditiva
  const PredictiveAnalytics = () => {
    return React.createElement(
      "div", 
      { className: `bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}` },
      React.createElement("h3", { className: `text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4` }, "🔮 Análise Preditiva"),
      
      React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
        React.createElement("div", { className: "space-y-4" },
          React.createElement("div", { className: "bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg" },
            React.createElement("h4", { className: "font-semibold text-purple-800 mb-2" }, "Previsão de Leads"),
            React.createElement("div", { className: "flex items-center justify-between" },
              React.createElement("div", null,
                React.createElement("p", { className: "text-2xl font-bold text-purple-900" }, predictiveData.previsaoLeads),
                React.createElement("p", { className: "text-sm text-purple-700" }, "Próximos 30 dias")
              ),
              React.createElement("div", { className: "text-purple-600 text-2xl" }, "📈")
            ),
            React.createElement("div", { className: "mt-2 bg-purple-200 rounded-full h-2" },
              React.createElement("div", { className: "bg-purple-600 h-2 rounded-full", style: {width: '75%'} })
            )
          ),
          
          React.createElement("div", { className: "bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg" },
            React.createElement("h4", { className: "font-semibold text-indigo-800 mb-2" }, "Tendência de Vendas"),
            React.createElement("div", { className: "flex items-center justify-between" },
              React.createElement("div", null,
                React.createElement("p", { className: "text-2xl font-bold text-indigo-900" }, predictiveData.tendenciaVendas),
                React.createElement("p", { className: "text-sm text-indigo-700" }, "vs. mês anterior")
              ),
              React.createElement("div", { className: "text-indigo-600 text-2xl" }, "📊")
            )
          )
        ),
        
        React.createElement("div", { className: "space-y-4" },
          React.createElement("div", { className: "bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-lg" },
            React.createElement("h4", { className: "font-semibold text-emerald-800 mb-2" }, "Oportunidades"),
            React.createElement("div", { className: "space-y-2" },
              predictiveData.oportunidades.map((oportunidade, index) =>
                React.createElement("div", { key: index, className: "flex items-center justify-between" },
                  React.createElement("span", { className: "text-sm text-emerald-700" }, oportunidade.tipo),
                  React.createElement("span", { className: "text-sm font-semibold text-emerald-900" }, `${oportunidade.probabilidade}%`)
                )
              )
            )
          ),
          
          React.createElement("div", { className: "bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg" },
            React.createElement("h4", { className: "font-semibold text-red-800 mb-2" }, "Riscos Identificados"),
            React.createElement("div", { className: "space-y-2" },
              predictiveData.riscos.map((risco, index) =>
                React.createElement("div", { key: index, className: "flex items-center justify-between" },
                  React.createElement("span", { className: "text-sm text-red-700" }, risco.tipo),
                  React.createElement("span", { className: "text-sm font-semibold text-red-900" }, risco.nivel)
                )
              )
            )
          )
        )
      )
    );
  };

  // Componente de Heatmap
  const HeatmapChart = () => {
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const horas = Array.from({length: 24}, (_, i) => i);
    
    const getIntensity = (dia, hora) => {
      return heatmapData.atividade[dia] && heatmapData.atividade[dia][hora] || 0;
    };
    
    const getColor = (intensity) => {
      if (intensity === 0) return 'bg-gray-100';
      if (intensity <= 2) return 'bg-green-200';
      if (intensity <= 5) return 'bg-green-400';
      if (intensity <= 8) return 'bg-green-600';
      return 'bg-green-800';
    };
    
    return React.createElement(
      "div", 
      { className: `bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}` },
      React.createElement("h3", { className: `text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4` }, "🔥 Mapa de Calor - Atividade por Horário"),
      
      React.createElement("div", { className: "overflow-x-auto" },
        React.createElement("div", { className: "grid gap-1 text-xs", style: { gridTemplateColumns: 'repeat(25, minmax(0, 1fr))' } },
          React.createElement("div"),
          horas.map(hora =>
            React.createElement("div", { key: hora, className: `text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} p-1` }, `${hora}h`)
          ),
          
          dias.map((dia, diaIndex) => [
            React.createElement("div", { key: dia, className: `${darkMode ? 'text-gray-400' : 'text-gray-600'} p-1 font-medium` }, dia),
            ...horas.map(hora => {
              const intensity = getIntensity(diaIndex, hora);
              return React.createElement(
                "div", 
                { 
                  key: `${dia}-${hora}`,
                  className: `w-4 h-4 rounded ${getColor(intensity)} cursor-pointer hover:scale-110 transition-transform`,
                  title: `${dia} ${hora}:00 - ${intensity} atividades`
                }
              );
            })
          ]).flat()
        )
      ),
      
      React.createElement("div", { className: `flex items-center justify-between mt-4 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}` },
        React.createElement("span", null, "Menos atividade"),
        React.createElement("div", { className: "flex space-x-1" },
          React.createElement("div", { className: "w-3 h-3 bg-gray-100 rounded" }),
          React.createElement("div", { className: "w-3 h-3 bg-green-200 rounded" }),
          React.createElement("div", { className: "w-3 h-3 bg-green-400 rounded" }),
          React.createElement("div", { className: "w-3 h-3 bg-green-600 rounded" }),
          React.createElement("div", { className: "w-3 h-3 bg-green-800 rounded" })
        ),
        React.createElement("span", null, "Mais atividade")
      )
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "imoveis":
        return renderImoveis();
      case "leads":
        return renderLeads();
      case "analytics":
        return renderAnalytics();
      case "campanhas":
        return renderCampanhas();
      case "configuracoes":
        return renderConfiguracoes();
      case "perfil-publico":
        return renderPerfilPublico();
      default:
        return renderDashboard();
    }
  };
  // Dashboard Ultra Moderno
  const renderDashboard = () => {
    return React.createElement("div", {
      className: `min-h-screen transition-all duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'}`,
      style: {
        backgroundImage: darkMode 
          ? 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'
          : 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.8) 0%, transparent 50%)'
      }
    },
      // Header moderno com notificações
      React.createElement("div", {
        className: `relative mb-8 p-6 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-xl border ${darkMode ? 'border-gray-700/50' : 'border-white/20'} shadow-xl`
      },
        React.createElement("div", { className: "flex justify-between items-center" },
          React.createElement("div", {},
            React.createElement("h1", {
              className: `text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`,
              style: {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }
            }, "🏠 SmartImóveis Dashboard"),
            React.createElement("p", {
              className: `text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`
            }, "Visão completa dos seus negócios imobiliários")
          ),
          React.createElement("div", { className: "flex items-center space-x-4" },
            React.createElement(ModernNotificationSystem),
            React.createElement("div", {
              className: `px-4 py-2 rounded-xl ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} shadow-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`
            },
              React.createElement("span", { className: "text-sm font-semibold" }, "🕐 ", new Date().toLocaleString('pt-BR'))
            )
          )
        )
      ),
      
      // Cards de estatísticas ultra modernos
      React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12" },
        React.createElement(StatCard, {
          titulo: "Total Imóveis",
          valor: stats.totalImoveis,
          subvalor: "Em carteira ativa",
          icone: "🏠",
          categoria: "leads",
          crescimento: 12,
          meta: 150,
          tendencia: [0.8, 0.9, 0.7, 1.0, 0.85, 0.95, 1.0]
        }),
        React.createElement(StatCard, {
          titulo: "Leads/Mês",
          valor: stats.leadsMes,
          subvalor: "Novos interessados",
          icone: "👥",
          categoria: "vendas",
          crescimento: 8,
          meta: 100,
          tendencia: [0.6, 0.8, 0.9, 0.7, 0.85, 0.95, 1.0]
        }),
        React.createElement(StatCard, {
          titulo: "Taxa Conversão",
          valor: `${stats.conversao}%`,
          subvalor: "Lead → Venda",
          icone: "📈",
          categoria: "conversao",
          crescimento: -2,
          meta: 25,
          tendencia: [0.9, 0.8, 0.85, 0.7, 0.75, 0.8, 0.85]
        }),
        React.createElement(StatCard, {
          titulo: "Faturamento",
          valor: `R$ ${(stats.faturamento / 1000).toFixed(0)}K`,
          subvalor: "Mês atual",
          icone: "💰",
          categoria: "receita",
          crescimento: 15,
          meta: 500000,
          tendencia: [0.7, 0.8, 0.9, 0.85, 0.95, 1.0, 1.1]
        })
      ),
      
      // Seção de Analytics Avançados
      React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12" },
        // Monitoramento em Tempo Real
        React.createElement("div", {
          className: `p-6 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-xl border ${darkMode ? 'border-gray-700/50' : 'border-white/20'} shadow-xl`
        },
          React.createElement("h3", {
            className: `text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center`
          },
            React.createElement("span", { className: "mr-3" }, "⚡"),
            "Tempo Real"
          ),
          React.createElement(RealTimeMonitor)
        ),
        
        // Análise Preditiva
        React.createElement("div", {
          className: `p-6 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-xl border ${darkMode ? 'border-gray-700/50' : 'border-white/20'} shadow-xl`
        },
          React.createElement("h3", {
            className: `text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center`
          },
            React.createElement("span", { className: "mr-3" }, "🔮"),
            "Análise Preditiva"
          ),
          React.createElement(PredictiveAnalytics)
        ),
        
        // Heatmap de Atividade
        React.createElement("div", {
          className: `p-6 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-xl border ${darkMode ? 'border-gray-700/50' : 'border-white/20'} shadow-xl`
        },
          React.createElement("h3", {
            className: `text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center`
          },
            React.createElement("span", { className: "mr-3" }, "🗺️"),
            "Mapa de Calor"
          ),
          React.createElement(HeatmapChart)
        )
      ),
      
      // Gráficos principais modernizados
      React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" },
        React.createElement("div", {
          className: `p-6 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-xl border ${darkMode ? 'border-gray-700/50' : 'border-white/20'} shadow-xl`
        },
          React.createElement(LineChart, {
            dados: leadsMensais,
            titulo: "📊 Evolução de Leads"
          })
        ),
        React.createElement("div", {
          className: `p-6 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-xl border ${darkMode ? 'border-gray-700/50' : 'border-white/20'} shadow-xl`
        },
          React.createElement(PieChart, {
            dados: graficoOrigem,
            titulo: "🎯 Origem do Tráfego"
          })
        )
      ),
      
      // Performance por Canal Modernizada
      React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" },
        React.createElement("div", {
          className: `p-6 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-xl border ${darkMode ? 'border-gray-700/50' : 'border-white/20'} shadow-xl`
        },
          React.createElement(PieChart, {
            dados: graficoDispositivos,
            titulo: "💻 Dispositivos"
          })
        ),
        React.createElement("div", {
          className: `p-6 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-xl border ${darkMode ? 'border-gray-700/50' : 'border-white/20'} shadow-xl`
        },
          React.createElement("h3", {
            className: `text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center`
          },
            React.createElement("span", { className: "mr-3" }, "🎯"),
            "Performance por Canal"
          ),
          React.createElement("div", { className: "space-y-4" },
            React.createElement(ProgressBar, {
              label: "WhatsApp",
              valor: 85,
              total: 100,
              cor: "bg-green-500",
              crescimento: 5,
              icone: "📱"
            }),
            React.createElement(ProgressBar, {
              label: "Facebook Ads",
              valor: 72,
              total: 100,
              cor: "bg-blue-500",
              crescimento: 3,
              icone: "📘"
            }),
            React.createElement(ProgressBar, {
              label: "Google Ads",
              valor: 58,
              total: 100,
              cor: "bg-yellow-500",
              crescimento: -2,
              icone: "🔍"
            }),
            React.createElement(ProgressBar, {
              label: "Instagram",
              valor: 43,
              total: 100,
              cor: "bg-pink-500",
              crescimento: 8,
              icone: "📷"
            }),
            React.createElement(ProgressBar, {
              label: "Indicações",
              valor: 91,
              total: 100,
              cor: "bg-purple-500",
              crescimento: 12,
              icone: "🤝"
            })
          )
        )
      ),
      
      // Tabela de Imóveis Ultra Moderna
      React.createElement("div", {
        className: `rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-xl border ${darkMode ? 'border-gray-700/50' : 'border-white/20'} shadow-xl overflow-hidden`
      },
        React.createElement("div", {
          className: `px-8 py-6 border-b ${darkMode ? 'border-gray-700/50 bg-gray-750/50' : 'border-gray-200/50 bg-gray-50/50'}`
        },
          React.createElement("h3", {
            className: `text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center`
          },
            React.createElement("span", { className: "mr-3" }, "🏆"),
            "Imóveis com Melhor Performance"
          )
        ),
        React.createElement("div", { className: "overflow-x-auto" },
          React.createElement("table", { className: "w-full" },
            React.createElement("thead", {
              className: `${darkMode ? 'bg-gray-700/30' : 'bg-gray-50/80'}`
            },
              React.createElement("tr", {},
                React.createElement("th", {
                  className: `px-8 py-4 text-left text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`
                }, "Imóvel"),
                React.createElement("th", {
                  className: `px-8 py-4 text-left text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`
                }, "Preço"),
                React.createElement("th", {
                  className: `px-8 py-4 text-left text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`
                }, "Visualizações"),
                React.createElement("th", {
                  className: `px-8 py-4 text-left text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`
                }, "Leads"),
                React.createElement("th", {
                  className: `px-8 py-4 text-left text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`
                }, "Status"),
                React.createElement("th", {
                  className: `px-8 py-4 text-left text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`
                }, "Ações")
              )
            ),
            React.createElement("tbody", {
              className: `${darkMode ? 'bg-gray-800/30' : 'bg-white/50'} divide-y ${darkMode ? 'divide-gray-700/50' : 'divide-gray-200/50'}`
            },
              imoveis.slice(0, 5).map((imovel, index) =>
                React.createElement("tr", {
                  key: imovel.id,
                  className: `transition-all duration-300 ${darkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50/80'} group`
                },
                  React.createElement("td", { className: "px-8 py-6" },
                    React.createElement("div", { className: "flex items-center space-x-4" },
                      React.createElement("div", {
                        className: `w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`
                      }, index + 1),
                      React.createElement("div", {},
                        React.createElement("div", {
                          className: `text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors`
                        }, imovel.titulo),
                        React.createElement("div", {
                          className: `text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`
                        },
                          React.createElement("span", { className: "mr-1" }, "📍"),
                          imovel.cidade
                        )
                      )
                    )
                  ),
                  React.createElement("td", { className: "px-8 py-6" },
                    React.createElement("div", {
                      className: "text-xl font-black text-green-600 group-hover:scale-105 transition-transform"
                    }, "R$ ", imovel.preco.toLocaleString("pt-BR"))
                  ),
                  React.createElement("td", { className: "px-8 py-6" },
                    React.createElement("div", {
                      className: `text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`
                    },
                      React.createElement("span", { className: "mr-2" }, "👁️"),
                      imovel.visualizacoes.toLocaleString()
                    )
                  ),
                  React.createElement("td", { className: "px-8 py-6" },
                    React.createElement("div", {
                      className: `text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`
                    },
                      React.createElement("span", { className: "mr-2" }, "🎯"),
                      imovel.leads
                    )
                  ),
                  React.createElement("td", { className: "px-8 py-6" },
                    React.createElement("span", {
                      className: "inline-flex px-4 py-2 text-sm font-bold rounded-full bg-green-100 text-green-800 shadow-lg group-hover:scale-105 transition-transform"
                    }, "✅ ", imovel.status)
                  ),
                  React.createElement("td", { className: "px-8 py-6" },
                    React.createElement("div", { className: "flex space-x-3" },
                      React.createElement("button", {
                        className: "px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                      }, "👁️ Ver"),
                      React.createElement("button", {
                        className: "px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                      }, "✏️ Editar")
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  };
  const renderImoveis = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-gray-800 mb-2" }, "Gest\xE3o de Im\xF3veis"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-600" }, "Gerencie todos os seus im\xF3veis cadastrados")), /* @__PURE__ */ React.createElement("button", { className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors" }, "+ Novo Im\xF3vel")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "Total de Im\xF3veis"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "127")), /* @__PURE__ */ React.createElement("div", { className: "bg-blue-100 text-blue-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F3E0}")))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "Dispon\xEDveis"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "89")), /* @__PURE__ */ React.createElement("div", { className: "bg-green-100 text-green-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u2705")))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "Vendidos"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "38")), /* @__PURE__ */ React.createElement("div", { className: "bg-yellow-100 text-yellow-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F4B0}"))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "px-6 py-4 border-b border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-800" }, "Lista de Im\xF3veis"), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-2" }, /* @__PURE__ */ React.createElement("select", { className: "border border-gray-300 rounded-lg px-3 py-2 text-sm" }, /* @__PURE__ */ React.createElement("option", null, "Todos os tipos"), /* @__PURE__ */ React.createElement("option", null, "Apartamento"), /* @__PURE__ */ React.createElement("option", null, "Casa"), /* @__PURE__ */ React.createElement("option", null, "Cobertura")), /* @__PURE__ */ React.createElement("select", { className: "border border-gray-300 rounded-lg px-3 py-2 text-sm" }, /* @__PURE__ */ React.createElement("option", null, "Todos os status"), /* @__PURE__ */ React.createElement("option", null, "Dispon\xEDvel"), /* @__PURE__ */ React.createElement("option", null, "Vendido"), /* @__PURE__ */ React.createElement("option", null, "Reservado"))))), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-gray-50" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Im\xF3vel"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Pre\xE7o"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Leads"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "A\xE7\xF5es"))), /* @__PURE__ */ React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, imoveis.map((imovel) => /* @__PURE__ */ React.createElement("tr", { key: imovel.id, className: "hover:bg-gray-50" }, /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-sm font-medium text-gray-900" }, imovel.titulo), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-500" }, imovel.cidade))), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm font-semibold text-green-600" }, "R$ ", imovel.preco.toLocaleString("pt-BR"))), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" }, /* @__PURE__ */ React.createElement("span", { className: "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800" }, imovel.status)), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-900" }, imovel.leads)), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, /* @__PURE__ */ React.createElement("button", { className: "text-blue-600 hover:text-blue-900 mr-3" }, "Ver"), /* @__PURE__ */ React.createElement("button", { className: "text-indigo-600 hover:text-indigo-900 mr-3" }, "Editar"), /* @__PURE__ */ React.createElement("button", { className: "text-red-600 hover:text-red-900" }, "Excluir")))))))));
  const renderLeads = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-gray-800 mb-2" }, "Gest\xE3o de Leads"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-600" }, "Acompanhe e gerencie todos os seus leads")), /* @__PURE__ */ React.createElement("button", { className: "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors" }, "+ Novo Lead")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "Novos Leads"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "23")), /* @__PURE__ */ React.createElement("div", { className: "bg-blue-100 text-blue-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F195}")))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "Em Contato"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "45")), /* @__PURE__ */ React.createElement("div", { className: "bg-yellow-100 text-yellow-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F4DE}")))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "Qualificados"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "12")), /* @__PURE__ */ React.createElement("div", { className: "bg-purple-100 text-purple-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u2B50")))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "Convertidos"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "8")), /* @__PURE__ */ React.createElement("div", { className: "bg-green-100 text-green-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F389}"))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-800 mb-4" }, "Funil de Vendas"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-4 bg-blue-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-4 h-4 bg-blue-500 rounded-full" }), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-gray-800" }, "Novos Leads")), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl font-bold text-blue-600" }, "23"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "leads"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-4 bg-yellow-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-4 h-4 bg-yellow-500 rounded-full" }), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-gray-800" }, "Em Contato")), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl font-bold text-yellow-600" }, "45"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "leads"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-4 bg-purple-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-4 h-4 bg-purple-500 rounded-full" }), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-gray-800" }, "Qualificados")), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl font-bold text-purple-600" }, "12"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "leads"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-4 bg-green-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-4 h-4 bg-green-500 rounded-full" }), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-gray-800" }, "Convertidos")), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl font-bold text-green-600" }, "8"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "vendas"))))));
  const renderAnalytics = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-gray-800 mb-2" }, "Analytics Avançado"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-600" }, "Análises detalhadas e inteligência de negócio")), /* @__PURE__ */ React.createElement(RealTimeMonitor), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(PredictiveAnalytics), /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-800 mb-4" }, "📊 Métricas de Performance"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 bg-blue-50 rounded-lg" }, /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-blue-600" }, performanceMetrics.tempoResposta, "h"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-blue-700" }, "Tempo Médio de Resposta")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 bg-green-50 rounded-lg" }, /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-green-600" }, performanceMetrics.satisfacaoCliente, "%"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-green-700" }, "Satisfação do Cliente")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 bg-purple-50 rounded-lg" }, /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-purple-600" }, "R$ ", performanceMetrics.custoPorLead), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-purple-700" }, "Custo por Lead")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 bg-yellow-50 rounded-lg" }, /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-yellow-600" }, performanceMetrics.nps), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-yellow-700" }, "Net Promoter Score")))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-800 mb-4" }, "💰 Métricas Financeiras"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium text-gray-700" }, "Taxa de Churn"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-bold text-red-600" }, performanceMetrics.churnRate, "%")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium text-gray-700" }, "Lifetime Value (LTV)"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-bold text-green-600" }, "R$ ", performanceMetrics.ltv.toLocaleString())), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium text-gray-700" }, "Custo de Aquisição (CAC)"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-bold text-blue-600" }, "R$ ", performanceMetrics.cac.toLocaleString())), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center p-3 bg-green-50 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium text-gray-700" }, "Razão LTV/CAC"), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-bold text-green-700" }, (performanceMetrics.ltv / performanceMetrics.cac).toFixed(1), ":1")))))), /* @__PURE__ */ React.createElement(HeatmapChart), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(LineChart, { dados: leadsMensais, titulo: "📈 Tendência de Crescimento" }), /* @__PURE__ */ React.createElement(PieChart, { dados: graficoOrigem, titulo: "🎯 ROI por Canal" })), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-800 mb-4" }, "📋 Relatórios Personalizados"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement("button", { className: "flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "📊"), /* @__PURE__ */ React.createElement("div", { className: "text-left" }, /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-gray-800" }, "Relatório Mensal"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Performance do mês"))), /* @__PURE__ */ React.createElement("button", { className: "flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "💹"), /* @__PURE__ */ React.createElement("div", { className: "text-left" }, /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-gray-800" }, "Análise de ROI"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Retorno dos investimentos"))), /* @__PURE__ */ React.createElement("button", { className: "flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "🎯"), /* @__PURE__ */ React.createElement("div", { className: "text-left" }, /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-gray-800" }, "Funil de Conversão"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Taxa de conversão"))))));
  const renderCampanhas = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-gray-800 mb-2" }, "Campanhas de Marketing"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-600" }, "Gerencie suas campanhas publicit\xE1rias")), /* @__PURE__ */ React.createElement("button", { className: "bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors" }, "+ Nova Campanha")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "Campanhas Ativas"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "12")), /* @__PURE__ */ React.createElement("div", { className: "bg-green-100 text-green-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F680}")))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "Investimento Total"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "R$ 15.4K")), /* @__PURE__ */ React.createElement("div", { className: "bg-blue-100 text-blue-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F4B8}")))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "ROAS M\xE9dio"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "4.2x")), /* @__PURE__ */ React.createElement("div", { className: "bg-yellow-100 text-yellow-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F4CA}"))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-800 mb-4" }, "\u{1F3AF} Campanhas por Plataforma"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-4 bg-blue-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F4D8}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-medium text-gray-800" }, "Facebook Ads"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "5 campanhas ativas"))), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg font-bold text-blue-600" }, "R$ 6.2K"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "investido"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-4 bg-red-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F4F7}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-medium text-gray-800" }, "Instagram Ads"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "4 campanhas ativas"))), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg font-bold text-red-600" }, "R$ 4.8K"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "investido"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-4 bg-yellow-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F50D}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-medium text-gray-800" }, "Google Ads"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "3 campanhas ativas"))), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg font-bold text-yellow-600" }, "R$ 4.4K"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "investido"))))));
  const renderConfiguracoes = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-gray-800 mb-2" }, "Configura\xE7\xF5es"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-600" }, "Personalize as configura\xE7\xF5es do sistema")), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "border-b border-gray-200" }, /* @__PURE__ */ React.createElement("nav", { className: "flex space-x-8 px-6" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setPerfilTab("perfil"),
      className: `py-4 px-1 border-b-2 font-medium text-sm ${perfilTab === "perfil" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`
    },
    "\u{1F464} Perfil do Usu\xE1rio"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setPerfilTab("sistema"),
      className: `py-4 px-1 border-b-2 font-medium text-sm ${perfilTab === "sistema" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`
    },
    "\u{1F527} Sistema"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setPerfilTab("publico"),
      className: `py-4 px-1 border-b-2 font-medium text-sm ${perfilTab === "publico" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`
    },
    "\u{1F310} Perfil P\xFAblico"
  ))), /* @__PURE__ */ React.createElement("div", { className: "p-6" }, perfilTab === "perfil" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-800 mb-4" }, "Informa\xE7\xF5es Pessoais"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Nome Completo"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: currentUser.nome,
      className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      readOnly: true
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Tipo de Usu\xE1rio"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: currentUser.tipo,
      className: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50",
      readOnly: true
    }
  )), /* @__PURE__ */ React.createElement("button", { className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors" }, "Atualizar Perfil")), perfilTab === "sistema" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-800 mb-4" }, "Configura\xE7\xF5es do Sistema"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-gray-800" }, "Notifica\xE7\xF5es por Email"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Receber notifica\xE7\xF5es de novos leads")), /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "w-4 h-4 text-blue-600" })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-gray-800" }, "Backup Autom\xE1tico"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Backup di\xE1rio dos dados")), /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "w-4 h-4 text-blue-600", defaultChecked: true })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-gray-800" }, "Modo Escuro"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Alternar tema do dashboard")), /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "w-4 h-4 text-blue-600" }))), perfilTab === "publico" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-800" }, "Perfil P\xFAblico do Corretor"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-600" }, "Ativo"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "checkbox",
      checked: perfilPublico.ativo,
      onChange: (e) => setPerfilPublico({ ...perfilPublico, ativo: e.target.checked }),
      className: "w-4 h-4 text-blue-600"
    }
  ))), perfilPublico.ativo && /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-blue-50 p-4 rounded-lg" }, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "\u{1F517} Seu Link P\xFAblico"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: perfilPublico.link,
      className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      readOnly: true
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigator.clipboard.writeText(`https://${perfilPublico.link}`),
      className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
    },
    "Copiar"
  )), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-600 mt-1" }, "Compartilhe este link para clientes verem seus im\xF3veis")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "\u{1F4F1} WhatsApp"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: perfilPublico.whatsapp,
      onChange: (e) => setPerfilPublico({ ...perfilPublico, whatsapp: e.target.value }),
      className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "5521999999999"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "\u{1F4DE} Telefone"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: perfilPublico.telefone,
      onChange: (e) => setPerfilPublico({ ...perfilPublico, telefone: e.target.value }),
      className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "(21) 99999-9999"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "\u{1F4E7} Email"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      value: perfilPublico.email,
      onChange: (e) => setPerfilPublico({ ...perfilPublico, email: e.target.value }),
      className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "seuemail@exemplo.com"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "\u{1F4F7} Instagram"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: perfilPublico.instagram,
      onChange: (e) => setPerfilPublico({ ...perfilPublico, instagram: e.target.value }),
      className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "@seuinstagram"
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "\u{1F4DD} Biografia Profissional"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: perfilPublico.bio,
      onChange: (e) => setPerfilPublico({ ...perfilPublico, bio: e.target.value }),
      rows: 3,
      className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "Descreva sua experi\xEAncia e especialidades..."
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "bg-gray-50 p-4 rounded-lg" }, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold text-gray-800 mb-3" }, "\u{1F441}\uFE0F Pr\xE9via do Perfil P\xFAblico"), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-4 rounded-lg border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold text-lg" }, currentUser.avatar)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold text-gray-800" }, currentUser.nome), /* @__PURE__ */ React.createElement("p", { className: "text-gray-600 capitalize" }, "Corretor de Im\xF3veis"))), /* @__PURE__ */ React.createElement("p", { className: "text-gray-700 mb-4" }, perfilPublico.bio), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm" }, "\u{1F4F1} ", perfilPublico.telefone), /* @__PURE__ */ React.createElement("span", { className: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm" }, "\u{1F4E7} Email"), /* @__PURE__ */ React.createElement("span", { className: "bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm" }, "\u{1F4F7} Instagram")))), /* @__PURE__ */ React.createElement("button", { className: "w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors" }, "\u{1F4BE} Salvar Perfil P\xFAblico"))))), perfilTab !== "publico" && /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-800 mb-4" }, "\u{1F504} Integra\xE7\xE3o e Backup"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement("button", { className: "flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F4E4}"), /* @__PURE__ */ React.createElement("div", { className: "text-left" }, /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-gray-800" }, "Exportar Dados"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Baixar backup completo"))), /* @__PURE__ */ React.createElement("button", { className: "flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F517}"), /* @__PURE__ */ React.createElement("div", { className: "text-left" }, /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-gray-800" }, "API Keys"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Gerenciar integra\xE7\xF5es"))), /* @__PURE__ */ React.createElement("button", { className: "flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u2699\uFE0F"), /* @__PURE__ */ React.createElement("div", { className: "text-left" }, /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-gray-800" }, "Configura\xE7\xF5es Avan\xE7adas"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Personalizar sistema"))))));
  const renderPerfilPublico = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-gray-800 mb-2" }, "Perfil P\xFAblico"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-600" }, "Assim seus clientes veem seu perfil e im\xF3veis")), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-3" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigator.clipboard.writeText(`https://${perfilPublico.link}`),
      className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
    },
    "\u{1F4CB} Copiar Link"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => window.open(`https://${perfilPublico.link}`, "_blank"),
      className: "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
    },
    "\u{1F441}\uFE0F Visualizar"
  ))), /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-lg overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-6" }, /* @__PURE__ */ React.createElement("div", { className: "w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold text-2xl" }, currentUser.avatar)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold mb-2" }, currentUser.nome), /* @__PURE__ */ React.createElement("p", { className: "text-xl opacity-90" }, "Corretor de Im\xF3veis Especializado"), /* @__PURE__ */ React.createElement("p", { className: "opacity-75 mt-2" }, perfilPublico.bio))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-8" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white bg-opacity-20 rounded-lg p-4 text-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl mb-2 block" }, "\u{1F4F1}"), /* @__PURE__ */ React.createElement("p", { className: "text-sm opacity-90" }, "WhatsApp"), /* @__PURE__ */ React.createElement("p", { className: "font-semibold" }, perfilPublico.telefone)), /* @__PURE__ */ React.createElement("div", { className: "bg-white bg-opacity-20 rounded-lg p-4 text-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl mb-2 block" }, "\u{1F4E7}"), /* @__PURE__ */ React.createElement("p", { className: "text-sm opacity-90" }, "Email"), /* @__PURE__ */ React.createElement("p", { className: "font-semibold" }, "Contato")), /* @__PURE__ */ React.createElement("div", { className: "bg-white bg-opacity-20 rounded-lg p-4 text-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl mb-2 block" }, "\u{1F4F7}"), /* @__PURE__ */ React.createElement("p", { className: "text-sm opacity-90" }, "Instagram"), /* @__PURE__ */ React.createElement("p", { className: "font-semibold" }, perfilPublico.instagram)), /* @__PURE__ */ React.createElement("div", { className: "bg-white bg-opacity-20 rounded-lg p-4 text-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl mb-2 block" }, "\u{1F3C6}"), /* @__PURE__ */ React.createElement("p", { className: "text-sm opacity-90" }, "Experi\xEAncia"), /* @__PURE__ */ React.createElement("p", { className: "font-semibold" }, "10+ anos")))), /* @__PURE__ */ React.createElement("div", { className: "p-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold text-gray-800" }, "\u{1F3E0} Meus Im\xF3veis Dispon\xEDveis"), /* @__PURE__ */ React.createElement("span", { className: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold" }, imoveis.length, " Im\xF3veis")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" }, imoveis.map((imovel) => /* @__PURE__ */ React.createElement("div", { key: imovel.id, className: "border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow" }, /* @__PURE__ */ React.createElement("div", { className: "h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-4xl" }, "\u{1F3E0}")), /* @__PURE__ */ React.createElement("div", { className: "p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold text-gray-800 mb-2" }, imovel.titulo), /* @__PURE__ */ React.createElement("p", { className: "text-gray-600 mb-3" }, "\u{1F4CD} ", imovel.cidade), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl font-bold text-green-600" }, "R$ ", imovel.preco.toLocaleString("pt-BR")), /* @__PURE__ */ React.createElement("span", { className: "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold" }, imovel.status)), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-2" }, /* @__PURE__ */ React.createElement("button", { className: "flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors" }, "\u{1F4AC} WhatsApp"), /* @__PURE__ */ React.createElement("button", { className: "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors" }, "\u{1F441}\uFE0F Ver Mais"))))), /* @__PURE__ */ React.createElement("div", { className: "border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-gray-400 transition-colors" }, /* @__PURE__ */ React.createElement("span", { className: "text-4xl mb-3" }, "\u2795"), /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-700 mb-2" }, "Adicionar Im\xF3vel"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm mb-4" }, "Expanda sua carteira de im\xF3veis"), /* @__PURE__ */ React.createElement("button", { className: "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors" }, "Adicionar Im\xF3vel")))), /* @__PURE__ */ React.createElement("div", { className: "bg-gray-50 px-8 py-6 border-t border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-gray-600" }, "\xA9 2024 ", currentUser.nome, " - Todos os direitos reservados"), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-4" }, /* @__PURE__ */ React.createElement("button", { className: "text-green-600 hover:text-green-700 font-medium" }, "\u{1F4F1} ", perfilPublico.telefone), /* @__PURE__ */ React.createElement("button", { className: "text-blue-600 hover:text-blue-700 font-medium" }, "\u{1F4E7} Enviar Email")))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "Visualiza\xE7\xF5es"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "1,247")), /* @__PURE__ */ React.createElement("div", { className: "bg-blue-100 text-blue-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F441}\uFE0F")))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "Contatos"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "89")), /* @__PURE__ */ React.createElement("div", { className: "bg-green-100 text-green-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F4DE}")))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "WhatsApp"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "156")), /* @__PURE__ */ React.createElement("div", { className: "bg-green-100 text-green-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F4AC}")))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-600 mb-1" }, "Convers\xF5es"), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-gray-900" }, "12")), /* @__PURE__ */ React.createElement("div", { className: "bg-yellow-100 text-yellow-600 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F3AF}"))))));
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gray-50" }, /* @__PURE__ */ React.createElement("header", { className: "bg-white border-b border-gray-200 px-6 py-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-white font-bold text-sm" }, "SI")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-gray-800" }, "SmartIm\xF3veis"), /* @__PURE__ */ React.createElement("span", { className: "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold" }, activeTab.charAt(0).toUpperCase() + activeTab.slice(1)))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("button", { className: "p-2 text-gray-400 hover:text-gray-600 relative" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, "\u{1F514}"), /* @__PURE__ */ React.createElement("span", { className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" }, "3"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-semibold text-gray-800" }, currentUser.nome), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-600 capitalize" }, currentUser.tipo)), /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-white font-semibold text-sm" }, currentUser.avatar)))))), /* @__PURE__ */ React.createElement("div", { className: "flex" }, /* @__PURE__ */ React.createElement("aside", { className: "w-64 bg-white h-screen border-r border-gray-200 p-6" }, /* @__PURE__ */ React.createElement("nav", { className: "space-y-2" }, [
    { id: "dashboard", nome: "Dashboard", icone: "\u{1F4CA}", ativo: true },
    { id: "imoveis", nome: "Im\xF3veis", icone: "\u{1F3E0}", ativo: false },
    { id: "leads", nome: "Leads", icone: "\u{1F465}", ativo: false },
    { id: "analytics", nome: "Analytics", icone: "\u{1F4C8}", ativo: false },
    { id: "campanhas", nome: "Campanhas", icone: "\u{1F4E2}", ativo: false },
    { id: "configuracoes", nome: "Configura\xE7\xF5es", icone: "\u2699\uFE0F", ativo: false },
    { id: "perfil-publico", nome: "Perfil P\xFAblico", icone: "\u{1F310}", ativo: false }
  ].map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      onClick: () => setActiveTab(item.id),
      className: `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === item.id ? "bg-blue-50 text-blue-700 border-r-4 border-blue-500" : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, item.icone),
    /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, item.nome)
  )))), /* @__PURE__ */ React.createElement("main", { className: "flex-1 p-6" }, renderContent())));
};
var stdin_default = ModernDashboard;
export {
  stdin_default as default
};
