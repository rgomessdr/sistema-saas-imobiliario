// Dashboard SmartImóveis com integração Supabase
// Este arquivo contém o componente React principal integrado com Supabase

const { useState, useEffect } = React;

// Componente principal do Dashboard
const SmartImoveisDashboard = () => {
  // Estados principais
  const [currentUser, setCurrentUser] = useState({
    nome: "Rodrigo Gomes",
    tipo: "admin",
    avatar: "RG"
  });
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados dos dados
  const [imoveis, setImoveis] = useState([]);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalImoveis: 0,
    imoveisAtivos: 0,
    totalLeads: 0,
    leadsNovos: 0,
    leadsMes: 0,
    vendasMes: 0,
    totalVisualizacoes: 0
  });
  
  // Estados para formulários
  const [showNovoImovel, setShowNovoImovel] = useState(false);
  const [showNovoLead, setShowNovoLead] = useState(false);
  const [editingImovel, setEditingImovel] = useState(null);
  
  // Inicializar Supabase e carregar dados
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        
        // Inicializar Supabase
        const client = initSupabase();
        if (!client) {
          throw new Error('Falha ao inicializar Supabase');
        }
        
        // Carregar dados iniciais
        await Promise.all([
          loadDashboardStats(),
          loadImoveis(),
          loadLeads()
        ]);
        
        setError(null);
      } catch (err) {
        console.error('Erro ao inicializar app:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    initializeApp();
  }, []);
  
  // Função para carregar estatísticas do dashboard
  const loadDashboardStats = async () => {
    try {
      const { data, error } = await AnalyticsService.obterDashboardData();
      if (error) throw error;
      
      if (data) {
        setStats({
          totalImoveis: data.total_imoveis || 0,
          imoveisAtivos: data.imoveis_ativos || 0,
          totalLeads: data.total_leads || 0,
          leadsNovos: data.leads_novos || 0,
          leadsMes: data.leads_mes || 0,
          vendasMes: data.vendas_mes || 0,
          totalVisualizacoes: data.total_visualizacoes || 0
        });
      }
    } catch (err) {
      console.error('Erro ao carregar estatísticas:', err);
    }
  };
  
  // Função para carregar imóveis
  const loadImoveis = async () => {
    try {
      const { data, error } = await ImoveisService.listarImoveis();
      if (error) throw error;
      setImoveis(data || []);
    } catch (err) {
      console.error('Erro ao carregar imóveis:', err);
    }
  };
  
  // Função para carregar leads
  const loadLeads = async () => {
    try {
      const { data, error } = await LeadsService.listarLeads();
      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error('Erro ao carregar leads:', err);
    }
  };
  
  // Função para criar novo imóvel
  const handleCreateImovel = async (imovelData) => {
    try {
      const { data, error } = await ImoveisService.criarImovel(imovelData);
      if (error) throw error;
      
      await loadImoveis();
      await loadDashboardStats();
      setShowNovoImovel(false);
      
      alert('Imóvel criado com sucesso!');
    } catch (err) {
      console.error('Erro ao criar imóvel:', err);
      alert('Erro ao criar imóvel: ' + err.message);
    }
  };
  
  // Função para atualizar imóvel
  const handleUpdateImovel = async (id, updates) => {
    try {
      const { data, error } = await ImoveisService.atualizarImovel(id, updates);
      if (error) throw error;
      
      await loadImoveis();
      await loadDashboardStats();
      setEditingImovel(null);
      
      alert('Imóvel atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar imóvel:', err);
      alert('Erro ao atualizar imóvel: ' + err.message);
    }
  };
  
  // Função para deletar imóvel
  const handleDeleteImovel = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este imóvel?')) return;
    
    try {
      const { error } = await ImoveisService.deletarImovel(id);
      if (error) throw error;
      
      await loadImoveis();
      await loadDashboardStats();
      
      alert('Imóvel deletado com sucesso!');
    } catch (err) {
      console.error('Erro ao deletar imóvel:', err);
      alert('Erro ao deletar imóvel: ' + err.message);
    }
  };
  
  // Função para criar novo lead
  const handleCreateLead = async (leadData) => {
    try {
      const { data, error } = await LeadsService.criarLead(leadData);
      if (error) throw error;
      
      await loadLeads();
      await loadDashboardStats();
      setShowNovoLead(false);
      
      alert('Lead criado com sucesso!');
    } catch (err) {
      console.error('Erro ao criar lead:', err);
      alert('Erro ao criar lead: ' + err.message);
    }
  };
  
  // Função para atualizar status do lead
  const handleUpdateLeadStatus = async (id, status) => {
    try {
      const { error } = await LeadsService.atualizarLead(id, { status });
      if (error) throw error;
      
      await loadLeads();
      await loadDashboardStats();
    } catch (err) {
      console.error('Erro ao atualizar lead:', err);
      alert('Erro ao atualizar lead: ' + err.message);
    }
  };
  
  // Função para formatar valor monetário
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  // Função para formatar data
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  // Componente de Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Componente de Erro
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erro ao carregar</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }
  
  // Render do Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">SmartImóveis</h1>
              <span className="ml-2 text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                ✅ Conectado ao Supabase
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {currentUser.avatar}
                </div>
                <span className="text-sm font-medium text-gray-700">{currentUser.nome}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'imoveis', label: 'Imóveis', icon: '🏠' },
              { id: 'leads', label: 'Leads', icon: '👥' },
              { id: 'analytics', label: 'Analytics', icon: '📈' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Cards de Estatísticas */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="text-2xl">🏠</div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total de Imóveis</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.totalImoveis}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="text-2xl">👥</div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Leads este Mês</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.leadsMes}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="text-2xl">💰</div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Vendas este Mês</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.vendasMes}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="text-2xl">👁️</div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Visualizações</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.totalVisualizacoes}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Imóveis em Destaque */}
            <div className="bg-white shadow rounded-lg mb-8">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Imóveis em Destaque</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {imoveis.filter(imovel => imovel.destaque).slice(0, 3).map(imovel => (
                    <div key={imovel.id} className="border rounded-lg overflow-hidden">
                      {imovel.fotos && imovel.fotos[0] && (
                        <img 
                          src={imovel.fotos[0]} 
                          alt={imovel.titulo}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-2">{imovel.titulo}</h4>
                        <p className="text-sm text-gray-600 mb-2">{imovel.endereco?.bairro}, {imovel.endereco?.cidade}</p>
                        <p className="text-lg font-bold text-blue-600">{formatCurrency(imovel.valor)}</p>
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>👁️ {imovel.visualizacoes}</span>
                          <span>📞 {imovel.leads}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Leads Recentes */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Leads Recentes</h3>
                <div className="space-y-4">
                  {leads.slice(0, 5).map(lead => (
                    <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{lead.nome}</h4>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                        <p className="text-sm text-gray-500">{lead.imoveis?.titulo}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          lead.status === 'novo' ? 'bg-green-100 text-green-800' :
                          lead.status === 'contatado' ? 'bg-blue-100 text-blue-800' :
                          lead.status === 'interessado' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {lead.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{formatDate(lead.created_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Imóveis Tab */}
        {activeTab === 'imoveis' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gerenciar Imóveis</h2>
              <button
                onClick={() => setShowNovoImovel(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                + Novo Imóvel
              </button>
            </div>
            
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imóvel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visualizações</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {imoveis.map(imovel => (
                    <tr key={imovel.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{imovel.titulo}</div>
                          <div className="text-sm text-gray-500">{imovel.endereco?.bairro}, {imovel.endereco?.cidade}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {imovel.tipo} - {imovel.finalidade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(imovel.valor)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          imovel.status === 'ativo' ? 'bg-green-100 text-green-800' :
                          imovel.status === 'vendido' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {imovel.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {imovel.visualizacoes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setEditingImovel(imovel)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteImovel(imovel.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gerenciar Leads</h2>
              <button
                onClick={() => setShowNovoLead(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                + Novo Lead
              </button>
            </div>
            
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imóvel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origem</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map(lead => (
                    <tr key={lead.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lead.nome}</div>
                          <div className="text-sm text-gray-500">{lead.email}</div>
                          <div className="text-sm text-gray-500">{lead.telefone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.imoveis?.titulo || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.origem}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                          className="text-xs border rounded px-2 py-1"
                        >
                          <option value="novo">Novo</option>
                          <option value="contatado">Contatado</option>
                          <option value="interessado">Interessado</option>
                          <option value="nao_interessado">Não Interessado</option>
                          <option value="convertido">Convertido</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resumo de Performance */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Geral</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Taxa de Conversão</span>
                    <span className="text-sm font-medium">
                      {stats.totalLeads > 0 ? ((stats.vendasMes / stats.totalLeads) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Leads por Imóvel</span>
                    <span className="text-sm font-medium">
                      {stats.totalImoveis > 0 ? (stats.totalLeads / stats.totalImoveis).toFixed(1) : 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Visualizações por Lead</span>
                    <span className="text-sm font-medium">
                      {stats.totalLeads > 0 ? (stats.totalVisualizacoes / stats.totalLeads).toFixed(1) : 0}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Status dos Leads */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Status dos Leads</h3>
                <div className="space-y-3">
                  {['novo', 'contatado', 'interessado', 'convertido'].map(status => {
                    const count = leads.filter(lead => lead.status === status).length;
                    const percentage = leads.length > 0 ? (count / leads.length) * 100 : 0;
                    
                    return (
                      <div key={status}>
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{status}</span>
                          <span>{count} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Exportar o componente
window.SmartImoveisDashboard = SmartImoveisDashboard;
window.DashboardSupabase = SmartImoveisDashboard;