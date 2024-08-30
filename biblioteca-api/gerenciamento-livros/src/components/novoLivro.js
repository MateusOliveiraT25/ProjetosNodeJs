import React, { useState } from "react";
import axios from "axios"; // Importa a biblioteca axios para fazer requisições HTTP
import { useNavigate } from "react-router-dom"; // Hook para navegação programática entre páginas

// Função principal do componente que permite adicionar um novo livro
function NovoLivro() {
  // Estados para armazenar os valores dos campos do formulário
  const [titulo, setTitulo] = useState(""); // `titulo` armazena o valor do campo título
  const [autor, setAutor] = useState(""); // `autor` armazena o valor do campo autor
  const [ano, setAno] = useState(""); // `ano` armazena o valor do campo ano
  const [genero, setGenero] = useState(""); // `genero` armazena o valor do campo gênero
  const navigate = useNavigate(); // Hook que permite redirecionar para outra rota após o envio do formulário

  // Função chamada ao submeter o formulário para adicionar um novo livro
  const adicionarLivro = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

    // Faz uma requisição POST para a API com os dados do novo livro
    axios
      .post("http://localhost:5000/livros", {
        titulo, // Envia o título do livro
        autor, // Envia o autor do livro
        ano, // Envia o ano de publicação do livro
        genero, // Envia o gênero do livro
      })
      .then(() => navigate("/")) // Após a adição, redireciona para a página principal ("/")
      .catch((error) => console.error("Erro ao adicionar livro:", error)); // Exibe um erro no console se a requisição falhar
  };

  // Retorna o JSX do formulário para adicionar um novo livro
  return (
    <form onSubmit={adicionarLivro}>
      <h1>Novo Livro</h1>

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
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default NovoLivro; // Exporta o componente para ser utilizado em outras partes da aplicação
