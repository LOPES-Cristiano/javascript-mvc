// Ponto de entrada da aplicação
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa a aplicação MVC
    const app = new AppController();
    
    // Torna o app disponível globalmente para debug (apenas em desenvolvimento)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.app = app;
        console.log('Aplicação MVC carregada. Use window.app para debug.');
        console.log('Usuários de teste: admin/123456, user/password, demo/demo123');
    }
});

// Configurações globais
const AppConfig = {
    version: '1.0.0',
    environment: 'development',
    features: {
        persistSession: true,
        debugMode: true
    }
};