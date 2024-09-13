const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

UsuarioSchema.methods.criarPost = function(titulo, conteudo, categoria, tags) {
  const Post = mongoose.model('Post');
  const novoPost = new Post({
    titulo,
    conteudo,
    autor: this._id,
    categoria,
    tags
  });
  return novoPost.save();
};

UsuarioSchema.methods.editarPost = function(postId, novoConteudo) {
  return Post.findByIdAndUpdate(postId, { conteudo: novoConteudo });
};

UsuarioSchema.methods.excluirPost = function(postId) {
  return Post.findByIdAndDelete(postId);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
