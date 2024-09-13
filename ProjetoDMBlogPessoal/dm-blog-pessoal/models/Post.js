const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
  comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }]
}, { timestamps: true });

PostSchema.methods.publicar = function() {
  // Lógica para publicar o post
};

PostSchema.methods.editar = function(novoConteudo) {
  this.conteudo = novoConteudo;
  this.save();
};

PostSchema.methods.excluir = function() {
  this.remove();
};

module.exports = mongoose.model('Post', PostSchema);
