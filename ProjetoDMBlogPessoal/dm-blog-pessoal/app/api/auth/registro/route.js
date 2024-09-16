import Usuario from "@//models/Usuario.js";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  await connectMongo();

  try {
    const usuario = await Usuario.create(data);
    return NextResponse.json({ success: true, data: usuario });
  } catch (error) {
    console.error("Error in POST /api/auth/registro:", error); // Log detalhado
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
