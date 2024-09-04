import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  // Campo 'title' para armazenar o título da tarefa
  title: {
    type: String, // O tipo de dado é uma string (texto)
    required: true, // Este campo é obrigatório, ou seja, um título deve ser fornecido
  },
  description: {
    type: String, // Campo opcional para uma descrição mais detalhada
  },
  completed: {
    type: String, // O tipo de dado é uma string (texto)
    enum: ["A fazer", "Fazendo", "Concluído"], // Define os valores permitidos
    default: "A fazer", // Valor padrão se nenhum valor for fornecido
  },
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

export default Todo;
