// accedemos a los elemento CANVAS del HTML
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d"); // Establecemos 2d para dibujar
let painting = false;
let erasing = false;

// Accedemos a las herramientas 
// selector decolor
const colorSelect = document.getElementById("colorPicker")
// Selector de tamaño 
const brushSize = document.getElementById("brushSize");
// Cargador de imagen
const imageLoader = document.getElementById("imageLoader");
// boton de borrar
const clearBtn = document.getElementById("clearBtn");
// Boton de guaradar
const saveBtn = document.getElementById("saveBtn");
// Acceder a la goma 
const eraserBtn = document.getElementById("eraserBtn");
// Acceder al pincel
const brushBtn = document.getElementById("brushBtn");

// Eventos del mouse

// Al iniciar el arrastrar con el click derecho del boton
canvas.addEventListener("mousedown", startPosition);
// Al soltar el raton 
canvas.addEventListener("mouseup", endPosition);
// Al arrastar el raton 
canvas.addEventListener("mousemove", draw);

// Función de inicio de posición.
function startPosition(e){
    painting = true; // Inicializamos indicador, flag de dibujo
    // llamamos a la función de dibujo 
    draw(e); 
}

function endPosition(){
    // desactivamos el flag de dibujo
    painting = false;
    // reiniciamos la ruta del contexto
    ctx.beginPath();
}

// función para dibujar

function draw(e){
    // si se ha indicado que dibuje
    if(painting){
        // Establecemos el grosor de la linea
        ctx.lineWidth = brushSize.value;
        //Las puntas de la linea están redondeada
        ctx.lineCap = "round";
        // si está en modo borrado
        borrarDibujo(erasing)
        // dibujar trazo 
        // va dibjando la linea hasta la nueva posición del cursor
        ctx.lineTo(e.clientX -canvas.offsetLeft, e.clientY -canvas.offsetTop);
        // Apliacmos ese trazo con el color y configuración que hemos indicado
        ctx.stroke();
        // Iniciamos la nueva ruta
        ctx.beginPath();
        // Para que el trazo sea una linea continua
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

    } else {
        // Le decimos que no devuelva nada, "espera activa"
        return;
    }
}

function borrarDibujo(erasing){
    if(erasing){
        // usa el color del fondo
        ctx.strokeStyle = "hsl(0, 0%,100%)";
    } else{
        // sino selecciona el color selccionado
        ctx.strokeStyle = colorPicker.value;
    }
}

// Cargador de imágenes

imageLoader.addEventListener("change", function(e) {
    // Objeto que lee el contenido del archivo
    const reader = new FileReader();
    // Función que se ejecuta cuando el archivo se carga
    reader.onload = function (event) {
        const img = new Image(); //Crea una nueva imagen en memoria
        img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height); //Dibuja la imagen en el canvas para que ocupe
            // el espacio disponible
        };
        // Asigna los datos de la imagen cargada como fuente
        img.src = event.target.result;
    };
    // Incio de la lectura del archivo seleccionado con todo ya configurado
    reader.readAsDataURL(e.target.files[0]);
});

//Limpieza del canvas
clearBtn.addEventListener("click", () => {
    // Borra el rectangulo que ocupa el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

});

// Guaradar imagen  PNG
saveBtn.addEventListener("click", ()=>{
    // Para convertir la imagen en formato por ejemplo PNG
    const dataURL = canvas.toDataURL("image/png");
    // Crea un elemento de hipervínculo 
    const link = document.createElement("a");
    // combre del archivo por defecto
    link.download = "mi_dibujo.png";
    // el destino url seleccinado antes 
    link.href = dataURL;
    // simulamos el click del usuario 
    link.click();
});

// Modos de borrado, activando la goma
eraserBtn.addEventListener("click", () => {
    erasing = true; // Activamos el flag de borrado
    setActiveButton(eraserBtn);
});
// Pincer normal, desactivando la goma
brushBtn.addEventListener("click", () => {
    erasing = false; // Desactivamos la goma
    setActiveButton(brushBtn);
});


function setActiveButton(button){
    eraserBtn.classList.remove("active");
    clearBtn.classList.remove("active");

    button.classList.add("active");
}