import React, { useState, useEffect } from "react";
import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP
import { useParams, useNavigate } from "react-router-dom"; // Importa hooks para acessar parâmetros da URL e navegar entre páginas

// Função principal do componente que permite editar um livro existente
function EditarLivro() {
  const { id } = useParams(); // Hook para acessar o parâmetro `id` da URL
  const [titulo, setTitulo] = useState(""); // Estado para armazenar o título do livro
  const [autor, setAutor] = useState(""); // Estado para armazenar o autor do livro
  const [ano, setAno] = useState(""); // Estado para armazenar o ano de publicação do livro
  const [genero, setGenero] = useState(""); // Estado para armazenar o gênero do livro
  const navigate = useNavigate(); // Hook para redirecionar o usuário para outra rota após a edição

  // Hook useEffect para buscar os dados do livro pelo ID quando o componente é montado
  useEffect(() => {
    axios
      .get(`http://localhost:5000/livros/${id}`) // Faz uma requisição GET para a API para obter os dados do livro específico
      .then((response) => {
        // Atualiza os estados com os dados retornados
        setTitulo(response.data.titulo);
        setAutor(response.data.autor);
        setAno(response.data.ano);
        setGenero(response.data.genero);
      })
      .catch((error) => console.error("Erro ao buscar o livro:", error)); // Exibe um erro no console se a requisição falhar
  }, [id]); // O `useEffect` é executado sempre que o ID mudar

  // Função chamada ao submeter o formulário para atualizar os dados do livro
  const atualizarLivro = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

    // Faz uma requisição PUT para a API para atualizar o livro com os novos dados
    axios
      .put(`http://localhost:5000/livros/${id}`, {
        titulo, // Envia o novo título do livro
        autor, // Envia o novo autor do livro
        ano, // Envia o novo ano de publicação do livro
        genero, // Envia o novo gênero do livro
      })
      .then(() => navigate("/")) // Após a atualização, redireciona para a página principal ("/")
      .catch((error) => console.error("Erro ao atualizar livro:", error)); // Exibe um erro no console se a requisição falhar
  };

  // Retorna o JSX do formulário para editar o livro
  return (
    <form onSubmit={atualizarLivro}>
      <h1>Editar Livro</h1>

      {/* Campo de entrada para o título do livro */}
      <input
        type="text"
        value={titulo} // Valor controlado pelo estado `titulo`
        onChange={(e) => setTitulo(e.target.value)} // Atualiza o estado quando o valor muda
        placeholder="Título" // Placeholder que descreve o campo
        required // Torna o campo obrigatório
      />

      {/* Campo de entrada para o autor do livro */}
      <input
        type="text"
        value={autor} // Valor controlado pelo estado `autor`
        onChange={(e) => setAutor(e.target.value)} // Atualiza o estado quando o valor muda
        placeholder="Autor" // Placeholder que descreve o campo
        required // Torna o campo obrigatório
      />

      {/* Campo de entrada para o ano de publicação do livro */}
      <input
        type="number"
        value={ano} // Valor controlado pelo estado `ano`
        onChange={(e) => setAno(e.target.value)} // Atualiza o estado quando o valor muda
        placeholder="Ano de Publicação" // Placeholder que descreve o campo
        required // Torna o campo obrigatório
      />

      {/* Campo de entrada para o gênero do livro */}
      <input
        type="text"
        value={genero} // Valor controlado pelo estado `genero`
        onChange={(e) => setGenero(e.target.value)} // Atualiza o estado quando o valor muda
        placeholder="Gênero" // Placeholder que descreve o campo
        required // Torna o campo obrigatório
      />

      {/* Botão de envio do formulário */}
      <button type="submit">Atualizar</button>
    </form>
  );
}

export default EditarLivro; // Exporta o componente para ser utilizado em outras partes da aplicação
