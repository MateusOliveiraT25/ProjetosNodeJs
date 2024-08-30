import React, { useState, useEffect } from "react";
import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP
import { Link } from "react-router-dom"; // Importa o componente Link para navegação entre páginas

// Função principal do componente que exibe a lista de livros
function ListaLivros() {
  // Estado para armazenar os livros e o valor da pesquisa
  const [livros, setLivros] = useState([]); // `livros` armazena a lista de livros retornada da API
  const [pesquisa, setPesquisa] = useState(""); // `pesquisa` armazena o termo de pesquisa inserido pelo usuário

  // Hook useEffect para buscar os dados dos livros na API quando o componente é montado
  useEffect(() => {
    axios
      .get("http://localhost:5000/livros") // Faz uma requisição GET para a API que retorna a lista de livros
      .then((response) => setLivros(response.data)) // Atualiza o estado com os livros recebidos da API
      .catch((error) => console.error("Erro ao buscar os livros:", error)); // Exibe um erro no console se a requisição falhar
  }, []); // O array vazio faz com que o useEffect rode apenas uma vez quando o componente é montado

  // Função para deletar um livro pelo ID
  const deletarLivro = (id) => {
    axios
      .delete(`http://localhost:5000/livros/${id}`) // Faz uma requisição DELETE para remover o livro pelo ID
      .then(() => setLivros(livros.filter((livro) => livro._id !== id))) // Atualiza a lista de livros removendo o livro deletado
      .catch((error) => console.error("Erro ao deletar o livro:", error)); // Exibe um erro no console se a requisição falhar
  };

  // Filtra os livros de acordo com o termo de pesquisa
  const livrosFiltrados = livros.filter((livro) => {
    const pesquisaLower = pesquisa.toLowerCase(); // Converte o termo de pesquisa para letras minúsculas para uma busca case-insensitive
    return (
      livro.titulo.toLowerCase().includes(pesquisaLower) || // Verifica se o título contém o termo de pesquisa
      livro.autor.toLowerCase().includes(pesquisaLower) || // Verifica se o autor contém o termo de pesquisa
      livro.genero.toLowerCase().includes(pesquisaLower) || // Verifica se o gênero contém o termo de pesquisa
      livro.ano.toString().includes(pesquisaLower) // Verifica se o ano contém o termo de pesquisa
    );
  });

  // Retorna o JSX que será renderizado na interface
  return (
    <div>
      <h1>Lista de Livros</h1>
      {/* Link para a página de adicionar um novo livro */}
      <Link to="/novo" className="add-new">
        Adicionar Novo Livro
      </Link>

      {/* Input para pesquisa */}
      <div className="pesquisa">
        <input
          type="text"
          placeholder="Pesquisar livros" // Placeholder que orienta o usuário sobre os critérios de pesquisa
          value={pesquisa} // O valor do input é controlado pelo estado `pesquisa`
          onChange={(e) => setPesquisa(e.target.value)} // Atualiza o estado quando o valor do input muda
        />
      </div>

      {/* Tabela que exibe a lista de livros */}
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Gênero</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeia os livros filtrados e exibe cada um deles em uma linha da tabela */}
          {livrosFiltrados.map((livro) => (
            <tr key={livro._id}>
              {" "}
              {/* Cada linha é identificada pelo ID do livro */}
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.ano}</td>
              <td>{livro.genero}</td>
              <td>
                {/* Link para a página de edição do livro, passando o ID do livro na URL */}
                <Link to={`/editar/${livro._id}`}>
                  <button>Editar</button>
                </Link>
                {/* Botão para deletar o livro, chamando a função `deletarLivro` */}
                <button onClick={() => deletarLivro(livro._id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaLivros; // Exporta o componente para ser utilizado em outras partes da aplicação
