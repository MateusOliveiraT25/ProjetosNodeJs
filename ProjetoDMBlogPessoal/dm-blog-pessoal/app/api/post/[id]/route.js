import { updatePost , deletePost } from "@/controllers/PostController";
import { NextResponse } from "next/server";

//PUT
export async function PUT(request, { params }) {
    try {
      const data = await request.json();
      const post = await updatePost(params.id, data);
      if (!post) {
        return NextResponse.json({ success: false }, { status: 400 });
      }
      return NextResponse.json({ success: true, data: post });
    } catch (error) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  }
  

//DELETE
export async function DELETE(req, { params }) {
    try {
      const deletedPost = await deletePost(params.id);
      if (!deletedPost) {
        return NextResponse.json({ success: false }, { status: 400 });
      }
      return NextResponse.json({ success: true, message: "Deletado com Sucesso" });
    } catch (error) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  }
  