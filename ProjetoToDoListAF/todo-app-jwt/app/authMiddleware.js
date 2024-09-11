// Função middleware que intercepta as requisições.
export async function middleware(request) {
  // Obtém o token da requisição a partir do cabeçalho Authorization.
  const token = request.headers.get("Authorization")?.split(" ")[1];

  // Se não houver token, redireciona o usuário para a página de login.
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Tenta verificar e decodificar o token utilizando a chave secreta JWT.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // Extrai o userId do token decodificado

    // Adiciona o usuário decodificado e o userId no objeto da requisição.
    request.user = decoded;
    request.userId = userId; // Se você precisar do userId em outro lugar
  } catch (error) {
    // Se a verificação falhar (token inválido ou expirado), redireciona para a página de login.
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se o token for válido, permite que a requisição continue para a próxima etapa.
  return NextResponse.next();
}
