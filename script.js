// Configuracion de diapositivas a cargar
const SLIDES_CONFIG = [
  'slides/slide1.html',
  'slides/slide2.html',
  'slides/slide3.html',
  'slides/slide4.html',
  'slides/slide5.html',
  'slides/slide6.html'
];

// Funcion para cargar las diapositivas
async function cargarDiapositivas() {
  const contenedorSlides = document.getElementById('slides-container');
  
  for (const slidePath of SLIDES_CONFIG) {
    try {
      const response = await fetch(slidePath);
      if (response.ok) {
        const contenido = await response.text();
        contenedorSlides.innerHTML += contenido;
      } else {
        console.error('Error cargando:', slidePath);
      }
    } catch (error) {
      console.error('Error cargando diapositiva:', slidePath, error);
    }
  }
  
  // Inicializar Reveal.js despues de cargar todas las diapositivas
  inicializarReveal();
}

// Configuracion e inicializacion de Reveal.js
function inicializarReveal() {
  Reveal.initialize({
    // Navegacion
    hash: true,
    history: true,
    keyboard: true,
    
    // Controles visibles
    controls: true,
    controlsTutorial: true,
    
    // Progreso
    progress: true,
    slideNumber: 'c/t',
    
    // Accesibilidad
    previewLinks: false,
    
    // Sin transiciones automaticas (mejor para accesibilidad)
    autoSlide: 0,
    
    // Transicion suave pero no distractora
    transition: 'slide',
    transitionSpeed: 'default',
    
    // Sin efectos de fondo
    backgroundTransition: 'none',
    
    // Vista de impresion accesible
    pdfSeparateFragments: false
  });
  
  // Configurar anuncios para lectores de pantalla
  configurarAccesibilidad();
  
  // Agregar botones de navegacion accesibles
  agregarBotonesAccesibles();
}

// Anunciar cambio de diapositiva para lectores de pantalla
function configurarAccesibilidad() {
  Reveal.on('slidechanged', function(event) {
    var slideNumber = event.indexh + 1;
    var totalSlides = Reveal.getTotalSlides();
    var slideLabel = event.currentSlide.getAttribute('aria-label') || 'Diapositiva ' + slideNumber + ' de ' + totalSlides;
    
    // Crear anuncio para lectores de pantalla
    var announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = slideLabel;
    
    document.body.appendChild(announcement);
    
    // Actualizar estado de los botones
    actualizarEstadoBotones();
    
    // Eliminar despues de anunciar
    setTimeout(function() {
      announcement.remove();
    }, 1000);
  });
}

// Agregar botones de navegacion accesibles para lectores de pantalla
function agregarBotonesAccesibles() {
  var contenedor = document.createElement('nav');
  contenedor.className = 'navegacion-accesible';
  contenedor.setAttribute('aria-label', 'Navegacion de diapositivas');
  
  contenedor.innerHTML = 
    '<button id="btn-anterior" type="button" aria-label="Ir a diapositiva anterior">Anterior</button>' +
    '<span id="indicador-slide" aria-live="polite">1 de ' + Reveal.getTotalSlides() + '</span>' +
    '<button id="btn-siguiente" type="button" aria-label="Ir a diapositiva siguiente">Siguiente</button>';
  
  document.body.appendChild(contenedor);
  
  document.getElementById('btn-anterior').addEventListener('click', function() {
    Reveal.prev();
  });
  
  document.getElementById('btn-siguiente').addEventListener('click', function() {
    Reveal.next();
  });
  
  // Estado inicial
  actualizarEstadoBotones();
}

// Actualizar estado de botones segun la diapositiva actual
function actualizarEstadoBotones() {
  var btnAnterior = document.getElementById('btn-anterior');
  var btnSiguiente = document.getElementById('btn-siguiente');
  var indicador = document.getElementById('indicador-slide');
  
  var slideActual = Reveal.getIndices().h + 1;
  var totalSlides = Reveal.getTotalSlides();
  
  // Actualizar indicador
  if (indicador) {
    indicador.textContent = slideActual + ' de ' + totalSlides;
  }
  
  // Deshabilitar boton anterior en primera diapositiva
  if (btnAnterior) {
    if (slideActual === 1) {
      btnAnterior.disabled = true;
      btnAnterior.setAttribute('aria-disabled', 'true');
    } else {
      btnAnterior.disabled = false;
      btnAnterior.setAttribute('aria-disabled', 'false');
    }
  }
  
  // Deshabilitar boton siguiente en ultima diapositiva
  if (btnSiguiente) {
    if (slideActual === totalSlides) {
      btnSiguiente.disabled = true;
      btnSiguiente.setAttribute('aria-disabled', 'true');
    } else {
      btnSiguiente.disabled = false;
      btnSiguiente.setAttribute('aria-disabled', 'false');
    }
  }
}

// Iniciar carga cuando el DOM este listo
document.addEventListener('DOMContentLoaded', cargarDiapositivas);
