// pages/api/posts/route.js
import { jwtMiddleware } from "@/utils/middleware";
import { getPosts, createPost } from "@/controllers/PostController";
import { NextResponse } from "next/server";
import logger from "@/utils/logger"; // Importe o logger

// Aplica o middleware globalmente
export const config = {
  matcher: ["/api/posts/:path*"],
};

// GET - Obter posts
export async function GET(request) {
  try {
    // Adiciona o middleware para autenticação
    const response = await jwtMiddleware(request);
    if (response) return response; // Se houver resposta do middleware (não autorizado), retorne-a

    // Acesso ao userId do middleware
    const userId = request.user?.userId;
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    // Obtenha os posts usando o userId
    const posts = await getPosts(userId);
    return NextResponse.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    logger.error("Erro na rota GET:", {
      message: error.message,
      stack: error.stack,
    }); // Registra o erro
    return NextResponse.json(
      { success: false, message: "Erro ao obter posts" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Adiciona o middleware para autenticação
    const middlewareResponse = await jwtMiddleware(request);
    if (middlewareResponse) return middlewareResponse;

    // Obtenha os dados do corpo da requisição
    const data = await request.json();
    const post = await createPost(data);

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    logger.error("Erro na rota POST:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { success: false, message: "Erro ao criar post" },
      { status: 400 }
    );
  }
}

