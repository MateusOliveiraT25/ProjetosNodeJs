"use client";

import { useState, useEffect } from "react";

// Componente principal da aplicação To-Do List
export default function Home() {
  // Estados para gerenciar tarefas, nova tarefa, e a edição de tarefas
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null); // Armazena o ID da tarefa que está sendo editada
  const [editingTitle, setEditingTitle] = useState(""); // Armazena o novo título da tarefa que está sendo editada

  // Hook useEffect para carregar as tarefas quando o componente for montado
  useEffect(() => {
    fetchTodos(); // Função que busca as tarefas do backend
  }, []);

  // Função assíncrona que faz uma requisição para buscar as tarefas no backend
  const fetchTodos = async () => {
    const response = await fetch("/api/todos"); // Faz uma requisição para o endpoint /api/todos
    const data = await response.json(); // Converte a resposta para JSON
    setTodos(data.data); // Atualiza o estado com a lista de tarefas recebida
  };

  // Função assíncrona para adicionar uma nova tarefa
  const addTodo = async () => {
    if (newTodo.trim() === "") {
      // Não faz nada se o título estiver vazio
      alert("O título da tarefa não pode estar vazio.");
      return;
    }

    const response = await fetch("/api/todos", {
      method: "POST", // Define o método HTTP como POST
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify({ title: newTodo, completed: false }), // Envia o título da nova tarefa e define o status como não concluído
    });
    const data = await response.json(); // Converte a resposta para JSON
    setTodos([...todos, data.data]); // Adiciona a nova tarefa à lista de tarefas
    setNewTodo(""); // Limpa o campo de entrada da nova tarefa
  };

  // Função assíncrona para deletar uma tarefa pelo seu ID
  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE", // Define o método HTTP como DELETE
    });
    setTodos(todos.filter((todo) => todo._id !== id)); // Remove a tarefa deletada da lista de tarefas no estado
  };

  // Função assíncrona para alternar o status de conclusão de uma tarefa
  const toggleTodoCompletion = async (id, completed) => {
    await fetch(`/api/todos/${id}`, {
      method: "PUT", // Define o método HTTP como PUT para atualizar a tarefa
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify({ completed: !completed }), // Alterna o status de conclusão da tarefa
    });
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  // Função que prepara a tarefa para edição, preenchendo os campos de edição
  const startEditingTodo = (id, title) => {
    setEditingTodoId(id); // Define o ID da tarefa em edição
    setEditingTitle(title); // Define o título atual da tarefa em edição
  };

  // Função assíncrona para atualizar o título da tarefa
const updateTodo = async (id) => {
  if (editingTitle.trim() === "") {
    // Não faz nada se o título estiver vazio
    alert("O título da tarefa não pode estar vazio.");
    return;
  }

  await fetch(`/api/todos/${id}`, {
    method: "PUT", // Define o método HTTP como PUT para atualizar a tarefa
    headers: {
      "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
    },
    body: JSON.stringify({ title: editingTitle }), // Envia o novo título da tarefa
  });
  setTodos(
    todos.map((todo) =>
      todo._id === id ? { ...todo, title: editingTitle } : todo
    )
  );
  setEditingTodoId(null); // Reseta o estado de edição
  setEditingTitle(""); // Limpa o campo de título em edição
};


  // Função para cancelar a edição e voltar ao estado normal
  const cancelEditTodo = () => {
    setEditingTodoId(null); // Reseta o estado de edição
    setEditingTitle(""); // Limpa o campo de título em edição
  };

  return (
    <div>
      <h1>To-Do List</h1>
      {/* Campo de entrada e botão de adicionar tarefa só são exibidos se não estiver editando uma tarefa */}
      {editingTodoId === null && (
        <>
          <input
            type="text"
            value={newTodo} // Vincula o valor ao estado newTodo
            onChange={(e) => setNewTodo(e.target.value)} // Atualiza o estado conforme o usuário digita
          />
          <button onClick={addTodo}>Adicionar Tarefa</button>
        </>
      )}
      <ul>
        {/* Filtra a lista de tarefas para exibir somente a tarefa em edição, se houver uma */}
        {todos
          .filter(
            (todo) => editingTodoId === null || todo._id === editingTodoId
          )
          .map((todo) => (
            <li key={todo._id}>
              {/* Exibe o campo de edição se a tarefa estiver em modo de edição */}
              {editingTodoId === todo._id ? (
                <>
                  {/* Campo de entrada para editar o título da tarefa */}
                  <input
                    type="text"
                    value={editingTitle} // Vincula o valor ao estado editingTitle
                    onChange={(e) => setEditingTitle(e.target.value)} // Atualiza o título da tarefa em edição
                  />
                  {/* Botão para confirmar a atualização da tarefa */}
                  <button onClick={() => updateTodo(todo._id)}>
                    Atualizar
                  </button>
                  {/* Botão para cancelar a edição */}
                  <button onClick={cancelEditTodo}>Cancelar</button>
                </>
              ) : (
                <>
                  {/* Exibe o título da tarefa e o status de conclusão */}
                  <input
                    type="checkbox"
                    checked={todo.completed} // Marca o checkbox se a tarefa estiver concluída
                    onChange={() =>
                      toggleTodoCompletion(todo._id, todo.completed)
                    } // Alterna o status de conclusão da tarefa
                  />
                  <span>{todo.title}</span>
                  {todo.completed && (
                    <span style={{ color: "green", marginLeft: "10px" }}>
                      [Concluído]
                    </span>
                  )}
                  {/* Botão para iniciar a edição da tarefa */}
                  <button
                    onClick={() => startEditingTodo(todo._id, todo.title)}
                  >
                    Editar
                  </button>
                  {/* Botão para excluir a tarefa */}
                  <button onClick={() => deleteTodo(todo._id)}>Excluir</button>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
