import Post from "@/model/Post";
import connectMongo from "@/utils/dbConnect";

// CRUD

export const getPosts = async (userId) => {
  // Ajuste o nome da função se necessário
  await connectMongo();
  return await Post.find({ userId }); // Verifique a condição de busca
};

// controllers/PostController.js

export async function createPost(data) {
  try {
    // Aqui você deve adicionar lógica para criar um post
    // Exemplo usando MongoDB:
    const post = await PostModel.create(data);
    return post;
  } catch (error) {
    console.error("Erro ao criar post no controlador:", error);
    throw error; // Propague o erro para ser tratado na rota
  }
}


export const updatePost = async (id, data) => {
  await connectMongo();
  return await Post.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deletePost = async (id) => {
  await connectMongo();
  return await Post.deleteOne({ _id: id });
};
