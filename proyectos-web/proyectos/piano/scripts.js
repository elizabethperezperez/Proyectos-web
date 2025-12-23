// Mapeo de nota a su frequencia
const nota_freq = {
    "Do4": 261.63,
    "Do#4": 277.18,
    "Re4": 293.66,
    "Re#4": 311.13,
    "Mi4": 329.63,
    "Fa4": 349.23,
    "Fa#4": 369.99,
    "Sol4": 392.00,
    "Sol#4": 415.30,
    "La4": 440.00,
    "La#4": 466.16,
    "Si4": 493.88,
    "Do5": 523.25
};
const tecla_map = {
    '1': 'Do4', 
    '2': 'Re4', 
    '3': 'Mi4', 
    '4': 'Fa4', 
    '5': 'Sol4',
    '6': 'La4',
    '7': 'Si4',
    '8': 'Do5', 
    'q': 'Do#4', 
    'w': 'Re#4', 
    'r': 'Fa#4', 
    't': 'Sol#4',
    'y': 'La#4'
};
// Accedemos a los elemenetos del dom
//accedemos a las teclas
const pianoKeys = document.querySelectorAll('.teclas-blancas, .teclas-negras');
// Controlamos el volumen 
const volumeControl = document.getElementById('volume');
// La froma de la onda
const waveformSelect = document.getElementById('waveform');
// Accedemos a todas las teclas 
const allKeys = document.querySelectorAll('.teclas-blancas, .teclas-negras');
// Modal para la descripción
const btnDescripcion = document.getElementById('btnDescripcion');
// Cerrar botón de descripción
const btnCerrarDescripcion = document.getElementById('btnCerrarDescripcion');
// Modal
const modal = document.getElementById('modalDescripcion');
// Parte de web audio api
// contexto de audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
// Nodo principal para controlar el sonido
const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);
//Variable global para almacenar el oscilador
let activeOscillators = {};

function playNote(frequency, waveform) {
    if(audioContext.state === 'suspended'){
        audioContext.resume();
    }
    // CÓDIGO CORREGIDO:
    const oscillator = audioContext.createOscillator();
    // crear un nodo de ganancia
    const noteGainNode = audioContext.createGain();
    // Configurar ese nodo de ganancia
    noteGainNode.connect(gainNode);
    oscillator.connect(noteGainNode);
    //Configurar la frecuencia y la forma de la onda
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = waveform;
    //conectar el nodo de ganacia
    // Iniciar sonido
    oscillator.start();
    // Sonido menos digital
    const now = audioContext.currentTime;
   //Suene rápido
    const rapidtime = 0.001;
    //Liberación
    //Inicializar la ganancia
    // Se inicia a 0
    noteGainNode.gain.setValueAtTime(0, now);
    noteGainNode.gain.linearRampToValueAtTime(document.getElementById('volume').value, now + rapidtime);
    // Devolver los nodos
    return {oscillator,noteGainNode};
}
function stopNote(ObjectSonido) {
    // Asegurar que el objeto tiene las prpiedades que necesitamos
    const { oscillator, noteGainNode } = ObjectSonido;
    // Tiempo actual
    const now = audioContext.currentTime;
    const releaseTime = 0.5;//Tiempo de liberación
    noteGainNode.gain.cancelScheduledValues(now);
    noteGainNode.gain.linearRampToValueAtTime(0, now + releaseTime);
    //Detener el oscilador
    oscillator.stop(now + releaseTime);
    // Desconectar el oscilador después del desvanecimiento
    oscillator.disconnect();}
// Evento de pulasción de teclas
const handleStart = (notaNombre, teclaElement) => {
    // No haya conflictos de sonidos
    if (activeOscillators[notaNombre]) return;
    // Frecuencia de la nota
    const frequency = nota_freq[notaNombre];
    // Forma de la onda
    const waveform = waveformSelect.value;
    // llamamamos a que toque la nota
    //const oscillator = playNote(frequency, waveform); 
    //Lllamamos a que toque la nota 
    const soundObject = playNote(frequency, waveform);
    //le pasamos elresultado a esa nota
    activeOscillators[notaNombre] = soundObject;
    // NO ES NECESARIO
    if (teclaElement) {
        teclaElement.classList.add('active');
    }
}
const handleStop = (noteName, keyElement) => {
    // Obteneos su mapeado
    const soundObject = activeOscillators[noteName];
    if (soundObject) {
        // Llamamos a la función de parada
        stopNote(soundObject);
        delete activeOscillators[noteName];
    }
    // Si tenemos el elemento de tecla, lo desactivamos
    if (keyElement) {
        keyElement.classList.remove('active');
    }
}
//Asiganción de elementos al teclado
// Manejo de pulsación
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const noteName = tecla_map[key];
    //Verificar si la tecla está mapeada y si no estamos ya pulsando esa tecla
    if (noteName && !event.repeat) {
        //accedemos a los elementos
        const keyElement = document.querySelector(`[data-note="${noteName}"]`);
        //Reproducir la nota y actualizar el estado
        handleStart(noteName, keyElement);
        // Prevenir el comportamiento por defecto del navegador
        event.preventDefault();
    }
});
// Manejo de lineración 
document.addEventListener('keyup', (event) => {
    // la pasamos a mniuscula
    const mniuscula = event.key.toLowerCase();
    // Accedemos al valor 
    const noteName = tecla_map[mniuscula];
    // Si la tecla esta maoeada
    if (noteName) {
        //Encontrar el elemento visual de la tecla en el piano
        const teclaElement = document.querySelector(`[data-note="${noteName}"]`);
        // Detenemos la nota 
        handleStop(noteName, teclaElement);}
});
// Eveento pra el raton
allKeys.forEach(key => {
    // accedemos al valor de la tecla
    const noteName = key.getAttribute('data-note');
    // si es pulsar llamamos a handleStart(noteName, key)
    key.addEventListener('mousedown', () => handleStart(noteName, key));
    // si es soltra llamamos a handleStop(noteName, key)
    key.addEventListener('mouseup', () => handleStop(noteName, key));
    key.addEventListener('mouseleave', () => handleStop(noteName, key));
});

// Para controlar el volumen
volumeControl.addEventListener('input', (event) => {
    gainNode.gain.setValueAtTime(event.target.value, audioContext.currentTime);
});
// Aseguramiento de que el volumen inicial está establecido
gainNode.gain.setValueAtTime(volumeControl.value, audioContext.currentTime);
if (btnDescripcion && modal && btnCerrarDescripcion) {
    btnDescripcion.addEventListener('click', () => {
        modal.style.display = 'flex'; //Se usa flex para centrar el contenido 
    });
    // Ce cierra el boton
    btnCerrarDescripcion.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    // Cerrar el modal haciendo click fuera del boton
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });}