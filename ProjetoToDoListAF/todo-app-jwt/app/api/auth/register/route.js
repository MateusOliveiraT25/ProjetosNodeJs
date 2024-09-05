import User from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import connectMongo from "@/utils/dbConnect";

export async function POST(request) {
  const { username, password } = await request.json();

  await connectMongo();

  try {
    // Hasheia a senha de forma assíncrona
    const passwordHash = await bcrypt.hash(password, 10);

    // Cria o usuário com a senha hasheada
    const user = new User({
      username,
      password: passwordHash,
    });

    // Salva o usuário no banco de dados
    await user.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error); // Loga o erro para depuração
    return NextResponse.json(
      { success: false, message: "Erro ao criar o usuário" },
      { status: 400 }
    );
  }
}
