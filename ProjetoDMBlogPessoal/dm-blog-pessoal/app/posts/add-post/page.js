"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPostPage() {
  const [title, setTitle] = useState("");
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
        body: JSON.stringify({ title }),
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título do Post"
          required
        />
        <button type="submit">Adicionar Post</button>
      </form>
    </div>
  );
}
