// Header.js
import { useRouter } from 'next/navigation';
import './header.css'; // Importe o CSS normal

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header className="header">
      <nav className="nav">
        <a href="/login" className="navLink">Home</a>
        <a href="/registro" className="navLink">Registro</a>
        <a href="/perfil" className="navLink">Perfil do Usuário</a>
        <a href="/login" onClick={handleLogout} className="navLink">Login</a>
      </nav>
    </header>
  );
}
