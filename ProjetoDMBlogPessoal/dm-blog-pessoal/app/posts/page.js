"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login"); // Redireciona para login se o usuário não estiver autenticado
          return;
        }

        const response = await fetch("/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no header da requisição
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data.data || []); // Ajustado para usar o campo `data` da resposta
        } else if (response.status === 401) {
          router.push("/login"); // Redireciona se o token for inválido
        } else {
          setError("Erro ao obter posts");
        }
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
        setError("Erro ao buscar posts");
      }
    };

    fetchPosts();
  }, [router]);

  const deletePost = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setPosts(posts.filter((post) => post._id !== id));
      } else {
        setError("Erro ao deletar post");
      }
    } catch (error) {
      console.error("Erro ao deletar post:", error);
      setError("Erro ao deletar post");
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={() => router.push("posts/add-post")}>
        Adicionar Novo Post
      </button>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            {post.title}
            <button onClick={() => deletePost(post._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
