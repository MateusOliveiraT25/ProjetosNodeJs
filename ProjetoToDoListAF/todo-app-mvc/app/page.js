"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch todos from the server
  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // Create a new todo
  const createTodo = async () => {
    if (newTodo.trim() === "") {
      alert("O título da tarefa não pode estar vazio.");
      return;
    }

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTodo, completed: "A fazer" }),
      });
      const data = await response.json();
      setTodos([...todos, data.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  // Delete a todo by ID
  const deleteTodo = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  // Update the completion status of a todo
  const updateTodoStatus = async (id, status) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: status }),
      });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: status } : todo
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
    }
  };

  // Start editing a todo
  const startEditingTodo = (id, title) => {
    setEditingTodoId(id);
    setEditingTitle(title);
  };

  // Update the todo title
  const updateTodo = async (id) => {
    if (editingTitle.trim() === "") {
      alert("O título da tarefa não pode estar vazio.");
      return;
    }

    try {
      await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editingTitle }),
      });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, title: editingTitle } : todo
        )
      );
      setEditingTodoId(null);
      setEditingTitle("");
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  // Cancel the editing of a todo
  const cancelEditTodo = () => {
    setEditingTodoId(null);
    setEditingTitle("");
  };

  return (
    <div>
      <h1>To-Do List</h1>
      {editingTodoId === null && (
        <>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Digite uma nova tarefa"
          />
          <button onClick={createTodo}>Adicionar Tarefa</button>
        </>
      )}
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Título</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              <tr key={todo._id}>
                <td>
                  <select
                    value={todo.completed}
                    onChange={(e) => updateTodoStatus(todo._id, e.target.value)}
                  >
                    <option value="A fazer">A fazer</option>
                    <option value="Fazendo">Fazendo</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </td>
                <td>
                  {editingTodoId === todo._id ? (
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                    />
                  ) : (
                    <span>{todo.title}</span>
                  )}
                </td>
                <td>
                  {editingTodoId === todo._id ? (
                    <>
                      <button onClick={() => updateTodo(todo._id)}>
                        Atualizar
                      </button>
                      <button onClick={cancelEditTodo}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditingTodo(todo._id, todo.title)}
                      >
                        Editar
                      </button>
                      <button onClick={() => deleteTodo(todo._id)}>
                        Excluir
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nenhuma tarefa encontrada</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
