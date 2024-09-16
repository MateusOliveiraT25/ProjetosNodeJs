import Usuario from "@/models/Usuario.js";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { username, password } = await request.json();
  await connectMongo();

  try {
    // Verificar se o usuário existe
    const usuario = await Usuario.findOne({ email: username }); // Ajuste o campo de busca conforme necessário
    if (!usuario || !(await usuario.comparePassword(password))) {
      return NextResponse.json(
        { success: false, message: "Credenciais inválidas" },
        { status: 400 }
      );
    }

    // Criar o token de autorização
    const token = jwt.sign({ usuarioId: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
