import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListaLivros from "./components/listaLivros";
import NovoLivro from "./components/novoLivro";
import EditarLivro from "./components/editarLivro";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ListaLivros />} />
          <Route path="/novo" element={<NovoLivro />} />
          <Route path="/editar/:id" element={<EditarLivro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
