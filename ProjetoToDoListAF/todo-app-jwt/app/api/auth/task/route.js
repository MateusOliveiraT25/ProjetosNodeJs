import { getTasks, createTask } from "@/controllers/TaskController";
import { NextResponse } from "next/server";

// Função para obter todas as tarefas
export async function GET(request) {
  try {
    const userId = request.userId; // Acesse o userId aqui
    const tasks = await getTasksForUser(userId); // Por exemplo, obtenha tarefas para o usuário
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
