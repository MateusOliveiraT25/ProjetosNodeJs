// URL da API (substitua pela URL correta se necessário)
const apiUrl = "http://localhost:3000/livros";

// Função para buscar os livros na API e renderizar na tabela
function buscarLivros() {
  fetch(apiUrl)
    .then((response) => response.json()) // Converte a resposta para JSON
    .then((livros) => {
      const tabelaCorpo = document.getElementById("livrosCorpo");
      tabelaCorpo.innerHTML = ""; // Limpa a tabela antes de renderizar

      // Itera sobre os livros e cria uma linha para cada um
      livros.forEach((livro) => {
        const linha = document.createElement("tr");

        // Cria as células da linha
        const idCelula = document.createElement("td");
        idCelula.textContent = livro._id; // Ou livro.id_livro dependendo da estrutura

        const tituloCelula = document.createElement("td");
        tituloCelula.textContent = livro.titulo;

        const autorCelula = document.createElement("td");
        autorCelula.textContent = livro.autor;

        const anoCelula = document.createElement("td");
        anoCelula.textContent = livro.ano;

        const generoCelula = document.createElement("td");
        generoCelula.textContent = livro.genero;

        // Adicionar botões de ação na célula
        const acoesCelula = document.createElement("td");

        const updateButton = document.createElement("a");
        updateButton.textContent = "Atualizar";
        updateButton.classList.add("edit");
        updateButton.href = `update.html?id=${livro._id}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Deletar";
        deleteButton.classList.add("delete");
        deleteButton.onclick = () => deletarLivro(livro._id);

        acoesCelula.appendChild(updateButton);
        acoesCelula.appendChild(deleteButton);

        linha.appendChild(idCelula);
        linha.appendChild(tituloCelula);
        linha.appendChild(autorCelula);
        linha.appendChild(anoCelula);
        linha.appendChild(generoCelula);
        linha.appendChild(acoesCelula); // Adiciona a célula de ações na linha

        // Adiciona a linha na tabela
        tabelaCorpo.appendChild(linha);
      });
    })
    .catch((error) => console.error("Erro ao buscar livros:", error)); // Loga um erro em caso de falha
}

// Função para deletar um livro
function deletarLivro(id) {
  if (confirm("Tem certeza de que deseja excluir este livro?")) {
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE", // Método DELETE para exclusão
    })
      .then(() => {
        alert("Livro excluído com sucesso!");
        buscarLivros(); // Recarrega a lista de livros
      })
      .catch((error) => {
        alert("Erro ao excluir o livro: " + error);
      });
  }
}

// Função para preencher o formulário de atualização com os dados do livro
function preencherFormulario() {
  // Obtém o parâmetro 'id' da URL
  const id = new URLSearchParams(window.location.search).get("id");

  if (id) {
    fetch(`${apiUrl}/${id}`)
      .then((response) => response.json())
      .then((livro) => {
        // Preenche os campos do formulário com os dados do livro
        document.getElementById("livroId").value = livro._id; // Preenche o campo oculto com o ID
        document.getElementById("titulo").value = livro.titulo;
        document.getElementById("autor").value = livro.autor;
        document.getElementById("ano").value = livro.ano;
        document.getElementById("genero").value = livro.genero;
      })
      .catch((error) => console.error("Erro ao buscar livro:", error));
  }
}

// Chama a função para buscar e renderizar os livros ao carregar a página
if (window.location.pathname.includes("index.html")) {
  window.onload = buscarLivros;
}

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
        method: "PUT", // Método PUT é usado para atualização
        headers: { "Content-Type": "application/json" }, // Define que os dados estão sendo enviados no formato JSON
        body: JSON.stringify(livro), // Converte o objeto 'livro' em uma string JSON para enviar no corpo da requisição
      })
        .then(() => {
          alert("Livro atualizado com sucesso!");
          window.location.href = "index.html"; // Redireciona para a página 'index.html' após a atualização bem-sucedida
        })
        .catch((error) => {
          alert("Erro ao atualizar o livro: " + error);
        }); // Lida com erros durante o processo de atualização
    } else {
      // Caso não haja um 'id' na URL, isso indica que um novo livro está sendo adicionado
      fetch(apiUrl, {
        method: "POST", // Método POST é usado para criação
        headers: { "Content-Type": "application/json" }, // Define que os dados estão sendo enviados no formato JSON
        body: JSON.stringify(livro), // Converte o objeto 'livro' em uma string JSON para enviar no corpo da requisição
      })
        .then(() => {
          alert("Livro adicionado com sucesso!");
          window.location.href = "index.html"; // Redireciona para a página 'index.html' após a adição bem-sucedida
        })
        .catch((error) => {
          alert("Erro ao adicionar o livro: " + error);
        }); // Lida com erros durante o processo de adição
    }
  });

// Preenche o formulário de atualização com os dados do livro existente
if (window.location.pathname.includes("update.html")) {
  window.onload = preencherFormulario;
}
