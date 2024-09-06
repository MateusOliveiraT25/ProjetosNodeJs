import { updateTask, deleteTask } from "@/controllers/TaskController";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const task = await updateTask(params.id, data);
    if (!task) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const deletedTask = await deleteTask(params.id);
    if (!deletedTask) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
