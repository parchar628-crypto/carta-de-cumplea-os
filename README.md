# Carta de cumpleaños 💖

Página web interactiva de cumpleaños, pensada para funcionar **sin internet**, sin servidores y sin instalar librerías.

## Cómo abrirla

1. Descomprime el ZIP.
2. Abre `index.html` con Chrome, Edge, Firefox o cualquier navegador moderno.
3. No necesitas instalar Node, Python ni otro programa para usar la carta.

## Cómo editar el texto

Abre `config.js` con Bloc de notas, VS Code u otro editor y cambia:

- `nombre`: nombre de la persona.
- `edad`: opcional.
- `subtitulo`: frase debajo del título.
- `saludo`: título principal.
- `mensaje`: mensaje largo.
- `firma`: firma.
- `frases`: deseos que aparecen más abajo.

## Cómo cambiar las imágenes

Pon tus imágenes dentro de `assets/images/` y cambia las rutas en `config.js`.

Ejemplo:

```js
portada: "assets/images/mi_portada.jpg",

{ src: "assets/images/foto1.jpg", texto: "Nuestro recuerdo 📸" }
```

Puedes usar `.jpg`, `.jpeg`, `.png`, `.webp` o `.svg`.

## Qué incluye

- Sobre animado para abrir la carta.
- Texto con efecto de escritura.
- Portada con imagen.
- Galería de fotografías ampliable.
- Deseos animados.
- Partículas flotantes.
- Confeti al final.
- Diseño adaptable a celular y computadora.
- Botón para volver al inicio.
- Sin frameworks ni librerías externas para que consuma pocos recursos.

## Programa recomendado para editarlo

**Visual Studio Code** es una opción gratuita y cómoda. También puedes editar `config.js` con el Bloc de notas.

## Música opcional

La versión incluida no usa música externa para mantenerla ligera y totalmente local. Si después quieres añadir una canción, puedes guardar un audio dentro de `assets/audio/` y agregar un reproductor local al HTML.
