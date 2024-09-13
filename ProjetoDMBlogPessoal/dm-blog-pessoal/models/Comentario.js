const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComentarioSchema = new Schema({
  conteudo: { type: String, required: true },
  autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
}, { timestamps: true });

ComentarioSchema.methods.publicar = function() {
  // Lógica para publicar o comentário
};

ComentarioSchema.methods.excluir = function() {
  this.remove();
};

module.exports = mongoose.model('Comentario', ComentarioSchema);
