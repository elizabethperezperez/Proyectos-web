/**********************************************************************/
/*  PROYECTO Mecanografía      */
let intervalos = 0 ;
let totalCorrectas = 0;
let palabraActual = "";
let tiempo_max = 60;
let posicionActual = 0;
let reiniciado ;
let bloc_niv = true;
let stop;
let nivFacil;
let nivIngles;
let nivDificil;
let ocult_niv;
const englishSpanishDictionary = {
    "hello": "hola",
    "goodbye": "adios",
    "thank you": "gracias",
    "please": "por favor",
    "yes": "si",
    "no": "no",
    "water": "agua",
    "food": "comida",
    "house": "casa",
    "car": "coche",
    "dog": "perro",
    "cat": "gato",
    "book": "libro",
    "computer": "computadora",
    "phone": "telefono",
    "friend": "amigo",
    "family": "familia",
    "time": "tiempo",
    "day": "dia",
    "night": "noche",
    "money": "dinero",
    "work": "trabajo",
    "school": "escuela",
    "city": "ciudad",
    "country": "pais",
    "love": "amor",
    "happy": "feliz",
    "sad": "triste",
    "big": "grande",
    "small": "pequeño",
    "hot": "caliente",
    "cold": "frío",
    "new": "nuevo",
    "old": "viejo",
    "good": "bueno",
    "bad": "malo",
    "beautiful": "hermoso",
    "ugly": "feo"
};

let palabras = [];
let palabras_ingles = [
    "casa", "perro", "gato", "mesa", "silla", "libro", "lapiz", "agua", "fuego", "tierra",
    "arbol", "flor", "sol", "luna", "estrella", "cielo", "mar", "rio", "montaña", "playa",
    "coche", "bicicleta", "avion", "barco", "tren", "calle", "ciudad", "pueblo", "campo", "jardin",
    "comida", "bebida", "fruta", "verdura", "carne", "pescado", "pan", "leche", "queso", "huevo",
    "familia", "amigo", "escuela", "trabajo", "juego", "deporte", "musica", "arte", "cine", "teatro","hello",
    "goodbye","thank you","please","yes","no","water","food","house","car","dog","cat","book","computer","phone","friend","family","time","day","night","money",
    "work","school","city","country","love","happy","sad","big","small"
];
let palabras_normal = [
    "casa", "perro", "gato", "mesa", "silla", "libro", "lapiz", "agua", "fuego", "tierra",
    "arbol", "flor", "sol", "luna", "estrella", "cielo", "mar", "rio", "montaña", "playa",
    "coche", "bicicleta", "avion", "barco", "tren", "calle", "ciudad", "pueblo", "campo", "jardin",
    "comida", "bebida", "fruta", "verdura", "carne", "pescado", "pan", "leche", "queso", "huevo",
    "familia", "amigo", "escuela", "trabajo", "juego", "deporte", "musica", "arte", "cine", "teatro"
];
let palabras_dificil = [
    "casa", "perro", "gato", "mesa", "silla", "libro", "lapiz", "agua", "fuego", "tierra",
    "arbol", "flor", "sol", "luna", "estrella", "cielo", "mar", "rio", "montaña", "playa",
    "coche", "bicicleta", "avion", "barco", "tren", "calle", "ciudad", "pueblo", "campo", "jardin",
    "comida", "bebida", "fruta", "verdura", "carne", "pescado", "pan", "leche", "queso", "huevo",
    "familia", "amigo", "escuela", "trabajo", "juego", "deporte", "musica", "arte", "cine", "teatro","hello",
    "goodbye","thank you","please","yes","no","water","food","house","car","dog","cat","book","computer","phone","friend","family","time","day","night","money",
    "work","school","city","country","love","happy","sad","big","small","c4s4", "p3rr0", "g4t0", "m3s4", "s1ll4", "l1br0", "l4p1z", "4gu4", "fu3g0", "t13rr4",
    "4rb0l", "fl0r", "s0l", "lun4", "3str3ll4", "c13l0", "m4r", "r10", "m0nt4ñ4", "pl4y4",
    "c0ch3", "b1c1cl3t4", "4v10n", "b4rc0", "tr3n", "c4ll3", "c1ud4d", "pu3bl0", "c4mp0", "j4rd1n",
    "c0m1d4", "b3b1d4", "frut4", "v3rdur4", "c4rn3", "p3sc4d0", "p4n", "l3ch3", "qu3s0", "hu3v0",
    "f4m1l14", "4m1g0", "3scu3l4", "tr4b4j0", "ju3g0", "d3p0rt3", "mus1c4", "4rt3", "c1n3", "t34tr0",
    "h3ll0", "g00dby3", "th4nky0u", "pl34s3", "y3s", "n0", "w4t3r", "f00d", "h0us3", "c4r",
    "d0g", "c4t", "b00k", "c0mput3r", "ph0n3", "fr13nd", "f4m1ly", "t1m3", "d4y", "n1ght",
    "m0n3y", "w0rk", "sch00l", "c1ty", "c0untry", "l0v3", "h4ppy", "s4d", "b1g", "sm4ll"

];


