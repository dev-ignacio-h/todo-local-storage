// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Event listeners
evntListeners();

function evntListeners() {
    // cuando un usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweet);

    // cuando el documento está listo
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];
        crearHTML();
        console.log(tweets);
    });
}

// Funciones
function agregarTweet(e) {
    e.preventDefault();
    // Textarea donde el usuario escribe
    const tweet = document.querySelector("#tweet").value;
    // validación
    if (tweet === "") {
        mostrarError("Un mensaje no puede ir vacío");
        return; //evita que se ejecuten más líneas de código
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    };
    // añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // crear HTML
    crearHTML();

    // reiniciar formulario
    formulario.reset();
}

// mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");

    // insertarlo en el contenido
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);

    // elimina la alerta después de tres segundos<
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// muestra listado de los tweets
function crearHTML() {
    limpiarHTML();
    if (tweets.length > 0) {
        tweets.forEach(({ tweet, id }) => {
            // agregar boton eliminar
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.innerHTML = "X";
            // añadir función eliminar
            btnEliminar.onclick = () => {
                borrarTweet(id);
            };
            // crear HTML
            const li = document.createElement("li");
            // añadir texto
            li.innerText = tweet;
            // asignar botón
            li.appendChild(btnEliminar);

            // insertarlo en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agrega los tweets actuales a local storage
function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

// elimina tweet
function borrarTweet(id) {
    tweets = tweets.filter(({ id: tweetID }) => tweetID !== id);
    crearHTML();
}

// limpiar HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}