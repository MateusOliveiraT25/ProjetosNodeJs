import Post from "@/model/Post";
import connectMongo from "@/utils/dbConnect";


//CRUD
export const getPost = async (userId) => {
    await connectMongo();
    return await Post.find(userId);
}



export const createPost = async (data) => {
    await connectMongo();
    return await Post.create(data);
}


export const updatePost = async (id, data) => {
    await connectMongo();
    return await Post.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    })
}


export const deletePost = async (id) => {
    await connectMongo();
    return await Post.deleteOne({_id:id});
}
