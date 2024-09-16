import mongoose from "mongoose";

const PostSchema = new Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
  comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }]
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
export default Post;