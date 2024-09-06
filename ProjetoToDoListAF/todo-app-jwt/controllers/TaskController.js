import Task from "@/models/task"; // Importa o modelo "Task" do banco de dados.
import connectMongo from "@/utils/dbConnect"; // Importa a função de conexão com o MongoDB.

// Função para obter todas as tarefas (Read)
export const getTask = async () => {
  await connectMongo(); // Garante que a conexão com o MongoDB seja estabelecida.
  try {
    return await Task.find(); // Busca todas as tarefas no banco de dados.
  } catch (error) {
    console.error(error); // Exibe qualquer erro que ocorra durante a busca.
  }
};

// Função para criar uma nova tarefa (Create)
export const createTask = async (data) => {
  await connectMongo(); // Garante que a conexão com o MongoDB seja estabelecida.
  try {
    return await Task.create(data); // Cria uma nova tarefa com os dados fornecidos.
  } catch (error) {
    console.error(error); // Exibe qualquer erro que ocorra durante a criação.
  }
};

// Função para atualizar uma tarefa existente (Update)
export const updateTask = async (id, data) => {
  await connectMongo(); // Garante que a conexão com o MongoDB seja estabelecida.
  try {
    return await Task.findByIdAndUpdate(id, data, {
      new: true, // Retorna o documento atualizado.
      runValidators: true, // Executa as validações definidas no esquema do Mongoose.
    });
  } catch (error) {
    console.error(error); // Exibe qualquer erro que ocorra durante a atualização.
  }
};

// Função para deletar uma tarefa existente (Delete)
export const deleteTask = async (id) => {
  await connectMongo(); // Garante que a conexão com o MongoDB seja estabelecida.
  try {
    return await Task.deleteOne({ _id: id }); // Deleta a tarefa com o ID fornecido.
  } catch (error) {
    console.error(error); // Exibe qualquer erro que ocorra durante a exclusão.
  }
};