// Inicializamos los intervalos a 0 
let identificadorIntervalo = 0;
// Establecer el comienzo, el fin y el tiempo que aparecen en el htm
const comienzo = document.getElementById("btnComienzo");
const fin = document.getElementById("btnFin");
const tiempo = document.getElementById("tiempo");
const teclado = document.getElementById("entrada");
const palabraDeMuestra = document.getElementById("palabraDeMuestra");
const palabrasCorrectas = document.getElementById("palabrasCorrectas");
const pausa = document.getElementById("btnPausar");
const facil = document.getElementById("btnNivelFacil");
const ingles = document.getElementById("btnNivelIngles");
const dificil = document.getElementById("btnNivelDificil");
// Gestores de eventos 
comienzo.addEventListener("click", comenzarTemporizador);
fin.addEventListener("click", detenerTemporizador);
teclado.addEventListener("input", verificaPalabra);
pausa.addEventListener("click",pausarReanudarTest);

facil.addEventListener("click",selectNivFacil);
ingles.addEventListener("click",selectNivIngles);
dificil.addEventListener("click",selectNivDificil);

function actualizaTiempo() {
  //  Incrementa en una unidad el contador de tiempo
  let valorTiempo = +tiempo.innerText; // Te convierte una cadena que tiene un número a un entero
  valorTiempo++;
  tiempo.innerText = valorTiempo.toString();
  // tiempo maximo 
  if (valorTiempo >= tiempo_max){
    const mensaje = `En un minuto has obtenido ${totalCorrectas} palabras correctas`;
    document.getElementById("mensageTiempoFinal").textContent = mensaje;
    detenerTemporizador();
    reiniciado = true;

  }
}
// Establece el intervalo 
let contador = 0;
const miIntervalo = setInterval(() => {
  console.log(`Contador: ${contador}`);
  contador++;

  if (contador === 5) {
    // Detiene la ejecución cuando el contador llega a 5
    clearInterval(miIntervalo);
    console.log("¡Intervalo detenido!");
  }
}, 1000);

