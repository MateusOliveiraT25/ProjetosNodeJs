"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ titulo: "", conteudo: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data.data || []);
        } else {
          setError("Erro ao obter posts");
        }
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
        setError("Erro ao buscar posts");
      }
    };

    fetchPosts();
  }, []);

  const addPost = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();
      if (data.success) {
        setPosts([...posts, data.data]);
        setNewPost({ titulo: "", conteudo: "" });
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
      <h1>Posts</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost();
        }}
      >
        <input
          type="text"
          value={newPost.titulo}
          onChange={(e) => setNewPost({ ...newPost, titulo: e.target.value })}
          placeholder="Título do Post"
          required
        />
        <textarea
          value={newPost.conteudo}
          onChange={(e) => setNewPost({ ...newPost, conteudo: e.target.value })}
          placeholder="Conteúdo do Post"
          required
        />
        <button type="submit">Adicionar Post</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.titulo}</h2>
            <p>{post.conteudo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
