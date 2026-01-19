# Presentacion Centro IAT Access

Presentacion web accesible del Centro IAT Access utilizando Reveal.js.

## Estructura del proyecto

```
proyecto_iat_access/
├── index.html    # Archivo principal
├── styles.css           # Estilos CSS
├── script.js            # Logica de carga de diapositivas
├── logo.png             # Logo del centro
└── slides/
    ├── slide1.html      # Portada
    ├── slide2.html      # Que es el Centro
    ├── slide3.html      # Que ofrece
    ├── slide4.html      # Mision
    ├── slide5.html      # Actividades
    └── slide6.html      # Impacto
```

## Requisitos

- Navegador web moderno
- Node.js

## Uso

### Iniciar servidor local

```bash
npx http-server
```

Abrir en navegador: `http://localhost:8080/index.html`

### Navegacion

- Flechas izquierda/derecha: cambiar diapositiva
- Espacio: avanzar
- Inicio/Fin: primera/ultima diapositiva

## Modificar diapositivas

Cada diapositiva es un archivo independiente en la carpeta `slides/`. Para modificar contenido, editar el archivo correspondiente.

Para agregar una nueva diapositiva:
1. Crear archivo `slides/slide7.html`
2. Agregar la ruta en `SLIDES_CONFIG` dentro de `script.js`

## Tecnologias

- Reveal.js 4.6.1
- HTML5 / CSS3
- JavaScript

## Accesibilidad

- Skip link para navegacion por teclado
- Etiquetas ARIA en diapositivas
- Alto contraste en colores
- Texto alternativo en imagenes
