import React, { useState, useEffect } from 'react';

const ModernDashboard = () => {
  const [currentUser, setCurrentUser] = useState({ 
    nome: 'Rodrigo Gomes', 
    tipo: 'admin',
    avatar: 'RG'
  });
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [imoveis, setImoveis] = useState([]);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalImoveis: 100,
    leadsMes: 85,
    conversao: 8.6,
    faturamento: 45000
  });

  const [perfilTab, setPerfilTab] = useState('perfil');
  const [perfilPublico, setPerfilPublico] = useState({
    ativo: true,
    link: 'smartimoveis.com/corretor/rodrigo-gomes',
    bio: 'Corretor especializado em imóveis de luxo no Rio de Janeiro. Mais de 10 anos de experiência no mercado imobiliário.',
    telefone: '(21) 99999-9999',
    email: 'rodrigo@smartimoveis.com',
    instagram: '@rodrigoimoveis',
    whatsapp: '5521999999999'
  });

  // Dados simulados para o gráfico
  const graficoOrigem = [
    { nome: 'WhatsApp', valor: 45, cor: '#25D366' },
    { nome: 'Facebook', valor: 25, cor: '#4267B2' },
    { nome: 'Instagram', valor: 20, cor: '#E4405F' },
    { nome: 'Google', valor: 15, cor: '#4285F4' },
    { nome: 'Direto', valor: 10, cor: '#6B7280' }
  ];

  const graficoDispositivos = [
    { nome: 'Mobile', valor: 65, cor: '#8B5CF6' },
    { nome: 'Desktop', valor: 30, cor: '#06B6D4' },
    { nome: 'Tablet', valor: 5, cor: '#F59E0B' }
  ];

  const leadsMensais = [
    { mes: 'Jan', valor: 45 },
    { mes: 'Fev', valor: 52 },
    { mes: 'Mar', valor: 38 },
    { mes: 'Abr', valor: 61 },
    { mes: 'Mai', valor: 75 },
    { mes: 'Jun', valor: 85 }
  ];

  // Carregar dados iniciais
  useEffect(() => {
    const imoveisSimulados = [
      {
        id: 1,
        titulo: 'Apartamento Luxo Ipanema',
        tipo: 'apartamento',
        preco: 2500000,
        cidade: 'Rio de Janeiro',
        status: 'disponivel',
        leads: 23,
        visualizacoes: 1247
      },
      {
        id: 2,
        titulo: 'Casa Moderna Barra',
        tipo: 'casa',
        preco: 1800000,
        cidade: 'Rio de Janeiro',
        status: 'disponivel',
        leads: 18,
        visualizacoes: 892
      }
    ];
    
    setImoveis(imoveisSimulados);
  }, []);

  const StatCard = ({ titulo, valor, subvalor, icone, cor, crescimento }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{titulo}</p>
          <p className="text-3xl font-bold text-gray-900">{valor}</p>
          {subvalor && (
            <p className="text-sm text-gray-500 mt-1">{subvalor}</p>
          )}
          {crescimento && (
            <div className={`flex items-center mt-2 text-sm ${crescimento > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">{crescimento > 0 ? '↗' : '↘'}</span>
              {Math.abs(crescimento)}% vs mês anterior
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${cor}`}>
          <span className="text-2xl">{icone}</span>
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ label, valor, total, cor = 'bg-blue-500' }) => {
    const porcentagem = (valor / total) * 100;
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-600">{valor}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${cor} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${porcentagem}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const PieChart = ({ dados, titulo }) => {
    const total = dados.reduce((acc, item) => acc + item.valor, 0);
    let startAngle = 0;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{titulo}</h3>
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg width="200" height="200" className="transform -rotate-90">
              {dados.map((item, index) => {
                const percentage = (item.valor / total) * 100;
                const angle = (percentage / 100) * 360;
                const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 100 + 80 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                const y2 = 100 + 80 * Math.sin(((startAngle + angle) * Math.PI) / 180);
                
                const largeArcFlag = angle > 180 ? 1 : 0;
                const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                
                startAngle += angle;
                
                return (
                  <path
                    key={index}
                    d={pathData}
                    fill={item.cor}
                    className="hover:opacity-80 cursor-pointer"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{total}%</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {dados.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.cor }}
                ></div>
                <span className="text-sm text-gray-700">{item.nome}</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{item.valor}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LineChart = ({ dados, titulo }) => {
    const maxValor = Math.max(...dados.map(d => d.valor));
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{titulo}</h3>
        <div className="h-64 flex items-end justify-between">
          {dados.map((item, index) => {
            const altura = (item.valor / maxValor) * 200;
            return (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t w-8 hover:from-blue-600 hover:to-blue-500 transition-colors cursor-pointer"
                  style={{ height: `${altura}px` }}
                  title={`${item.mes}: ${item.valor} leads`}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{item.mes}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'imoveis':
        return renderImoveis();
      case 'leads':
        return renderLeads();
      case 'analytics':
        return renderAnalytics();
      case 'campanhas':
        return renderCampanhas();
      case 'configuracoes':
        return renderConfiguracoes();
      case 'perfil-publico':
        return renderPerfilPublico();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral dos seus negócios imobiliários</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          titulo="Total Imóveis"
          valor={stats.totalImoveis}
          subvalor="Em carteira"
          icone="🏠"
          cor="bg-blue-100 text-blue-600"
          crescimento={12}
        />
        <StatCard
          titulo="Leads/Mês"
          valor={stats.leadsMes}
          subvalor="Novos interessados"
          icone="👥"
          cor="bg-green-100 text-green-600"
          crescimento={8}
        />
        <StatCard
          titulo="Taxa Conversão"
          valor={`${stats.conversao}%`}
          subvalor="Lead → Venda"
          icone="📈"
          cor="bg-purple-100 text-purple-600"
          crescimento={-2}
        />
        <StatCard
          titulo="Faturamento"
          valor={`R$ ${(stats.faturamento / 1000).toFixed(0)}K`}
          subvalor="Mês atual"
          icone="💰"
          cor="bg-yellow-100 text-yellow-600"
          crescimento={15}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <LineChart dados={leadsMensais} titulo="📊 Evolução de Leads" />
        </div>
        <PieChart dados={graficoOrigem} titulo="🎯 Origem do Tráfego" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PieChart dados={graficoDispositivos} titulo="💻 Dispositivos" />
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Performance por Canal</h3>
          <div className="space-y-4">
            <ProgressBar label="WhatsApp" valor={85} total={100} cor="bg-green-500" />
            <ProgressBar label="Facebook Ads" valor={72} total={100} cor="bg-blue-500" />
            <ProgressBar label="Google Ads" valor={58} total={100} cor="bg-yellow-500" />
            <ProgressBar label="Instagram" valor={43} total={100} cor="bg-pink-500" />
            <ProgressBar label="Indicações" valor={91} total={100} cor="bg-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">🏠 Imóveis com Melhor Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imóvel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visualizações
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {imoveis.map((imovel) => (
                <tr key={imovel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{imovel.titulo}</div>
                      <div className="text-sm text-gray-500">{imovel.cidade}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600">
                      R$ {imovel.preco.toLocaleString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{imovel.visualizacoes}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{imovel.leads}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {imovel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Ver</button>
                    <button className="text-indigo-600 hover:text-indigo-900">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderImoveis = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestão de Imóveis</h1>
          <p className="text-gray-600">Gerencie todos os seus imóveis cadastrados</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
          + Novo Imóvel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total de Imóveis</p>
              <p className="text-3xl font-bold text-gray-900">127</p>
            </div>
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <span className="text-2xl">🏠</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Disponíveis</p>
              <p className="text-3xl font-bold text-gray-900">89</p>
            </div>
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Vendidos</p>
              <p className="text-3xl font-bold text-gray-900">38</p>
            </div>
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Lista de Imóveis</h3>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Todos os tipos</option>
                <option>Apartamento</option>
                <option>Casa</option>
                <option>Cobertura</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Todos os status</option>
                <option>Disponível</option>
                <option>Vendido</option>
                <option>Reservado</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imóvel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {imoveis.map((imovel) => (
                <tr key={imovel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{imovel.titulo}</div>
                      <div className="text-sm text-gray-500">{imovel.cidade}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600">
                      R$ {imovel.preco.toLocaleString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {imovel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{imovel.leads}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Ver</button>
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button className="text-red-600 hover:text-red-900">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestão de Leads</h1>
          <p className="text-gray-600">Acompanhe e gerencie todos os seus leads</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
          + Novo Lead
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Novos Leads</p>
              <p className="text-3xl font-bold text-gray-900">23</p>
            </div>
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <span className="text-2xl">🆕</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Em Contato</p>
              <p className="text-3xl font-bold text-gray-900">45</p>
            </div>
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
              <span className="text-2xl">📞</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Qualificados</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
            </div>
            <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Convertidos</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
            </div>
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <span className="text-2xl">🎉</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Funil de Vendas</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-gray-800">Novos Leads</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-blue-600">23</span>
              <p className="text-sm text-gray-600">leads</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-gray-800">Em Contato</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-yellow-600">45</span>
              <p className="text-sm text-gray-600">leads</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="font-medium text-gray-800">Qualificados</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-purple-600">12</span>
              <p className="text-sm text-gray-600">leads</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="font-medium text-gray-800">Convertidos</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-green-600">8</span>
              <p className="text-sm text-gray-600">vendas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics Avançado</h1>
        <p className="text-gray-600">Análises detalhadas do seu negócio</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart dados={leadsMensais} titulo="📈 Tendência de Crescimento" />
        <PieChart dados={graficoOrigem} titulo="🎯 ROI por Canal" />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Relatórios Personalizados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl">📋</span>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Relatório Mensal</p>
              <p className="text-sm text-gray-600">Performance do mês</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl">📈</span>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Análise de ROI</p>
              <p className="text-sm text-gray-600">Retorno dos investimentos</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl">🎯</span>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Funil de Conversão</p>
              <p className="text-sm text-gray-600">Taxa de conversão</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderCampanhas = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Campanhas de Marketing</h1>
          <p className="text-gray-600">Gerencie suas campanhas publicitárias</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
          + Nova Campanha
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Campanhas Ativas</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
            </div>
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Investimento Total</p>
              <p className="text-3xl font-bold text-gray-900">R$ 15.4K</p>
            </div>
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <span className="text-2xl">💸</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">ROAS Médio</p>
              <p className="text-3xl font-bold text-gray-900">4.2x</p>
            </div>
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Campanhas por Plataforma</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📘</span>
              <div>
                <span className="font-medium text-gray-800">Facebook Ads</span>
                <p className="text-sm text-gray-600">5 campanhas ativas</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-blue-600">R$ 6.2K</span>
              <p className="text-sm text-gray-600">investido</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📷</span>
              <div>
                <span className="font-medium text-gray-800">Instagram Ads</span>
                <p className="text-sm text-gray-600">4 campanhas ativas</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-red-600">R$ 4.8K</span>
              <p className="text-sm text-gray-600">investido</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔍</span>
              <div>
                <span className="font-medium text-gray-800">Google Ads</span>
                <p className="text-sm text-gray-600">3 campanhas ativas</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-yellow-600">R$ 4.4K</span>
              <p className="text-sm text-gray-600">investido</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfiguracoes = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Configurações</h1>
        <p className="text-gray-600">Personalize as configurações do sistema</p>
      </div>

      {/* Tabs de Configuração */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setPerfilTab('perfil')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                perfilTab === 'perfil'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              👤 Perfil do Usuário
            </button>
            <button
              onClick={() => setPerfilTab('sistema')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                perfilTab === 'sistema'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🔧 Sistema
            </button>
            <button
              onClick={() => setPerfilTab('publico')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                perfilTab === 'publico'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🌐 Perfil Público
            </button>
          </nav>
        </div>

        <div className="p-6">
          {perfilTab === 'perfil' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Pessoais</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  value={currentUser.nome}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Usuário</label>
                <input 
                  type="text" 
                  value={currentUser.tipo}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Atualizar Perfil
              </button>
            </div>
          )}

          {perfilTab === 'sistema' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Configurações do Sistema</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Notificações por Email</p>
                  <p className="text-sm text-gray-600">Receber notificações de novos leads</p>
                </div>
                <input type="checkbox" className="w-4 h-4 text-blue-600" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Backup Automático</p>
                  <p className="text-sm text-gray-600">Backup diário dos dados</p>
                </div>
                <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Modo Escuro</p>
                  <p className="text-sm text-gray-600">Alternar tema do dashboard</p>
                </div>
                <input type="checkbox" className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          )}

          {perfilTab === 'publico' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Perfil Público do Corretor</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Ativo</span>
                  <input 
                    type="checkbox" 
                    checked={perfilPublico.ativo}
                    onChange={(e) => setPerfilPublico({...perfilPublico, ativo: e.target.checked})}
                    className="w-4 h-4 text-blue-600" 
                  />
                </div>
              </div>

              {perfilPublico.ativo && (
                <div className="space-y-4">
                  {/* Link Público */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">🔗 Seu Link Público</label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        value={perfilPublico.link}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        readOnly
                      />
                      <button 
                        onClick={() => navigator.clipboard.writeText(`https://${perfilPublico.link}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Copiar
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Compartilhe este link para clientes verem seus imóveis</p>
                  </div>

                  {/* Informações de Contato */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">📱 WhatsApp</label>
                      <input 
                        type="text" 
                        value={perfilPublico.whatsapp}
                        onChange={(e) => setPerfilPublico({...perfilPublico, whatsapp: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="5521999999999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">📞 Telefone</label>
                      <input 
                        type="text" 
                        value={perfilPublico.telefone}
                        onChange={(e) => setPerfilPublico({...perfilPublico, telefone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="(21) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">📧 Email</label>
                      <input 
                        type="email" 
                        value={perfilPublico.email}
                        onChange={(e) => setPerfilPublico({...perfilPublico, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="seuemail@exemplo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">📷 Instagram</label>
                      <input 
                        type="text" 
                        value={perfilPublico.instagram}
                        onChange={(e) => setPerfilPublico({...perfilPublico, instagram: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="@seuinstagram"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">📝 Biografia Profissional</label>
                    <textarea 
                      value={perfilPublico.bio}
                      onChange={(e) => setPerfilPublico({...perfilPublico, bio: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Descreva sua experiência e especialidades..."
                    />
                  </div>

                  {/* Prévia do Perfil */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">👁️ Prévia do Perfil Público</h4>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{currentUser.avatar}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{currentUser.nome}</h3>
                          <p className="text-gray-600 capitalize">Corretor de Imóveis</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{perfilPublico.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          📱 {perfilPublico.telefone}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          📧 Email
                        </span>
                        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                          📷 Instagram
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                    💾 Salvar Perfil Público
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Integração e Backup - apenas quando não estiver na aba pública */}
      {perfilTab !== 'publico' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🔄 Integração e Backup</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl">📤</span>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Exportar Dados</p>
                <p className="text-sm text-gray-600">Baixar backup completo</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl">🔗</span>
              <div className="text-left">
                <p className="font-semibold text-gray-800">API Keys</p>
                <p className="text-sm text-gray-600">Gerenciar integrações</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl">⚙️</span>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Configurações Avançadas</p>
                <p className="text-sm text-gray-600">Personalizar sistema</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderPerfilPublico = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Perfil Público</h1>
          <p className="text-gray-600">Assim seus clientes veem seu perfil e imóveis</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => navigator.clipboard.writeText(`https://${perfilPublico.link}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            📋 Copiar Link
          </button>
          <button 
            onClick={() => window.open(`https://${perfilPublico.link}`, '_blank')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            👁️ Visualizar
          </button>
        </div>
      </div>

      {/* Simulação da Página Pública */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-gray-200">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header do Perfil */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">{currentUser.avatar}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{currentUser.nome}</h1>
                <p className="text-xl opacity-90">Corretor de Imóveis Especializado</p>
                <p className="opacity-75 mt-2">{perfilPublico.bio}</p>
              </div>
            </div>
            
            {/* Informações de Contato */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <span className="text-2xl mb-2 block">📱</span>
                <p className="text-sm opacity-90">WhatsApp</p>
                <p className="font-semibold">{perfilPublico.telefone}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <span className="text-2xl mb-2 block">📧</span>
                <p className="text-sm opacity-90">Email</p>
                <p className="font-semibold">Contato</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <span className="text-2xl mb-2 block">📷</span>
                <p className="text-sm opacity-90">Instagram</p>
                <p className="font-semibold">{perfilPublico.instagram}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <span className="text-2xl mb-2 block">🏆</span>
                <p className="text-sm opacity-90">Experiência</p>
                <p className="font-semibold">10+ anos</p>
              </div>
            </div>
          </div>

          {/* Seção de Imóveis */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">🏠 Meus Imóveis Disponíveis</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {imoveis.length} Imóveis
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {imoveis.map((imovel) => (
                <div key={imovel.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Placeholder para imagem */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-4xl">🏠</span>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{imovel.titulo}</h3>
                    <p className="text-gray-600 mb-3">📍 {imovel.cidade}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        R$ {imovel.preco.toLocaleString('pt-BR')}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {imovel.status}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                        💬 WhatsApp
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                        👁️ Ver Mais
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Card para adicionar mais imóveis */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-gray-400 transition-colors">
                <span className="text-4xl mb-3">➕</span>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Adicionar Imóvel</h3>
                <p className="text-gray-500 text-sm mb-4">Expanda sua carteira de imóveis</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Adicionar Imóvel
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                © 2024 {currentUser.nome} - Todos os direitos reservados
              </p>
              <div className="flex space-x-4">
                <button className="text-green-600 hover:text-green-700 font-medium">
                  📱 {perfilPublico.telefone}
                </button>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  📧 Enviar Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas do Perfil */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Visualizações</p>
              <p className="text-3xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <span className="text-2xl">👁️</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Contatos</p>
              <p className="text-3xl font-bold text-gray-900">89</p>
            </div>
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <span className="text-2xl">📞</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">WhatsApp</p>
              <p className="text-3xl font-bold text-gray-900">156</p>
            </div>
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <span className="text-2xl">💬</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Conversões</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
            </div>
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SI</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">SmartImóveis</h1>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <span className="text-xl">🔔</span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{currentUser.nome}</p>
                <p className="text-xs text-gray-600 capitalize">{currentUser.tipo}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{currentUser.avatar}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white h-screen border-r border-gray-200 p-6">
          <nav className="space-y-2">
            {[
              { id: 'dashboard', nome: 'Dashboard', icone: '📊', ativo: true },
              { id: 'imoveis', nome: 'Imóveis', icone: '🏠', ativo: false },
              { id: 'leads', nome: 'Leads', icone: '👥', ativo: false },
              { id: 'analytics', nome: 'Analytics', icone: '📈', ativo: false },
              { id: 'campanhas', nome: 'Campanhas', icone: '📢', ativo: false },
              { id: 'configuracoes', nome: 'Configurações', icone: '⚙️', ativo: false },
              { id: 'perfil-publico', nome: 'Perfil Público', icone: '🌐', ativo: false }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-500' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <span className="text-lg">{item.icone}</span>
                <span className="font-medium">{item.nome}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ModernDashboard;