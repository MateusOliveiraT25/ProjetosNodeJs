"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './style.css'; // Importe o CSS
import Header from "../components/header"; 
import Footer from "../components/footer";




export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao registrar");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setError("Erro ao registrar");
    }
  };

  return (
    <><div>
      <Header /> {/* Incluindo o Header */}
      <h1>Registrar</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)} />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)} />
      <button onClick={handleRegister}>Registrar</button>
      <p>
        Já tem uma conta? <a href="/login">Faça login</a>
      </p>
    </div><Footer /></>
  );
}
