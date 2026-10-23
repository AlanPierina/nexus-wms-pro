// Importe o cliente do Supabase via CDN no HTML ou use a instância global
const SUPABASE_URL = 'SUA_URL_DO_SUPABASE_AQUI';
const SUPABASE_ANON_KEY = 'SUA_CHAVE_ANON_PUBLIC_AQUI';

// Inicialização segura do cliente Supabase
let supabaseClient = null;
if (window.supabase && SUPABASE_URL !== 'SUA_URL_DO_SUPABASE_AQUI') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Funções utilitárias de banco de dados
window.dbAPI = {
    async getMateriais() {
        if (!supabaseClient) {
            // Fallback para localStorage se o Supabase não estiver configurado
            return JSON.parse(localStorage.getItem('nexus_materiais') || '[]');
        }
        const { data, error } = await supabaseClient.from('materiais').select('*').order('sku', { ascending: true });
        if (error) { console.error('Erro ao buscar materiais:', error); return []; }
        return data;
    },

    async salvarMaterial(item) {
        if (!supabaseClient) {
            let itens = JSON.parse(localStorage.getItem('nexus_materiais') || '[]');
            itens.push(item);
            localStorage.setItem('nexus_materiais', JSON.stringify(itens));
            return item;
        }
        const { data, error } = await supabaseClient.from('materiais').insert([item]).select();
        if (error) throw error;
        return data[0];
    },

    async registrarRequisicao(req) {
        if (!supabaseClient) {
            let reqs = JSON.parse(localStorage.getItem('nexus_requisicoes') || '[]');
            reqs.unshift(req);
            localStorage.setItem('nexus_requisicoes', JSON.stringify(reqs));
            return req;
        }
        const { data, error } = await supabaseClient.from('requisicoes').insert([req]).select();
        if (error) throw error;
        return data[0];
    }
};