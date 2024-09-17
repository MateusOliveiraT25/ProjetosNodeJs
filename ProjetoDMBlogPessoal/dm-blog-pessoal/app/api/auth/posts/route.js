// app/api/posts/route.js

import { jwtMiddleware } from "@/utils/middleware";
import { getPosts, createPost } from "@/controllers/PostController";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const middlewareResponse = await jwtMiddleware(request);
    if (middlewareResponse) return middlewareResponse;

    const userId = request.user?.userId;
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const posts = await getPosts(userId);
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

export async function POST(request) {
  try {
    const middlewareResponse = await jwtMiddleware(request);
    if (middlewareResponse) return middlewareResponse;

    const data = await request.json();
    const post = await createPost(data);

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
