import React, { useState, useEffect } from "react";
import "bootswatch/dist/cerulean/bootstrap.min.css";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";
function App() {
  const [dataSearch, setDataSearch] = useState("");
  const [searchResults, setSearch] = useState([]);

  //paaginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  const getImages = async () => {
    const imagenesPorPagina = 12;
    const key = "22623571-b41ef00f5bccec2ca02ef5824";
    const url = `https://pixabay.com/api/?key=${key}&q=${dataSearch}&per_page=${imagenesPorPagina}&page=${currentPage}`;

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    setSearch(resultado.hits);

    const totalResults = Math.ceil(resultado.totalHits / imagenesPorPagina);
    setTotalPages(totalResults);

    //volver pagina hacia arriba luego de "siguiente"
    const inicio = document.querySelector(".jumbotron");
    inicio.scrollIntoView({ behavior: "smooth" });
  };

  const paginaAnterior = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const paginaSiguiente = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (dataSearch === "") return;

    getImages();
    // eslint-disable-next-line
  }, [dataSearch, currentPage]);

  return (
    <div className="container p-4">
      <div className="jumbotron m-auto">
        <h1 className="text-center m-3">Buscador de imagenes</h1>

        <Formulario setDataSearch={setDataSearch} />
      </div>
      {searchResults.length > 0 ? (
        <div className="row justify-content-center">
          <ListadoImagenes list={searchResults} />

          <div className="row justify-content-between">
            <button
              type="button"
              className="btn  btn-primary col-6 col-md-2"
              onClick={paginaAnterior}
              disabled={currentPage === 1}
            >
              &laquo; Anterior
            </button>

            <button
              type="button"
              className="btn btn-primary col-6 col-md-2 "
              onClick={paginaSiguiente}
              disabled={currentPage === totalPages}
            >
              Siguiente &raquo;
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