function comenzarTemporizador() {
  // Activa el Intervalo para que se actualiza el tiempo cada segundo (1000msg)
  // La pulsación continuada de Comenzar podría crear y activar varios intervalos.
  
  stop = false
  if (identificadorIntervalo == 0) {
    tiempo.innerText = 0;
    if (reiniciado === true){
      document.getElementById("mensageTiempoFinal").textContent = "";
      reiniciado = false

    }
    // Crea un intervalo (asignandole un valor entero positivo no nulo) y lo activa
    // El argumento primero de setInterval es el nombre de la función que será invocada cada segundo (método callback)
    identificadorIntervalo = setInterval(actualizaTiempo, 1000);

    console.log("Intervalo activado:", identificadorIntervalo);
    totalCorrectas = 0;
    actualizaAciertos()
    mostrarPalabra();

  }
}
function mostrarPalabra(){ 
    // le decimos que muestre palabras aleatorios de la lista 
    const indice = Math.floor(Math.random() * palabras.length);
    // la palabar actual 
    palabraActual = palabras[indice];
    palabraDeMuestra.textContent = palabraActual;
    teclado.value = "";
    teclado.focus();
    posicionActual = 0;

    if (!(palabraActual in englishSpanishDictionary)){
    console.log("Test blingue");
    resaltarTeclaActual();}
}
function resaltarTeclaActual(){
  // quitar el resaltado anterior
  document.querySelectorAll('.key').forEach(tecla => tecla.classList.remove('tecla-actual'));
  //para evitar errores de posición
  if (posicionActual < palabraActual.length){
    const caracterActual = palabraActual[posicionActual].toLowerCase();
    const tecla = document.querySelector(`.key[data-key="${caracterActual}"]`);
      if (tecla) {
        // se añade el css para la tecla
        tecla.classList.add('tecla-actual');

      }
  }


}
function verificaPalabra(){
  if (stop !== true){

  const textoIngresado = teclado.value;
  const letraIngresada = textoIngresado[posicionActual];

  const letraCorrecta = palabraActual[posicionActual];
  if (palabraActual in englishSpanishDictionary){
    if ( textoIngresado === englishSpanishDictionary[palabraActual]){
      totalCorrectas ++;
      actualizaAciertos();
      mostrarPalabra();
    }
  }
  else {
    if (letraIngresada === letraCorrecta){
      posicionActual++;
      resaltarTeclaActual();
    }
   
    if (palabraActual === textoIngresado){
      totalCorrectas ++;
      actualizaAciertos();
      mostrarPalabra();
    }}}
}
function actualizaAciertos(){

    palabrasCorrectas.textContent = totalCorrectas;

}

function pausarReanudarTest(){
  // si se clica y los intervalos no están a 0, ponlos a 0 
  if (identificadorIntervalo !==0){
    detenerTemporizador();
    pausa.innerText = "Reanudar";
    console.log("Test pausado");
  } else{
    identificadorIntervalo = setInterval(actualizaTiempo, 1000);
    pausa.innerText = "Pausar";
    teclado.focus();
    console.log("Test reanuddo");
  }
  
}
function reiniciar(){
  pausa.addEventListener("click", pausarTest);
  identificadorIntervalo = setInterval(actualizaTiempo, 1000);
}

function detenerTemporizador() {
  //  Detiene el intervalo y actualiza la variable identificadorIntervalo
  //  a cero, para indicar que no hay activo ningun Intervalo
  stop = true;
  clearInterval(identificadorIntervalo);
  console.log("Intervalo desactivado:", identificadorIntervalo);
  console.log(identificadorIntervalo);
  identificadorIntervalo = 0;
}
function selectNivFacil(){
  palabras = palabras_normal;
  bloc_niv = false;
  let tipo = "TEST FACIL"
  mostrar_botones(tipo);
}
function selectNivIngles(){
  palabras = palabras_ingles;
  bloc_niv = false;
  let tipo = "TEST INGLES"
  mostrar_botones(tipo);
}
function selectNivDificil(){
  palabras = palabras_dificil;
  bloc_niv = false;
  let tipo = "TEST DIFICIL"
  mostrar_botones(tipo);
}
function mostrar_botones(tipo){
  const nivelCont = document.querySelector(".nivel");
  if (nivelCont){
    nivelCont.classList.add("oculto");
  }

  const nuevoH = document.getElementById("titcontainer")
  nuevoH.innerHTML += `<h2 class = "titulo">${tipo}</h2>`;
  document.querySelectorAll('.btnComienzo, .btnFin, .btnPausa').forEach(boton => {boton.style.display = 'inline-block';});
   
}
// Descripción - Modal 

const modal = document.getElementById('modalDescripcion');
const btnAbrir = document.getElementById('btnDescripcion');
const btnCerrar = document.getElementById('btnCerrarDescripcion');

// Abrir la descripción
btnAbrir.addEventListener('click', () => {
  modal.style.display='block';
})

// Cerrar el modal 
btnCerrar.addEventListener('click', () => {
  modal.style.display = 'none';
})

