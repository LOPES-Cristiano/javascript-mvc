// CONTROLLER - Application (Coordenador principal)
class AppController {
    constructor() {
        this.initializeViews();
        this.initializeControllers();
        this.setupGlobalEventListeners();
        this.initializeApp();
    }

    initializeViews() {
        this.loginView = new LoginView();
        this.productView = new ProductView();
    }

    initializeControllers() {
        this.authController = new AuthController(this.loginView);
        this.productController = new ProductController(this.productView);
    }

    setupGlobalEventListeners() {
        // Escuta eventos globais da aplicação
        window.addEventListener('userLoggedIn', (event) => {
            console.log('Usuário logado:', event.detail.username);
            this.onUserLogin(event.detail);
        });

        window.addEventListener('userLoggedOut', () => {
            console.log('Usuário deslogado');
            this.onUserLogout();
        });

        // Tratamento de erros globais
        window.addEventListener('error', (event) => {
            console.error('Erro na aplicação:', event.error);
            this.handleGlobalError(event.error);
        });
    }

    initializeApp() {
        // Estado inicial da aplicação
        console.log('Aplicação MVC inicializada');
        
        // Verifica se há usuário logado (persistência)
        const savedUser = this.checkSavedSession();
        
        if (savedUser) {
            this.authController.currentUser = savedUser;
            this.loginView.showUserLoggedIn(savedUser.username);
            this.productController.showProducts();
        } else {
            this.authController.showLogin();
        }
    }

    onUserLogin(user) {
        // Salva sessão
        this.saveSession(user);
        
        // Coordena a transição entre views
        setTimeout(() => {
            this.productController.showProducts();
        }, 100);
    }

    onUserLogout() {
        // Remove sessão salva
        this.clearSession();
        
        // Coordena a transição entre views
        this.productController.hideProducts();
    }

    // Gerenciamento de sessão (simulado)
    saveSession(user) {
        const sessionData = {
            username: user.username,
            isAuthenticated: user.isAuthenticated,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('userSession', JSON.stringify(sessionData));
    }

    checkSavedSession() {
        try {
            const sessionData = localStorage.getItem('userSession');
            if (sessionData) {
                const session = JSON.parse(sessionData);
                const loginTime = new Date(session.loginTime);
                const now = new Date();
                
                // Sessão expira em 24 horas
                if (now - loginTime < 24 * 60 * 60 * 1000) {
                    const user = new User(session.username, '');
                    user.isAuthenticated = true;
                    return user;
                }
            }
        } catch (error) {
            console.error('Erro ao verificar sessão salva:', error);
        }
        
        return null;
    }

    clearSession() {
        localStorage.removeItem('userSession');
    }

    handleGlobalError(error) {
        // Log do erro
        console.error('Erro capturado pelo AppController:', error);
        
        // Poderia enviar erro para serviço de monitoramento
        // this.errorReportingService.report(error);
        
        // Mostra mensagem amigável para o usuário
        const message = 'Ocorreu um erro inesperado. Tente novamente.';
        
        // Tenta mostrar a mensagem na view ativa
        if (!this.authController.isAuthenticated()) {
            this.loginView.showMessage(message, 'error');
        } else {
            this.productView.showMessage(message, 'error');
        }
    }

    // Métodos utilitários para outros controllers
    isUserAuthenticated() {
        return this.authController.isAuthenticated();
    }

    getCurrentUser() {
        return this.authController.getCurrentUser();
    }
}