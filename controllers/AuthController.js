// CONTROLLER - Authentication
class AuthController {
    constructor(loginView) {
        this.loginView = loginView;
        this.currentUser = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.loginView.onSubmit(() => this.handleLogin());
        this.loginView.onLoginClick(() => this.showLogin());
        this.loginView.onLogoutClick(() => this.handleLogout());
    }

    showLogin() {
        this.loginView.show();
        // Notifica outros controllers que o login foi solicitado
        this.notifyLoginRequested();
    }

    async handleLogin() {
        const credentials = this.loginView.getCredentials();
        
        // Validação via modelo
        const validation = User.validateCredentials(credentials.username, credentials.password);
        
        if (!validation.isValid) {
            this.loginView.showMessage(validation.errors.join(', '), 'error');
            return;
        }

        // Simula delay de autenticação
        this.loginView.showMessage('Autenticando...', 'info');
        
        setTimeout(() => {
            // Tenta autenticar via modelo
            const user = User.authenticate(credentials.username, credentials.password);
            
            if (user) {
                this.currentUser = user;
                this.loginView.showMessage('Login realizado com sucesso!', 'success');
                this.loginView.showUserLoggedIn(user.username);
                
                setTimeout(() => {
                    this.loginView.hide();
                    this.notifyLoginSuccess(user);
                }, 1000);
            } else {
                this.loginView.showMessage('Usuário ou senha inválidos', 'error');
            }
        }, 1000);
    }

    handleLogout() {
        if (this.currentUser) {
            this.currentUser.logout();
            this.currentUser = null;
        }
        
        this.loginView.showUserLoggedOut();
        this.loginView.show();
        this.notifyLogout();
    }

    isAuthenticated() {
        return this.currentUser && this.currentUser.isAuthenticated;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    // Métodos para comunicação com outros controllers
    notifyLoginSuccess(user) {
        window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: user }));
    }

    notifyLogout() {
        window.dispatchEvent(new CustomEvent('userLoggedOut'));
    }

    notifyLoginRequested() {
        window.dispatchEvent(new CustomEvent('loginRequested'));
    }
}