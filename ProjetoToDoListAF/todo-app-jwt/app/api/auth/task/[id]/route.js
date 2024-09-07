import { updateTask, deleteTask } from "@/controllers/TaskController";
import { NextResponse } from "next/server";

// Atualizar uma tarefa
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const task = await updateTask(params.id, data);

    if (!task) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao atualizar tarefa" },
      { status: 400 }
    );
  }
}

// Deletar uma tarefa
export async function DELETE(request, { params }) {
  try {
    const deletedTask = await deleteTask(params.id);

    if (!deletedTask.deletedCount) {
      return NextResponse.json(
        { success: false, message: "Tarefa não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tarefa deletada com successo",
    });
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao deletar tarefa" },
      { status: 400 }
    );
  }
}
