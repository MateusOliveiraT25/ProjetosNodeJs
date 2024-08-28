import React, { useState, useEffect } from "react";
import axios from "axios";

function LivroList() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [genero, setGenero] = useState("");

  useEffect(() => {
    // Função para buscar livros
    const fetchLivros = async () => {
      try {
        const response = await axios.get("http://localhost:5000/livros");
        setLivros(response.data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };
    fetchLivros();
  }, []);

  // Função para criar livro
  const criarLivro = async () => {
    try {
      const novoLivro = { titulo, autor, ano, genero };
      await axios.post("http://localhost:5000/livros", novoLivro);
      setLivros([...livros, novoLivro]);
      setTitulo("");
      setAutor("");
      setAno("");
      setGenero("");
    } catch (error) {
      console.error("Erro ao criar livro:", error);
    }
  };

  // Função para deletar livro
  const deletarLivro = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/livros/${id}`);
      setLivros(livros.filter((livro) => livro._id !== id));
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
    }
  };

  return (
    <div>
      <h1>Livros</h1>
      <div>
        <h2>Criar Novo Livro</h2>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gênero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        <button onClick={criarLivro}>Criar Livro</button>
      </div>
      <ul>
        {livros.map((livro) => (
          <li key={livro._id}>
            {livro.titulo} - {livro.autor} ({livro.ano}) - {livro.genero}
            <button onClick={() => deletarLivro(livro._id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LivroList;
