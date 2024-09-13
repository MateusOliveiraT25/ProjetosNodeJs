const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
  nome: { type: String, required: true }
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
