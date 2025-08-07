// ============================================
// CONFIGURAÇÃO DO SUPABASE
// ============================================

// 🔧 SUBSTITUA ESTAS VARIÁVEIS PELAS SUAS CREDENCIAIS DO SUPABASE
const SUPABASE_URL = 'https://SEU_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'SUA_ANON_KEY_AQUI';

// Verificar se as credenciais foram configuradas
if (SUPABASE_URL.includes('SEU_PROJECT_ID') || SUPABASE_ANON_KEY.includes('SUA_ANON_KEY')) {
    console.warn('⚠️ ATENÇÃO: Configure suas credenciais do Supabase em supabase-config.js');
}

// Inicializar cliente Supabase
let supabaseClient;
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
// EXPORTAR APIS
// ============================================

// Disponibilizar globalmente
if (typeof window !== 'undefined') {
    window.PropertiesAPI = PropertiesAPI;
    window.LeadsAPI = LeadsAPI;
    window.CorretoresAPI = CorretoresAPI;
    window.PlanosAPI = PlanosAPI;
    window.supabaseClient = supabaseClient;
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