/* eslint-disable no-undef, no-unused-vars */

// DECLARACIONES

// Variable donde se almacena el sintetizador de voz
let speech;

// RETO 1: velocidad de la voz (1 = normal, 0.5 = lenta, 2 = rápida)
const VELOCIDAD = 0.5;

// RETO 2: idioma del sintetizador (ej: "es", "es-ES", "en-US", "fr-FR", "de-DE")
const IDIOMA = "en-US";

// RETO 3: frase que debe sintetizar el software
const FRASE = "Welcome to the Activity Multimedia Systems Architecture course";

// RETO 5: posición (dentro de las voces del idioma elegido) de la voz a usar
const INDICE_VOZ = 1;

// FUNCIÓN DE CONFIGURACIÓN
function setup() {
  // Crea un lienzo de tamaño 250x250
  createCanvas(250, 250);
  // Crea un objeto de sintetizador de audio.
  // Se pasa voiceReady como callback: se ejecuta cuando las voces ya cargaron
  speech = new p5.Speech(voiceReady);
  // Configura el idioma del sintetizador (Reto 2)
  speech.setLang(IDIOMA);
  // Configura la velocidad de la voz (Reto 1)
  speech.setRate(VELOCIDAD);
}

// FUNCIÓN QUE SE EJECUTA CUANDO LAS VOCES ESTÁN DISPONIBLES
function voiceReady() {
  // RETO 4: obtiene el listado de voces disponibles
  // Imprime en la consola del navegador todas las voces (índice y nombre)
  speech.listVoices();

  // También se puede recorrer el arreglo speech.voices
  console.log("Voces disponibles: " + speech.voices.length);
  for (let i = 0; i < speech.voices.length; i++) {
    console.log(i + ": " + speech.voices[i].name + " (" + speech.voices[i].lang + ")");
  }

  // RETO 5: cambia la voz utilizada en el sintetizador
  // Se filtran las voces que coinciden con el idioma elegido
  const prefijo = IDIOMA.split("-")[0];
  const voces = speech.voices.filter((v) => v.lang.startsWith(prefijo));
  if (voces.length > 0) {
    // Si el índice no existe, se usa la última voz disponible del idioma
    const voz = voces[min(INDICE_VOZ, voces.length - 1)];
    speech.setVoice(voz.name);
    console.log("Voz seleccionada: " + voz.name);
  } else {
    console.log("No hay voces para el idioma " + IDIOMA + ", se usa la voz por defecto");
  }
}

// FUNCIÓN DE PINTADO
function draw() {
  // Pinta un cuadrado negro con la palabra ASM en blanco
  fill(0);
  noStroke();
  rect(0, 0, 250, 250);
  fill(255);
  textStyle(BOLD);
  textSize(95);
  text("ASM", 10, 150);
}

// FUNCIÓN DE CAPTURA DEL CLIC DEL RATÓN
function mouseClicked() {
  // Sintetiza en voz el texto pasado como parámetro (Reto 3)
  speech.speak(FRASE);
}