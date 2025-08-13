// VIEW - Login
class LoginView {
    constructor() {
        this.loginSection = document.getElementById('loginSection');
        this.loginForm = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.messageDiv = document.getElementById('loginMessage');
        this.loginBtn = document.getElementById('loginBtn');
        this.logoutBtn = document.getElementById('logoutBtn');
        this.userInfo = document.getElementById('userInfo');
    }

    show() {
        this.loginSection.classList.remove('hidden');
        this.clearForm();
        this.clearMessage();
    }

    hide() {
        this.loginSection.classList.add('hidden');
    }

    getCredentials() {
        return {
            username: this.usernameInput.value.trim(),
            password: this.passwordInput.value
        };
    }

    clearForm() {
        this.loginForm.reset();
    }

    showMessage(message, type = 'error') {
        this.messageDiv.textContent = message;
        this.messageDiv.className = `message ${type}`;
    }

    clearMessage() {
        this.messageDiv.textContent = '';
        this.messageDiv.className = 'message';
    }

    showUserLoggedIn(username) {
        this.loginBtn.classList.add('hidden');
        this.logoutBtn.classList.remove('hidden');
        this.userInfo.classList.remove('hidden');
        this.userInfo.textContent = `Bem-vindo, ${username}!`;
    }

    showUserLoggedOut() {
        this.loginBtn.classList.remove('hidden');
        this.logoutBtn.classList.add('hidden');
        this.userInfo.classList.add('hidden');
        this.userInfo.textContent = '';
    }

    // Adiciona listeners para eventos
    onSubmit(callback) {
        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }

    onLoginClick(callback) {
        this.loginBtn.addEventListener('click', callback);
    }

    onLogoutClick(callback) {
        this.logoutBtn.addEventListener('click', callback);
    }
}