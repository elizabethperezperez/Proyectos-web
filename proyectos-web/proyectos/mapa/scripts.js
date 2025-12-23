//document.addEventListener( 'DOMContentLoaded', () => {
    //Acceder a los elementos 
    const provincias = document.querySelectorAll('.provincia');
    const tooltip = document.getElementById('tooltip');
    const modal = document.getElementById('modal');
    const classButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    
    // Nuevo panel de elementos
    const controlPanel = document.getElementById('control-panel');
    const toggleButton = document.getElementById('toggle-panel-button');
    const itemSizeRange = document.getElementById('item-size');
    const currentSizeSpan = document.getElementById('current-size');
    // Datos de ejemplo en un diccionario para el modal
    //Para abrir y cerrar el panel 
    const mapa = document.getElementById('mapa');
    const mapScaleRange = document.getElementById('map-scale');
    const currentMapScaleSpan = document.getElementById('current-map-scale');
    toggleButton.addEventListener('click', () => {
        controlPanel.classList.toggle('open');});
    itemSizeRange.addEventListener('input', (e) => {
        const newSize = e.target.value;
        currentSizeSpan.textContent = `${newSize}em`;
            provincias.forEach(provincia => {
                provincia.style.width = `${newSize}em`;
                provincia.style.height = `${newSize}em`;
        });
    });
    mapScaleRange.addEventListener('input', (e) => {
        const newScale = e.target.value;
        mapa.style.transform = `scale(${newScale})`;
        
        const percentage = Math.round(newScale * 100);
        currentMapScaleSpan.textContent = `${percentage}%`;});
    // Datos de ejemplo para el modal (Añadir más provincias)
    const datosProvincia = {
    'Cordoba': {
        'Titulo': "Provincia de Córdoba",
        'Capital': "Córdoba",
        'Comer': ["Casa Pepe de la Judería", "Taberna Salinas", "Restaurante Noor"],
        'TooltipTitulo': 'Córdoba, Patrimonio Mundial', 
        'TooltipDescripcion': 'Famosa por su Mezquita-Catedral y el Alcázar de los Reyes Cristianos.'
    },
    'Sevilla': {
        'Titulo': "Provincia de Sevilla",
        'Capital': "Sevilla",
        'Comer': ["El Gallinero de Sandra", "Eslava"],
        'TooltipTitulo': 'Sevilla, La Giralda',
        'TooltipDescripcion': 'Conocida por el Real Alcázar y el Archivo de Indias, centro cultural de Andalucía.'
    },
    'Jaen': { // Coincide con data-provincia="Jaen"
        'Titulo': "Provincia de Jaén",
        'Capital': "Jaén",
        'Comer': ["Casa Antonio", "Tasca y Media"],
        'TooltipTitulo': 'Jaén, capital del Aceite',
        'TooltipDescripcion': 'Conocida por la Catedral y ser la principal productora mundial de aceite de oliva.'
    },
    'Almeria': { // Coincide con data-provincia="Almeria"
        'Titulo': "Provincia de Almería",
        'Capital': "Almería",
        'Comer': ["Casa Joaquín", "Tapas El Jurelico"],
        'TooltipTitulo': 'Almería, Tierra de Cine',
        'TooltipDescripcion': 'Hogar de la Alcazaba y famosa por sus paisajes desérticos usados en películas.'
    },
    'Granada': { // Coincide con data-provincia="Granada"
        'Titulo': "Provincia de Granada",
        'Capital': "Granada",
        'Comer': ["Los Diamantes", "Ruta del Azafrán"],
        'TooltipTitulo': 'Granada, La Alhambra',
        'TooltipDescripcion': 'Sede de la majestuosa Alhambra y la sierra de Sierra Nevada.'
    },
    'Malaga': { // Coincide con data-provincia="Malaga"
        'Titulo': "Provincia de Málaga",
        'Capital': "Málaga",
        'Comer': ["El Pimpi", "Restaurante José Carlos García"],
        'TooltipTitulo': 'Málaga, Costa del Sol',
        'TooltipDescripcion': 'Cuna de Picasso, conocida por sus playas, museos y el ambiente cosmopolita.'
    },
    'Cádiz': { // Coincide con data-provincia="Cádiz" (Tiene tilde, asegurando la coherencia)
        'Titulo': "Provincia de Cádiz",
        'Capital': "Cádiz",
        'Comer': ["El Faro de Cádiz", "Casa Manteca"],
        'TooltipTitulo': 'Cádiz, Tacita de Plata',
        'TooltipDescripcion': 'La ciudad más antigua de Occidente, famosa por su Carnaval y sus playas.'
    },
    'Huelva': { // Coincide con data-provincia="Huelva"
        'Titulo': "Provincia de Huelva",
        'Capital': "Huelva",
        'Comer': ["Acánthum", "Restaurante Macha"],
        'TooltipTitulo': 'Huelva, Puerta de América',
        'TooltipDescripcion': 'Punto de partida del viaje de Colón y hogar del Parque Nacional de Doñana.'
    }
};
    // Función para mostrar el modal
    function openModal(nombreProb){
        //Sacamos los datos de esa provincia
        const data = datosProvincia[nombreProb];
        // si existen datos
        if (data){
            modalTitle.textContent = data.Titulo;
            //CAMBIAR ESTO PARA LOS DATOS CORRECTOS
            let htmlContent = `<strong>Capital:</strong> ${data.Capital}<br><br>`;
            htmlContent += '<strong>Sugerencias para comer:</strong><ul>';
            data.Comer.forEach(item => {
                htmlContent += `<li>${item}</li>`;
            });
            htmlContent += '</ul>';
            //Insertar el html creado
            modalText.innerHTML = htmlContent;
            modal.style.display = 'block';
        }
    }
    // Función para manejar el poscionamiento del tooltip
    function positionTooltip(e, tooltip) {
        const offset = 30; 
        //el ancho de la ventana
        const viewportWidth = window.innerWidth;
        //obtenr ek ancho del tooltip
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        // definir un umbral proximo al borde
        const edgeThreshold = 500;
        // posicionamiento vertical 
        tooltip.style.top = `${e.clientY - (tooltipHeight / 2)}px`;
        //tooltip.style.top = `${e.clientY - (tooltip.offsetHeight / 2)}px`;
        // si esta en el borde cambiarlo de posición
        if (e.clientX > viewportWidth - edgeThreshold) {
            // Posicionar a la izquierda del cursor
            tooltip.style.left = `${e.clientX - tooltipWidth - offset}px`;
        }
        /*else if (e.clientX < edgeThreshold){
            tooltip.style.left = `${e.clientX + offset}px`;

        }*/ else {
            tooltip.style.left = `${e.clientX - (tooltipWidth / 2)}px`;
        }

    }

    //Manejar eventos
    provincias.forEach(provincia => {
        const nombre = provincia.getAttribute('data-provincia');
        const data = datosProvincia[nombre]
        //Evento: Mouse Enter (Mostrar Tooltip)
        provincia.addEventListener('mouseenter', (e) => {
            // Construir la leyenda HTML
            if (data){
                const tooltipHtml = `<div>
                    <h3>${data.TooltipTitulo || nombre}</h3>
                    <p>${data.TooltipDescripcion || 'Información no disponible.'}</p>
                </div>
                `;
                // insetar HTML
                tooltip.innerHTML = tooltipHtml;
                // lo hace visible
                tooltip.style.display = 'block';
                // Posiciona a la derecha o la izquierda el puntero
                positionTooltip(e, tooltip);
                
                }
        });
        // Mover el toolip El mouse se mueve
        provincia.addEventListener('mousemove', (e) => {
            positionTooltip(e, tooltip);
    });
    // Ocultar el toolip, mouse leave
    provincia.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';

    });
    // Abrir modal
    provincia.addEventListener('click', () => {
        openModal(nombre)
        tooltip.style.display = 'none'; // Asegurarnos de que no se vea el toolip


    });
    });
   // });
    // Cerrar evento, click al boton de cerrar 
    classButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    // Clicar furra del modal para cerrarlo 
    window.addEventListener('click', (event) => {
        if (event.target == modal){
            modal.style.display = 'none';
        }
    });


//});