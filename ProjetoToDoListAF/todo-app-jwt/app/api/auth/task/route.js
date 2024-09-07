import { getTasks, createTask } from "@/controllers/TaskController";
import { NextResponse } from "next/server";

// GET: obter todas as tarefas
export async function GET() {
  try {
    const tasks = await getTask(); // Corrigido para 'getTasks'
    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    console.error("Erro ao obter tarefas:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao obter tarefas" },
      { status: 400 }
    );
  }
}

// POST: criar uma nova tarefa
export async function POST(request) {
  try {
    const data = await request.json(); // Corrigido para 'request.json()'
    const task = await createTask(data);
    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao criar tarefa" },
      { status: 400 }
    );
  }
}
