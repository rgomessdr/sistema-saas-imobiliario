// ============================================
// CONFIGURAÇÃO DO SUPABASE
// ============================================

// 🔧 SUBSTITUA ESTAS VARIÁVEIS PELAS SUAS CREDENCIAIS DO SUPABASE
const SUPABASE_URL = 'https://smartinfosys.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5d2NxZGpscmVxYWF3YXNvcXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NjU1NzcsImV4cCI6MjA1MjU0MTU3N30.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8';

// Verificar se as credenciais foram configuradas
const SUPABASE_CONFIGURED = !SUPABASE_URL.includes('SEU_PROJECT_ID') && !SUPABASE_ANON_KEY.includes('SUA_ANON_KEY_AQUI');

if (!SUPABASE_CONFIGURED) {
    console.warn('⚠️ MODO DEMO: Usando dados simulados. Configure suas credenciais do Supabase para usar dados reais.');
}

// Inicializar cliente Supabase
let supabaseClient;

if (SUPABASE_CONFIGURED) {
    try {
        if (typeof supabase !== 'undefined') {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase conectado com sucesso!');
        } else {
            console.error('❌ Biblioteca do Supabase não carregada');
        }
    } catch (error) {
        console.error('❌ Erro ao conectar com Supabase:', error);
    }
} else {
    console.log('📊 Modo demo ativado - usando dados simulados');
    // Criar cliente mock para demonstração
    supabaseClient = {
        from: (table) => ({
            select: () => ({ data: [], error: null }),
            insert: () => ({ data: [], error: null }),
            update: () => ({ data: [], error: null }),
            delete: () => ({ data: [], error: null }),
            eq: () => ({ data: [], error: null }),
            order: () => ({ data: [], error: null })
        })
    };
}

// Função para obter o cliente Supabase
function getSupabaseClient() {
    return supabaseClient;
}

// ============================================
// FUNÇÕES DE BANCO DE DADOS
// ============================================

// 🏠 IMÓVEIS (Properties)
const PropertiesAPI = {
    // Buscar todos os imóveis
    async getAll() {
        try {
            const { data, error } = await supabaseClient
                .from('properties')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Erro ao buscar imóveis:', error);
            return [];
        }
    },

    // Criar novo imóvel
    async create(property) {
        try {
            const { data, error } = await supabaseClient
                .from('properties')
                .insert([property])
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Erro ao criar imóvel:', error);
            throw error;
        }
    },

    // Atualizar imóvel
    async update(id, updates) {
        try {
            const { data, error } = await supabaseClient
                .from('properties')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Erro ao atualizar imóvel:', error);
            throw error;
        }
    },

    // Deletar imóvel
    async delete(id) {
        try {
            const { error } = await supabaseClient
                .from('properties')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Erro ao deletar imóvel:', error);
            throw error;
        }
    }
};

// 👥 LEADS
const LeadsAPI = {
    // Buscar todos os leads
    async getAll() {
        try {
            const { data, error } = await supabaseClient
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Erro ao buscar leads:', error);
            return [];
        }
    },

    // Criar novo lead
    async create(lead) {
        try {
            const { data, error } = await supabaseClient
                .from('leads')
                .insert([lead])
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Erro ao criar lead:', error);
            throw error;
        }
    },

    // Atualizar lead
    async update(id, updates) {
        try {
            const { data, error } = await supabaseClient
                .from('leads')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Erro ao atualizar lead:', error);
            throw error;
        }
    },

    // Deletar lead
    async delete(id) {
        try {
            const { error } = await supabaseClient
                .from('leads')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Erro ao deletar lead:', error);
            throw error;
        }
    }
};

// 🏢 CORRETORES
const CorretoresAPI = {
    // Buscar todos os corretores
    async getAll() {
        try {
            const { data, error } = await supabaseClient
                .from('corretores')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Erro ao buscar corretores:', error);
            return [];
        }
    },

    // Criar novo corretor
    async create(corretor) {
        try {
            const { data, error } = await supabaseClient
                .from('corretores')
                .insert([corretor])
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Erro ao criar corretor:', error);
            throw error;
        }
    },

    // Atualizar corretor
    async update(id, updates) {
        try {
            const { data, error } = await supabaseClient
                .from('corretores')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Erro ao atualizar corretor:', error);
            throw error;
        }
    },

    // Deletar corretor
    async delete(id) {
        try {
            const { error } = await supabaseClient
                .from('corretores')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Erro ao deletar corretor:', error);
            throw error;
        }
    }
};

