// middleware.js
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // Obtém o token do cabeçalho Authorization
  const token = request.headers.get("Authorization")?.split(" ")[1];

  // Se não houver token, redireciona para a página de login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Adiciona o usuário decodificado ao request
    request.user = decoded;
  } catch (error) {
    // Se o token for inválido ou expirado, redireciona para a página de login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continua com a requisição
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/posts/:path*"], // Aplicar middleware apenas para as rotas da API de posts
};
