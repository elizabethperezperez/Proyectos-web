

//const fichas = document.querySelectorAll("[data-ficha]");
const tablero = document.getElementById("tablero");
const tamañoFicha = document.getElementById("tamañoFicha");
const tamañoTablero = document.getElementById("tamañoTablero");
const colores = ["color-rosa", "color-verde", "color-azul", "color-amarillo", "color-rojo", "color-morado"]
const botonInicio = document.getElementById("inicio");

const selectForma = document.getElementById("formaFicha");

let tamañoActual = "pequeña";
let figuraActual = "cuadrado";

botonInicio.addEventListener("click", iniciarJuego);

function iniciarJuego(){
    tamañoActual = tamañoFicha.value || tamañoActual;
    selecTamañoFicha(tamañoActual);
    selecFiguraFicha(figuraActual);
    actualizarTablero();

}

// Manejadores de eventos Drag&Drop
function comienzoArrastre(e) {
    const id = "id"
    e.target.dataset.dragId = id;

    e.dataTransfer.setData("text/plain", id);
    e.target.classList.add("elemento-en-arrastre");
}

function cancelacionArrastre(e) {
    e.target.classList.remove("elemento-en-arrastre");
}

function sobrevolandoDestino(e) {
    e.preventDefault();
}

function soltadoEnDestino(e) {
    //CAMBIAR ESTO LA TRANSFERENCIA
    e.preventDefault();

    const idFichaOrigen = e.dataTransfer.getData("text/plain");
    const fichaOrigen = document.querySelector(`[data-drag-id="${idFichaOrigen}"]`);
    
    let fichaDestino = e.target; // Se define el destino, la ficha donde se suelta

    const padreOrigen = fichaOrigen.parentNode;
    const padreDestino = fichaDestino.parentNode;

    const p = document.createElement("div");
    p.style.display = "none";

    padreOrigen.replaceChild(p, fichaOrigen);

    padreDestino.replaceChild(fichaOrigen, fichaDestino);

    padreOrigen.replaceChild(fichaDestino, p);

    fichaDestino.classList.remove("elemento-en-sobrevuelo");
    fichaOrigen.classList.remove("elemento-en-arrastre");
    delete fichaOrigen.dataset.dragId;
    
    comprobarVictoria();
}


function entradaEnDestino(e) {
    e.preventDefault();
    if (e.target.classList.contains('ficha')){
        e.target.classList.add("elemento-en-sobrevuelo");
    }
}

function salidaDeDestino(e) {
    e.target.classList.remove("elemento-en-sobrevuelo")

}

function asignarEventos(ficha){
    ficha.draggable = true;

    ficha.addEventListener("dragstart", comienzoArrastre);
    ficha.addEventListener("dragend", cancelacionArrastre);

    ficha.addEventListener("dragover", sobrevolandoDestino);
    ficha.addEventListener("drop", soltadoEnDestino);
    ficha.addEventListener("dragenter", entradaEnDestino);
    ficha.addEventListener("dragleave", salidaDeDestino);
}


// MODIFICAR TABLERO 

// Tamaño del tablero

//tamañoTablero.addEventListener("input", actualizarTablero);

function actualizarTablero(){
    const n = parseInt(tamañoTablero.value);
    
    // 1. Crear un elemento temporal para que el CSS le aplique el tamaño.
    const fichaTemporal = document.createElement('div');
    fichaTemporal.classList.add("ficha", tamañoActual, figuraActual); // Asegura que se apliquen las clases 'ficha' y de tamaño
    fichaTemporal.style.visibility = 'hidden'; 
    fichaTemporal.style.position = 'absolute'; // Para que no afecte el layout visible
    document.body.appendChild(fichaTemporal); 
    
    // 2. Obtener el tamaño calculado (ej. "48px" o "3em")
    const tamañoFichaCSS = window.getComputedStyle(fichaTemporal).width;
    
    // 3. Eliminar el elemento temporal.
    fichaTemporal.remove();
    
    // 4. Configurar el Grid con el tamaño obtenido del CSS.
    tablero.style.display = "grid";
    tablero.style.gridTemplateColumns = `repeat(${n}, ${tamañoFichaCSS})`;
    tablero.style.gridTemplateRows = `repeat(${n}, ${tamañoFichaCSS})`;
    
    tablero.style.gap = "1.25em"; 
    
    tablero.innerHTML = "";

    const fichTotales = n * n;
    let colorAleat = coloresAleatorios(n);

    for (let i=0; i<fichTotales; i++){
        const color = colorAleat[i];
        const fichaAñadir = document.createElement("div");
        fichaAñadir.classList.add("ficha", tamañoActual, figuraActual, color);

        fichaAñadir.setAttribute("data-ficha", "");

        asignarEventos(fichaAñadir);
        tablero.appendChild(fichaAñadir);
    }
}

function coloresAleatorios(num){
    const lista = [];
    const coloresSeleccionados = colores.slice(0,num);

    coloresSeleccionados.forEach(color => {
        for (let i = 0; i < num; i++) {
            lista.push(color)
        }
    });
    
    for (let i = lista.length -1; i > 0; i--){
       const j = Math.floor(Math.random() * (i+1));
       [lista[i], lista[j]] = [lista[j], lista[i]]
    }
    return lista

}



// Modificar tamaño ficha 
function selecTamañoFicha(tamaño){
    const todasFichas = tablero.querySelectorAll("[data-ficha]");
    todasFichas.forEach(ficha =>{
        ficha.classList.remove("pequeña", "mediana", "grande");
        ficha.classList.add(tamaño);
    });
}

// Modificar figura ficha
function selecFiguraFicha(figura){
    const todasFichas = tablero.querySelectorAll("[data-ficha]");
    todasFichas.forEach(ficha =>{
        ficha.classList.remove("cuadrado", "circulo", "pentagono");
        ficha.classList.add(figura);
    });
}


function comprobarVictoria() {
    const n = parseInt(tamañoTablero.value);
    const fichas = Array.from(tablero.querySelectorAll("[data-ficha]"));

    // Crear una matriz n x n con los colores actuales
    const matriz = [];
    for (let i = 0; i < n; i++) {
        const fila = fichas.slice(i * n, i * n + n);
        const coloresFila = fila.map(f =>
        Array.from(f.classList).find(c => c.startsWith("color-"))
        );
        matriz.push(coloresFila);
    }

    // --- Comprobamos filas ---
    const filasCorrectas = matriz.every(fila => {
        const color = fila[0];
        return fila.every(c => c === color);
    });

    // --- Comprobamos columnas ---
    const columnasCorrectas = Array.from({ length: n }).every((_, colIdx) => {
        const color = matriz[0][colIdx];
        return matriz.every(fila => fila[colIdx] === color);
    });

    if (filasCorrectas || columnasCorrectas) {
        setTimeout(() => alert("¡Has ganado!"), 100);
    }
}
iniciarJuego();


tamañoFicha.addEventListener("change", () => {
    tamañoActual = tamañoFicha.value;

});

selectForma.addEventListener("change", () => {
    figuraActual = selectForma.value;

});

