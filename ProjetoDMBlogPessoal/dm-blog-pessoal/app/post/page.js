'use client';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { JsonWebTokenError } from 'jsonwebtoken';


export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const router = useRouter();


  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login'); // Redireciona para login se o usuário não estiver autenticado
        return;
      }

      
      const response = await fetch('/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no header da requisição
        },
      });


      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      } else {
        router.push('/login'); // Redireciona para login se houver erro
      }
    };


    fetchPosts();
  }, [router]);


  const addPost = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTask }),
    });


    const data = await response.json();
    setPosts([...posts, data.post]);
    setNewPost('');
  };


  const deletePost = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/posts?id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    setPosts(posts.filter((post) => post._id !== id));
  };


  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewpost(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={addpost}>Adicionar Tarefa</button>
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
