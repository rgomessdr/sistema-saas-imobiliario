// Serviços Supabase para SmartImóveis Dashboard
// Funções para interagir com o banco de dados

// ==================== SERVIÇOS DE IMÓVEIS ====================

const ImoveisService = {
  // Listar todos os imóveis
  async listarImoveis(filtros = {}) {
    const client = getSupabaseClient();
    if (!client) return { data: [], error: 'Cliente Supabase não inicializado' };

    let query = client.from('imoveis').select('*');

    // Aplicar filtros
    if (filtros.tipo) query = query.eq('tipo', filtros.tipo);
    if (filtros.finalidade) query = query.eq('finalidade', filtros.finalidade);
    if (filtros.status) query = query.eq('status', filtros.status);
    if (filtros.valorMin) query = query.gte('valor', filtros.valorMin);
    if (filtros.valorMax) query = query.lte('valor', filtros.valorMax);
    if (filtros.corretor_id) query = query.eq('corretor_id', filtros.corretor_id);

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    return { data: data || [], error };
  },

  // Buscar imóvel por ID
  async buscarImovelPorId(id) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client
      .from('imoveis')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  },

  // Criar novo imóvel
  async criarImovel(imovel) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client
      .from('imoveis')
      .insert([imovel])
      .select()
      .single();

    return { data, error };
  },

  // Atualizar imóvel
  async atualizarImovel(id, updates) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client
      .from('imoveis')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Deletar imóvel
  async deletarImovel(id) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client
      .from('imoveis')
      .delete()
      .eq('id', id);

    return { data, error };
  },

  // Incrementar views
  async incrementarViews(id) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client.rpc('increment_views', { imovel_id: id });
    return { data, error };
  },

  // Buscar imóveis em destaque
  async buscarImoveisDestaque(limit = 6) {
    const client = getSupabaseClient();
    if (!client) return { data: [], error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client
      .from('imoveis')
      .select('*')
      .eq('destaque', true)
      .eq('status', 'ativo')
      .order('created_at', { ascending: false })
      .limit(limit);

    return { data: data || [], error };
  }
};

// ==================== SERVIÇOS DE LEADS ====================

const LeadsService = {
  // Listar todos os leads
  async listarLeads(filtros = {}) {
    const client = getSupabaseClient();
    if (!client) return { data: [], error: 'Cliente Supabase não inicializado' };

    let query = client.from('leads').select(`
      *,
      imoveis(titulo, tipo, valor)
    `);

    // Aplicar filtros
    if (filtros.status) query = query.eq('status', filtros.status);
    if (filtros.origem) query = query.eq('origem', filtros.origem);
    if (filtros.corretor_id) query = query.eq('corretor_id', filtros.corretor_id);
    if (filtros.dataInicio) query = query.gte('created_at', filtros.dataInicio);
    if (filtros.dataFim) query = query.lte('created_at', filtros.dataFim);

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    return { data: data || [], error };
  },

  // Buscar lead por ID
  async buscarLeadPorId(id) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client
      .from('leads')
      .select(`
        *,
        imoveis(titulo, tipo, valor, endereco)
      `)
      .eq('id', id)
      .single();

    return { data, error };
  },

  // Criar novo lead
  async criarLead(lead) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client
      .from('leads')
      .insert([lead])
      .select()
      .single();

    // Incrementar contador de leads no imóvel
    if (data && lead.imovel_id) {
      await client.rpc('increment_leads', { imovel_id: lead.imovel_id });
    }

    return { data, error };
  },

  // Atualizar lead
  async atualizarLead(id, updates) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Deletar lead
  async deletarLead(id) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client
      .from('leads')
      .delete()
      .eq('id', id);

    return { data, error };
  },

  // Estatísticas de leads
  async obterEstatisticasLeads(corretor_id = null) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client.rpc('get_leads_stats', { 
      corretor_filter: corretor_id 
    });

    return { data, error };
  }
};

// ==================== SERVIÇOS DE ANALYTICS ====================

const AnalyticsService = {
  // Dashboard principal
  async obterDashboardData(corretor_id = null) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client.rpc('get_dashboard_stats', {
      corretor_filter: corretor_id
    });

    return { data, error };
  },

  // Dados para gráficos
  async obterDadosGraficos(periodo = '30d', corretor_id = null) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client.rpc('get_chart_data', {
      period: periodo,
      corretor_filter: corretor_id
    });

    return { data, error };
  },

  // Performance por canal
  async obterPerformanceCanais(corretor_id = null) {
    const client = getSupabaseClient();
    if (!client) return { data: [], error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client.rpc('get_channel_performance', {
      corretor_filter: corretor_id
    });

    return { data: data || [], error };
  }
};

// ==================== SERVIÇOS DE AUTENTICAÇÃO ====================

const AuthService = {
  // Login
  async login(email, password) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password
    });

    return { data, error };
  },

  // Registro
  async register(email, password, userData) {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    return { data, error };
  },

  // Logout
  async logout() {
    const client = getSupabaseClient();
    if (!client) return { error: 'Cliente Supabase não inicializado' };

    const { error } = await client.auth.signOut();
    return { error };
  },

  // Obter usuário atual
  async getCurrentUser() {
    const client = getSupabaseClient();
    if (!client) return { data: null, error: 'Cliente Supabase não inicializado' };

    const { data: { user }, error } = await client.auth.getUser();
    return { data: user, error };
  },

  // Escutar mudanças de autenticação
  onAuthStateChange(callback) {
    const client = getSupabaseClient();
    if (!client) return null;

    return client.auth.onAuthStateChange(callback);
  }
};

// ==================== EXPORTAÇÕES ====================

// Disponibilizar globalmente
if (typeof window !== 'undefined') {
  window.ImoveisService = ImoveisService;
  window.LeadsService = LeadsService;
  window.AnalyticsService = AnalyticsService;
  window.AuthService = AuthService;
}

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ImoveisService,
    LeadsService,
    AnalyticsService,
    AuthService
  };
}