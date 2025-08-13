// MODEL - Product
class Product {
    constructor(name, price, category) {
        this.id = this.generateId();
        this.name = name;
        this.price = parseFloat(price);
        this.category = category;
        this.createdAt = new Date();
    }

    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }

    // Validações do modelo
    static validate(name, price, category) {
        const errors = [];

        if (!name || name.trim().length < 2) {
            errors.push('Nome do produto deve ter pelo menos 2 caracteres');
        }

        if (!price || isNaN(price) || parseFloat(price) <= 0) {
            errors.push('Preço deve ser um número maior que zero');
        }

        if (!category || category.trim().length === 0) {
            errors.push('Categoria é obrigatória');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Formatação de dados
    getFormattedPrice() {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(this.price);
    }

    getFormattedDate() {
        return this.createdAt.toLocaleDateString('pt-BR');
    }
}

// Simulação de banco de dados
class ProductDatabase {
    constructor() {
        this.products = this.loadProducts();
    }

    loadProducts() {
        const stored = localStorage.getItem('products');
        return stored ? JSON.parse(stored) : [];
    }

    save(product) {
        this.products.push(product);
        this.persist();
        return product;
    }

    getAll() {
        return this.products;
    }

    findById(id) {
        return this.products.find(p => p.id === id);
    }

    delete(id) {
        this.products = this.products.filter(p => p.id !== id);
        this.persist();
    }

    persist() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }
}