// pages/api/posts/[id]/route.js
import { updatePost, deletePost } from "@/controllers/PostController";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const post = await updatePost(params.id, data);

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao atualizar post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletedPost = await deletePost(params.id);

    if (!deletedPost) {
      return NextResponse.json(
        { success: false, message: "Post não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao deletar post" },
      { status: 500 }
    );
  }
}