// 💼 PLANOS
const PlanosAPI = {
    // Buscar todos os planos
    async getAll() {
        try {
            const { data, error } = await supabaseClient
                .from('planos')
                .select('*')
                .order('price', { ascending: true });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Erro ao buscar planos:', error);
            return [];
        }
    },

    // Criar novo plano
    async create(plano) {
        try {
            const { data, error } = await supabaseClient
                .from('planos')
                .insert([plano])
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Erro ao criar plano:', error);
            throw error;
        }
    },

    // Atualizar plano
    async update(id, updates) {
        try {
            const { data, error } = await supabaseClient
                .from('planos')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Erro ao atualizar plano:', error);
            throw error;
        }
    },

    // Deletar plano
    async delete(id) {
        try {
            const { error } = await supabaseClient
                .from('planos')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Erro ao deletar plano:', error);
            throw error;
        }
    }
};

// ============================================
// DADOS MOCK PARA DEMONSTRAÇÃO
// ============================================

const MOCK_DATA = {
    properties: [
        {
            id: 1,
            title: 'Apartamento Luxo - Copacabana',
            description: 'Apartamento de 3 quartos com vista para o mar',
            price: 850000,
            type: 'apartamento',
            bedrooms: 3,
            bathrooms: 2,
            area: 120,
            address: 'Rua Barata Ribeiro, 500 - Copacabana, RJ',
            status: 'disponivel',
            created_at: '2024-01-15T10:00:00Z'
        },
        {
            id: 2,
            title: 'Casa Moderna - Barra da Tijuca',
            description: 'Casa de 4 quartos com piscina e churrasqueira',
            price: 1200000,
            type: 'casa',
            bedrooms: 4,
            bathrooms: 3,
            area: 250,
            address: 'Av. das Américas, 1000 - Barra da Tijuca, RJ',
            status: 'vendido',
            created_at: '2024-01-10T14:30:00Z'
        },
        {
            id: 3,
            title: 'Cobertura Duplex - Ipanema',
            description: 'Cobertura de 5 quartos com terraço privativo',
            price: 2500000,
            type: 'cobertura',
            bedrooms: 5,
            bathrooms: 4,
            area: 350,
            address: 'Rua Visconde de Pirajá, 200 - Ipanema, RJ',
            status: 'disponivel',
            created_at: '2024-01-20T09:15:00Z'
        }
    ],
    leads: [
        {
            id: 1,
            name: 'João Silva',
            email: 'joao.silva@email.com',
            phone: '(21) 99999-1234',
            interest: 'Apartamento em Copacabana',
            budget: 800000,
            status: 'novo',
            created_at: '2024-01-22T11:00:00Z'
        },
        {
            id: 2,
            name: 'Maria Santos',
            email: 'maria.santos@email.com',
            phone: '(21) 98888-5678',
            interest: 'Casa na Barra da Tijuca',
            budget: 1500000,
            status: 'contato',
            created_at: '2024-01-21T16:45:00Z'
        },
        {
            id: 3,
            name: 'Pedro Oliveira',
            email: 'pedro.oliveira@email.com',
            phone: '(21) 97777-9012',
            interest: 'Cobertura em Ipanema',
            budget: 3000000,
            status: 'qualificado',
            created_at: '2024-01-20T13:20:00Z'
        }
    ],
    corretores: [
        {
            id: 1,
            name: 'Ana Costa',
            email: 'ana.costa@smartimoveis.com',
            phone: '(21) 96666-1111',
            creci: 'CRECI 12345-RJ',
            vendas_mes: 5,
            comissao_total: 45000,
            created_at: '2024-01-01T08:00:00Z'
        },
        {
            id: 2,
            name: 'Carlos Mendes',
            email: 'carlos.mendes@smartimoveis.com',
            phone: '(21) 95555-2222',
            creci: 'CRECI 67890-RJ',
            vendas_mes: 3,
            comissao_total: 28000,
            created_at: '2024-01-01T08:00:00Z'
        }
    ]
};

