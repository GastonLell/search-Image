import React, { useState } from "react";
import Error from "./Error";

const Formulario = ({setDataSearch}) => {
  const [termino, setTermino] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (termino.trim() === "") {
      setError(true);
      return;
    }

    setError(false);
    setDataSearch(termino)
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row m-auto">

          <input
            type="text"
            className="form-control form-control-lg mr-0 w-75"
            placeholder="Buscar una imagen"
            onChange={(e) => setTermino(e.target.value)}
            value={termino}
          />
  
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block w-25 p-2"
            value="Buscar"
          />
        </div>
      {error && <Error mensaje="Por favor, ingrese un texto valido" />}
    </form>
  );
};

export default Formulario;
