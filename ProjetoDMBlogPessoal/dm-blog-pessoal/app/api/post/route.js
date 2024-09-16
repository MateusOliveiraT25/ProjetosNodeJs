import { getTask, createTask } from "@/controllers/PostController";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const userId = request.user.userId;
        const posts = await getPost(userId);
        return NextResponse.json({
            success:true,
            data:posts
        });
    } catch (error) {
        console.error(error,"Route");
        return NextResponse.json(
            {success:false},
            {status:400}
        );
    }
}


export async function POST(request) {
    try {
        const data = await request.json();
        const pist = await createPost(data);
        return NextResponse.json({
            success:true,
            data:post
        })
    } catch (error) {
        console.error(error,"Route");
        return NextResponse.json(
            {success:false},
            {status:400}
        );
    }
   
}
