// VIEW - Product
class ProductView {
    constructor() {
        this.productsSection = document.getElementById('productsSection');
        this.productForm = document.getElementById('productForm');
        this.nameInput = document.getElementById('productName');
        this.priceInput = document.getElementById('productPrice');
        this.categorySelect = document.getElementById('productCategory');
        this.messageDiv = document.getElementById('productMessage');
        this.productsList = document.getElementById('productsList');
    }

    show() {
        this.productsSection.classList.remove('hidden');
    }

    hide() {
        this.productsSection.classList.add('hidden');
    }

    getProductData() {
        return {
            name: this.nameInput.value.trim(),
            price: this.priceInput.value,
            category: this.categorySelect.value
        };
    }

    clearForm() {
        this.productForm.reset();
    }

    showMessage(message, type = 'error') {
        this.messageDiv.textContent = message;
        this.messageDiv.className = `message ${type}`;
        
        // Remove a mensagem após 3 segundos
        setTimeout(() => {
            this.clearMessage();
        }, 3000);
    }

    clearMessage() {
        this.messageDiv.textContent = '';
        this.messageDiv.className = 'message';
    }

    renderProducts(products) {
        if (products.length === 0) {
            this.productsList.innerHTML = '<p style="text-align: center; color: #718096;">Nenhum produto cadastrado ainda.</p>';
            return;
        }

        this.productsList.innerHTML = products.map(product => `
            <div class="product-card">
                <h4>${this.escapeHtml(product.name)}</h4>
                <div class="price">${product.getFormattedPrice()}</div>
                <div class="category">${this.escapeHtml(product.category)}</div>
                <small style="color: #718096;">Cadastrado em: ${product.getFormattedDate()}</small>
            </div>
        `).join('');
    }

    // Previne XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Adiciona listeners para eventos
    onSubmit(callback) {
        this.productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }

    // Animação de sucesso no formulário
    showSuccessAnimation() {
        this.productForm.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.productForm.style.transform = 'scale(1)';
        }, 150);
    }
}