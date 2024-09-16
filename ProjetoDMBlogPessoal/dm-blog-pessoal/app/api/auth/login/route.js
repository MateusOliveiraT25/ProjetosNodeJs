import Usuario from "@/model/Usuario";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
    const {usuarioname, password} = await request.json();
    await connectMongo();

    //verificar se o usuario existe
    try {
        const usuario = await Usuario.findOne({username});
        if (!usuario && !(await usuario.comparePassword(password))) {
            return NextResponse.json({sucess:false}, {status:400})
        }

        //Criar Minha Token de Autorização
        const token = jwt.sign({usuarioId: usuario._id},
            process.env.JWT_SECRET, {expiresIn: '1h'});
            return NextResponse.json({token});
    } catch (error) {
        return NextResponse.json({succes:false}, {status:400})
    }
}