"use client"; // Adicione esta linha

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/router' se estiver usando a estrutura tradicional

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // Redireciona para a página de login
  }, [router]);

  return null; // Não renderiza nada na página inicial
}
