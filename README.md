# 🏗 Arquitetura MVC Implementada

Este projeto segue o padrão **MVC (Model-View-Controller)** para separar responsabilidades e manter o código organizado e escalável.

---

## 📱 MODEL (Modelo)
- **`User.js`**: Gerencia dados de usuários, autenticação e validações.  
- **`Product.js`**: Gerencia dados de produtos, validações e formatação.  
- **`ProductDatabase.js`**: Simula persistência de dados usando `localStorage`.

---

## 🎨 VIEW (Visão)
- **`LoginView.js`**: Interface de login, captura eventos e exibe mensagens.  
- **`ProductView.js`**: Interface de produtos, formulários e listagem.  
- **HTML/CSS**: Interface visual responsiva e moderna.

---

## 🎮 CONTROLLER (Controlador)
- **`AuthController.js`**: Coordena login/logout e comunica com outros controllers.  
- **`ProductController.js`**: Gerencia CRUD de produtos e validações.  
- **`AppController.js`**: Controlador principal que coordena toda a aplicação.

---

## 🔄 Fluxo de Interações MVC
1. **Usuário interage** → View captura evento *(clique, submit)*.  
2. **View notifica** → Controller recebe e processa a requisição.  
3. **Controller consulta** → Model para validar/manipular dados.  
4. **Model retorna** → Dados processados para o Controller.  
5. **Controller atualiza** → View com novos dados ou mensagens.

---

## ✨ Funcionalidades Implementadas

### ✅ Sistema de Login
- Validação de credenciais.  
- Sessão persistente.  
- Usuários de teste:  
  - `admin / 123456`  
  - `user / password`  
  - `demo / demo123`

### ✅ Cadastro de Produtos
- Validação de dados.  
- Persistência local.  
- Interface responsiva.

### ✅ Comunicação entre Controllers
- Eventos customizados.  
- Gerenciamento de estado global.  
- Tratamento de erros.

---

📌 **Observação**: Este projeto é um exemplo didático de arquitetura MVC com JavaScript puro, ideal para estudos e pequenos projetos.
