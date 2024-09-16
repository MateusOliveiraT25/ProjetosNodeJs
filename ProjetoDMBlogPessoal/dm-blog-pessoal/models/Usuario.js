import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

// Hash a senha antes de salvar
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt); // Corrigido para 'senha'
  next();
});

// Método para comparar senhas
UsuarioSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.senha); // Corrigido para 'senha'
};

const Usuario =
  mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);

export default Usuario;
