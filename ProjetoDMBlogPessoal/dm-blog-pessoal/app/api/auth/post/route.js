import { getPosts, createPost } from "@/controllers/PostController";
import { NextResponse } from "next/server";

// GET - Obter posts
export async function GET(request) {
  try {
    const userId = request.user?.userId; // Verifique se request.user é definido
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Usuário não autenticado" },
        { status: 401 }
      );
    }
    const posts = await getPosts(userId); // Ajuste o nome da função se necessário
    return NextResponse.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Erro na rota GET:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao obter posts" },
      { status: 500 }
    );
  }
}

// POST - Criar novo post
export async function POST(request) {
  try {
    const data = await request.json();
    const post = await createPost(data); // Corrija o nome da variável para `post`
    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Erro na rota POST:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao criar post" },
      { status: 400 }
    );
  }
}
