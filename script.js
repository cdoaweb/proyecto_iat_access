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
}

// Anunciar cambio de diapositiva para lectores de pantalla
function configurarAccesibilidad() {
  Reveal.on('slidechanged', function(event) {
    const slideNumber = event.indexh + 1;
    const totalSlides = Reveal.getTotalSlides();
    const slideLabel = event.currentSlide.getAttribute('aria-label') || 'Diapositiva ' + slideNumber;
    
    // Crear anuncio para lectores de pantalla
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = slideLabel;
    
    document.body.appendChild(announcement);
    
    // Eliminar despues de anunciar
    setTimeout(function() {
      announcement.remove();
    }, 1000);
  });
}

// Iniciar carga cuando el DOM este listo
document.addEventListener('DOMContentLoaded', cargarDiapositivas);
