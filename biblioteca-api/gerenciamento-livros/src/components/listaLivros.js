import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListaLivros() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/livros")
      .then((response) => setLivros(response.data))
      .catch((error) => console.error("Erro ao buscar os livros:", error));
  }, []);

  const deletarLivro = (id) => {
    axios
      .delete(`http://localhost:5000/livros/${id}`)
      .then(() => setLivros(livros.filter((livro) => livro._id !== id)))
      .catch((error) => console.error("Erro ao deletar o livro:", error));
  };

  return (
    <div>
      <h1>Lista de Livros</h1>
      <Link to="/novo" className="add-new">
        Adicionar Novo Livro
      </Link>

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <tr key={livro._id}>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>
                <Link to={`/editar/${livro._id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => deletarLivro(livro._id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaLivros;
