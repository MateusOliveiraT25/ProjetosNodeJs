// Footer.js
import { useRouter } from 'next/navigation';
import './footer.css'; // Importe o CSS normal

export default function Footer() {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
      };
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Minha Aplicação. Todos os direitos reservados.</p>
        <nav className="footer-nav">
          <a href="/privacy-policy" className="footer-link">Política de Privacidade</a>
          <a href="/terms-of-service" className="footer-link">Termos de Serviço</a>
        </nav>
      </div>
    </footer>
  );
}
