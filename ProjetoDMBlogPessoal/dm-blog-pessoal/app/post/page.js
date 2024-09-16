"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // Redireciona para login se o usuário não estiver autenticado
        return;
      }

      const response = await fetch("/api/post", {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no header da requisição
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data.data || []); // Ajustado para usar o campo `data` da resposta
      } else {
        router.push("/login"); // Redireciona para login se houver erro
      }
    };

    fetchPosts();
  }, [router]);

  const addPost = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newPost }),
    });

    const data = await response.json();
    if (data.success) {
      setPosts([...posts, data.data]); // Ajustado para usar `data.data`
      setNewPost("");
    } else {
      console.error("Erro ao adicionar post");
    }
  };

  const deletePost = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/post?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.success) {
      setPosts(posts.filter((post) => post._id !== id));
    } else {
      console.error("Erro ao deletar post");
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <input
        type="text"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Novo post"
      />
      <button onClick={addPost}>Adicionar Post</button>
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
