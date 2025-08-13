Arquitetura MVC Implementada:
📱 MODEL (Modelo)
User.js: Gerencia dados de usuários, autenticação e validações
Product.js: Gerencia dados de produtos, validações e formatação
ProductDatabase: Simula persistência de dados usando localStorage
🎨 VIEW (Visão)
LoginView.js: Interface de login, captura eventos e exibe mensagens
ProductView.js: Interface de produtos, formulários e listagem
HTML/CSS: Interface visual responsiva e moderna
🎮 CONTROLLER (Controlador)
AuthController.js: Coordena login/logout e comunica com outros controllers
ProductController.js: Gerencia CRUD de produtos e validações
AppController.js: Controlador principal que coordena toda a aplicação
Fluxo de Interações MVC:
Usuário interage → View captura evento (clique, submit)
View notifica → Controller recebe e processa a requisição
Controller consulta → Model para validar/manipular dados
Model retorna → Dados processados para o Controller
Controller atualiza → View com novos dados ou mensagens
Funcionalidades Implementadas:
✅ Sistema de Login

Validação de credenciais
Sessão persistente
Usuários de teste: admin/123456, user/password, demo/demo123
✅ Cadastro de Produtos

Validação de dados
Persistência local
Interface responsiva
✅ Comunicação entre Controllers

Eventos customizados
Gerenciamento de estado global
Tratamento de erros
