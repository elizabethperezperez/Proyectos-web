// script.js

// Ejemplo de la API Drag&Drop con transferencia de datos (dataTransfer)

// Elementos interactivos
const origen = document.querySelector("[draggable='true']");
const destino = document.querySelector("[data-drop]");

// Solo se incluyen los necesarios para la operación: dragstart --> dragover --> drop)
// No se incluyen dragend, dragenter y dragleave
origen.addEventListener("dragstart", comienzoArrastre);
destino.addEventListener("dragover", sobrevolandoDestino);
destino.addEventListener("drop", elementoSoltadoEnDestino);


// Funciones manejadoras de eventos

function comienzoArrastre(e) {
  
  // Transferencia de cadena de texto
  // Formato "text/plain"
  const dato = "Una cadena";
  e.dataTransfer.setData("text/plain", dato);


  // Transferencia de objetos (usando JSON)
  // Formato de transferencia: application/json
  const objeto = {
    mensaje: "Un mensaje",
    codigo: 12345,
  };
  // Conversión del objeto a JSON
  const datoJSON = JSON.stringify(objeto);
  e.dataTransfer.setData("application/json", datoJSON);


}


function sobrevolandoDestino(e) {
  // OJO: Es necesario incluirlo para poder responder al evento drop
  e.preventDefault();
}


function elementoSoltadoEnDestino(e) {
  // OJO: Algunos navegadores responden con una redirección inmediata
  e.preventDefault();


  // Recuperación de la información transferida
  
  const dato = e.dataTransfer.getData("text/plain");
  const objetoJSON = e.dataTransfer.getData("application/json");
  const objeto = JSON.parse(objetoJSON);


  const informacion=  dato + " ---  {" + objeto.mensaje + ", " + objeto.codigo+ "}";
  e.target.textContent = "Transferencia: " + informacion;
}
