// CONTROLLER - Product
class ProductController {
    constructor(productView) {
        this.productView = productView;
        this.database = new ProductDatabase();
        this.setupEventListeners();
        this.loadProducts();
    }

    setupEventListeners() {
        this.productView.onSubmit(() => this.handleCreateProduct());
        
        // Escuta eventos de autenticação
        window.addEventListener('userLoggedIn', () => this.showProducts());
        window.addEventListener('userLoggedOut', () => this.hideProducts());
        window.addEventListener('loginRequested', () => this.hideProducts());
    }

    showProducts() {
        this.productView.show();
        this.loadProducts();
    }

    hideProducts() {
        this.productView.hide();
    }

    async handleCreateProduct() {
        const productData = this.productView.getProductData();
        
        // Validação via modelo
        const validation = Product.validate(productData.name, productData.price, productData.category);
        
        if (!validation.isValid) {
            this.productView.showMessage(validation.errors.join(', '), 'error');
            return;
        }

        try {
            // Cria produto via modelo
            const product = new Product(productData.name, productData.price, productData.category);
            
            // Salva no banco de dados
            this.database.save(product);
            
            // Atualiza a view
            this.productView.showMessage('Produto cadastrado com sucesso!', 'success');
            this.productView.clearForm();
            this.productView.showSuccessAnimation();
            
            // Recarrega a lista
            this.loadProducts();
            
        } catch (error) {
            this.productView.showMessage('Erro ao cadastrar produto: ' + error.message, 'error');
        }
    }

    loadProducts() {
        try {
            const products = this.database.getAll().map(productData => {
                // Reconstrói objetos Product com métodos
                const product = new Product(productData.name, productData.price, productData.category);
                product.id = productData.id;
                product.createdAt = new Date(productData.createdAt);
                return product;
            });
            
            this.productView.renderProducts(products);
        } catch (error) {
            this.productView.showMessage('Erro ao carregar produtos: ' + error.message, 'error');
        }
    }

    getProductById(id) {
        return this.database.findById(id);
    }

    deleteProduct(id) {
        try {
            this.database.delete(id);
            this.loadProducts();
            return true;
        } catch (error) {
            this.productView.showMessage('Erro ao excluir produto: ' + error.message, 'error');
            return false;
        }
    }
}