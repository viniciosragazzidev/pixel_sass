// routes.js

// Rotas públicas que podem ser acessadas por qualquer pessoa
export const publicRoutes = ["/", "/about", "/contact"];

// Rotas protegidas que só podem ser acessadas por usuários autenticados
export const privateRoutes = ["/dashboard", "/profile", "/settings"];

// Rotas de autenticação que só devem ser acessíveis quando o usuário não está logado
export const authRoutes = ["/login", "/register"];

// URL padrão para redirecionamento após login bem-sucedido
export const DEFAULT_REDIRECT_HOME_URL = "/dashboard";

// URL padrão para redirecionamento após logout
export const DEFAULT_REDIRECT_LOGIN_URL = "/login";
