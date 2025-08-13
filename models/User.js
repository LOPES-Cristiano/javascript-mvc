// MODEL - User
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.isAuthenticated = false;
    }

    // Simula validação de login
    static authenticate(username, password) {
        // Simulação de usuários válidos
        const validUsers = [
            { username: 'admin', password: '123456' },
            { username: 'user', password: 'password' },
            { username: 'demo', password: 'demo123' }
        ];

        const user = validUsers.find(u => 
            u.username === username && u.password === password
        );

        if (user) {
            const authenticatedUser = new User(username, password);
            authenticatedUser.isAuthenticated = true;
            return authenticatedUser;
        }

        return null;
    }

    // Validações do modelo
    static validateCredentials(username, password) {
        const errors = [];

        if (!username || username.trim().length < 3) {
            errors.push('Usuário deve ter pelo menos 3 caracteres');
        }

        if (!password || password.length < 6) {
            errors.push('Senha deve ter pelo menos 6 caracteres');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    logout() {
        this.isAuthenticated = false;
    }
}