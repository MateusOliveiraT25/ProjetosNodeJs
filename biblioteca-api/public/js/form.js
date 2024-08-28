// Adiciona um listener ao formulário com o ID 'livroForm', que escuta o evento 'submit' (quando o formulário é enviado)
document
  .getElementById("livroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário, que é recarregar a página

    // Obtém o parâmetro 'id' da URL (usado para determinar se é uma atualização ou adição de livro)
    const id = new URLSearchParams(window.location.search).get("id");

    // Captura os valores dos campos do formulário
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const ano = document.getElementById("ano").value;
    const genero = document.getElementById("genero").value;

    // Cria um objeto livro com os dados capturados do formulário
    const livro = { titulo, autor, ano, genero };

    if (id) {
      // Se há um 'id' na URL, isso indica que um livro existente está sendo atualizado

      fetch(`${apiUrl}/${id}`, {
        // Faz uma requisição PUT à API para atualizar o livro com o ID especificado
        method: "PUT", // Método PUT é usado para atualização
        headers: { "Content-Type": "application/json" }, // Define que os dados estão sendo enviados no formato JSON
        body: JSON.stringify(livro), // Converte o objeto 'livro' em uma string JSON para enviar no corpo da requisição
      })
        .then(() => (window.location.href = "index.html")) // Redireciona para a página 'index.html' após a atualização bem-sucedida
        .catch((error) => console.error("Erro ao atualizar livro:", error)); // Lida com erros durante o processo de atualização
    } else {
      // Caso não haja um 'id' na URL, isso indica que um novo livro está sendo adicionado

      fetch(apiUrl, {
        // Faz uma requisição POST à API para adicionar um novo livro
        method: "POST", // Método POST é usado para criação
        headers: { "Content-Type": "application/json" }, // Define que os dados estão sendo enviados no formato JSON
        body: JSON.stringify(livro), // Converte o objeto 'livro' em uma string JSON para enviar no corpo da requisição
      })
        .then(() => (window.location.href = "index.html")) // Redireciona para a página 'index.html' após a adição bem-sucedida
        .catch((error) => console.error("Erro ao adicionar livro:", error)); // Lida com erros durante o processo de adição
    }
  });
