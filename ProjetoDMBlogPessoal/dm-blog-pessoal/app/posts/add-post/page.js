"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './stylepadd.css'; // Importe o CSS



export default function AddPostPage() {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleAddPost = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // Redireciona para login se o usuário não estiver autenticado
        return;
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          conteudo,
          autor, // Certifique-se de que o valor é o ID correto do autor
          categoria, // Certifique-se de que o valor é o ID correto da categoria
          comentarios: comentarios.split(",").map(comment => comment.trim()), // Transforme a string em um array de IDs
        }),
      });

      const data = await response.json();
      if (data.success) {
        router.push("/posts"); // Redireciona para a lista de posts após adicionar
      } else {
        setError(data.message || "Erro ao adicionar post");
      }
    } catch (error) {
      console.error("Erro ao adicionar post:", error);
      setError("Erro ao adicionar post");
    }
  };

  return (
    <div>
      <h1>Adicionar Novo Post</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleAddPost}>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título do Post"
          required
        />
        <textarea
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          placeholder="Conteúdo do Post"
          required
        />
        <input
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="ID do Autor"
          required
        />
        <input
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="ID da Categoria"
          required
        />
        <input
          type="text"
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
          placeholder="IDs dos Comentários (separados por vírgula)"
        />
        <button type="submit">Adicionar Post</button>
      </form>
    </div>
  );
}
