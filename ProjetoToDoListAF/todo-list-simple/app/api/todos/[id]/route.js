import connectMongo from "@/utils/dbConnect";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await connectMongo();

  try {
    const data = await req.json();
    const todo = await Todo.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return NextResponse.json(
        { success: false, message: "Tarefa não encontrada." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: todo }, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar a tarefa:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao atualizar a tarefa." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await connectMongo();

  try {
    const deletedTodo = await Todo.findByIdAndDelete(params.id);

    if (!deletedTodo) {
      return NextResponse.json(
        { success: false, message: "Tarefa não encontrada." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Tarefa excluída com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir a tarefa:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao excluir a tarefa." },
      { status: 500 }
    );
  }
}