// Modificar APIs para usar dados mock quando necessário
if (!SUPABASE_CONFIGURED) {
    // Override das APIs para usar dados mock
    PropertiesAPI.getAll = async () => MOCK_DATA.properties;
    PropertiesAPI.create = async (property) => {
        const newProperty = { ...property, id: Date.now(), created_at: new Date().toISOString() };
        MOCK_DATA.properties.push(newProperty);
        return newProperty;
    };
    PropertiesAPI.update = async (id, updates) => {
        const index = MOCK_DATA.properties.findIndex(p => p.id == id);
        if (index !== -1) {
            MOCK_DATA.properties[index] = { ...MOCK_DATA.properties[index], ...updates };
            return MOCK_DATA.properties[index];
        }
        throw new Error('Propriedade não encontrada');
    };
    PropertiesAPI.delete = async (id) => {
        const index = MOCK_DATA.properties.findIndex(p => p.id == id);
        if (index !== -1) {
            MOCK_DATA.properties.splice(index, 1);
            return true;
        }
        throw new Error('Propriedade não encontrada');
    };

    LeadsAPI.getAll = async () => MOCK_DATA.leads;
    LeadsAPI.create = async (lead) => {
        const newLead = { ...lead, id: Date.now(), created_at: new Date().toISOString() };
        MOCK_DATA.leads.push(newLead);
        return newLead;
    };
    LeadsAPI.update = async (id, updates) => {
        const index = MOCK_DATA.leads.findIndex(l => l.id == id);
        if (index !== -1) {
            MOCK_DATA.leads[index] = { ...MOCK_DATA.leads[index], ...updates };
            return MOCK_DATA.leads[index];
        }
        throw new Error('Lead não encontrado');
    };
    LeadsAPI.delete = async (id) => {
        const index = MOCK_DATA.leads.findIndex(l => l.id == id);
        if (index !== -1) {
            MOCK_DATA.leads.splice(index, 1);
            return true;
        }
        throw new Error('Lead não encontrado');
    };

    CorretoresAPI.getAll = async () => MOCK_DATA.corretores;
    CorretoresAPI.create = async (corretor) => {
        const newCorretor = { ...corretor, id: Date.now(), created_at: new Date().toISOString() };
        MOCK_DATA.corretores.push(newCorretor);
        return newCorretor;
    };
    CorretoresAPI.update = async (id, updates) => {
        const index = MOCK_DATA.corretores.findIndex(c => c.id == id);
        if (index !== -1) {
            MOCK_DATA.corretores[index] = { ...MOCK_DATA.corretores[index], ...updates };
            return MOCK_DATA.corretores[index];
        }
        throw new Error('Corretor não encontrado');
    };
    CorretoresAPI.delete = async (id) => {
        const index = MOCK_DATA.corretores.findIndex(c => c.id == id);
        if (index !== -1) {
            MOCK_DATA.corretores.splice(index, 1);
            return true;
        }
        throw new Error('Corretor não encontrado');
    };

    PlanosAPI.getAll = async () => [];
    PlanosAPI.create = async () => ({ id: Date.now() });
    PlanosAPI.update = async () => ({ id: 1 });
    PlanosAPI.delete = async () => true;
}

// ============================================
// EXPORTAR APIS
// ============================================

// Disponibilizar globalmente
if (typeof window !== 'undefined') {
    window.PropertiesAPI = PropertiesAPI;
    window.LeadsAPI = LeadsAPI;
    window.CorretoresAPI = CorretoresAPI;
    window.PlanosAPI = PlanosAPI;
    window.supabaseClient = supabaseClient;
    window.MOCK_DATA = MOCK_DATA;
}

// Para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PropertiesAPI,
        LeadsAPI,
        CorretoresAPI,
        PlanosAPI,
        supabaseClient
    };
}