//~~~~~~~juego 1 contador boton
let contador = 0;
const mostrar_1 = document.getElementById('mostrar_1');

function animar() {
    mostrar_1.classList.remove('mostrar_1');
    void mostrar_1.offsetWidth;
    mostrar_1.classList.add('mostrar_1');
}

document.getElementById('sumar_1').addEventListener('click', () => {
    mostrar_1.innerText = ++contador;
    animar();
});

document.getElementById('restar_1').addEventListener('click', () => {
    mostrar_1.innerText = --contador;
    animar();
});
//~~~~~~~fin juego 1 contador boton

//~~~~~~~ juego 2: adivinar número ~~~~~~~

// ===== CONFIG / ESTADO =====
let numeroSecreto_adiv = Math.floor(Math.random() * 100) + 1;
let intentos_adiv = 0;
const maxIntentos_adiv = 5;

// ===== DOM =====
const input_adiv = document.getElementById('input_adivinar');
const display_adiv = document.getElementById('mostrar_adivinar');
const boton_adiv = document.getElementById('boton_adivinar');
const cuadros_adiv = document.querySelectorAll('.intento');

// ===== FUNCIONES =====

// Reiniciar juego
function reiniciarJuego_adiv() {
    numeroSecreto_adiv = Math.floor(Math.random() * 100) + 1;
    intentos_adiv = 0;

    cuadros_adiv.forEach(c => {
        c.classList.remove('fail', 'success');
    });

    display_adiv.innerText = "nuevo juego";
    display_adiv.style.backgroundColor = "";
    display_adiv.style.transform = "rotate(0deg)";
    input_adiv.value = "";
}

// Animación + feedback visual
function animar_adiv(valor) {
    const diferencia = valor - numeroSecreto_adiv;
    const distancia = Math.abs(diferencia);

    const intensidad = Math.max(0.2, Math.min(distancia / 50, 1));
    const rotacion = intensidad * 30;

    let color;
    if (diferencia > 0) {
        color = `rgba(0, 100, 255, ${intensidad})`; // alto → azul
    } else {
        color = `rgba(255, 50, 50, ${intensidad})`; // bajo → rojo
    }

    display_adiv.style.transform = `rotate(${diferencia > 0 ? rotacion : -rotacion}deg)`;
    display_adiv.style.backgroundColor = color;

    setTimeout(() => {
        display_adiv.style.transform = "rotate(0deg)";
    }, 200);
}

// ===== EVENTO PRINCIPAL =====

boton_adiv.addEventListener('click', () => {
    if (intentos_adiv >= maxIntentos_adiv) return;

    const valor = Number(input_adiv.value);

    // Validación
    if (isNaN(valor)) {
        display_adiv.innerText = "ingresa un número válido";
        return;
    }

    animar_adiv(valor);

    // ===== ACIERTO =====
    if (valor === numeroSecreto_adiv) {
        display_adiv.innerText = "correcto!";

        for (let i = 0; i <= intentos_adiv; i++) {
            cuadros_adiv[i].classList.remove('fail');
            cuadros_adiv[i].classList.add('success');
        }

        setTimeout(reiniciarJuego_adiv, 1500);
        return;
    }

    // ===== FALLO =====
    display_adiv.innerText = valor > numeroSecreto_adiv ? "muy alto" : "muy bajo";

    cuadros_adiv[intentos_adiv].classList.add('fail');
    intentos_adiv++;

    // ===== DERROTA =====
    if (intentos_adiv === maxIntentos_adiv) {
        display_adiv.innerText = `perdiste, era ${numeroSecreto_adiv}`;
        setTimeout(reiniciarJuego_adiv, 1500);
    }
});

//~~~~~~~ fin juego 2 ~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~inicio juego 3
// datos
const g3_opciones = ["piedra", "papel", "tijera"];

const g3_imgJugador = document.getElementById("img-jugador");
const g3_imgMaquina = document.getElementById("img-maquina");
const g3_resultadoBox = document.getElementById("resultado");

// botones
document.getElementById("btn-piedra").addEventListener("click", () => g3_jugar("piedra"));
document.getElementById("btn-papel").addEventListener("click", () => g3_jugar("papel"));
document.getElementById("btn-tijera").addEventListener("click", () => g3_jugar("tijera"));

function g3_jugar(g3_eleccionJugador) {

    // reiniciar puños
    g3_imgJugador.src = "images/puno.png";
    g3_imgMaquina.src = "images/puno.png";

    g3_bloquearBotones(true);
    g3_resultadoBox.textContent = "Jugando...";

    let g3_repeticiones = 0;

    function g3_animar() {

        g3_imgJugador.classList.remove("martillazo");
        g3_imgMaquina.classList.remove("martillazo");

        void g3_imgJugador.offsetWidth;
        void g3_imgMaquina.offsetWidth;

        g3_imgJugador.classList.add("martillazo");
        g3_imgMaquina.classList.add("martillazo");

        setTimeout(() => {
            g3_repeticiones++;

            if (g3_repeticiones < 3) {
                g3_animar();
            } else {
                g3_finalizarJuego(g3_eleccionJugador);
            }

        }, 400);
    }

    g3_animar();
}

function g3_finalizarJuego(g3_eleccionJugador) {

    const g3_eleccionMaquina = g3_opciones[Math.floor(Math.random() * 3)];

    g3_imgJugador.src = `images/${g3_eleccionJugador}.png`;
    g3_imgMaquina.src = `images/${g3_eleccionMaquina}.png`;

    const g3_resultado = g3_obtenerResultado(g3_eleccionJugador, g3_eleccionMaquina);
    g3_resultadoBox.textContent = g3_resultado;

    g3_bloquearBotones(false);
}

function g3_obtenerResultado(g3_jugador, g3_maquina) {

    if (g3_jugador === g3_maquina) return "Empate";

    if (
        (g3_jugador === "piedra" && g3_maquina === "tijera") ||
        (g3_jugador === "papel" && g3_maquina === "piedra") ||
        (g3_jugador === "tijera" && g3_maquina === "papel")
    ) {
        return "Ganaste";
    }

    return "Perdiste";
}

function g3_bloquearBotones(g3_estado) {
    document.getElementById("btn-piedra").disabled = g3_estado;
    document.getElementById("btn-papel").disabled = g3_estado;
    document.getElementById("btn-tijera").disabled = g3_estado;
}
//~~~~~~~~~~~~~~~~~~~~~~~~fin juego3

//~~~~~~~~~~~~~~~~~~~~inicio juego4

// ===== ESTADO =====
let estado_reaction = "idle"; // idle | esperando | listo
let inicioTiempo_reaction = 0;
let timeout_reaction = null;

// ===== DOM =====
const container_reaction = document.getElementById('reaction');
const boton_reaction = document.getElementById('btn-reaction');

// ===== FUNCIONES =====

// Reset visual
function reset_reaction() {
    boton_reaction.disabled = false;

    container_reaction.className = "container bg-secondary d-flex flex-column justify-content-center align-items-center";
    boton_reaction.innerText = "¡INICIAR JUEGO!";
    estado_reaction = "idle";
}

// Iniciar fase de espera
function iniciarEspera_reaction() {
    estado_reaction = "esperando";

    container_reaction.classList.remove('bg-secondary', 'bg-success', 'bg-info');
    container_reaction.classList.add('bg-danger');

    boton_reaction.innerText = "ESPERA EL VERDE...";

    const delay = Math.random() * 3000 + 1000; // 1–4 segundos

    timeout_reaction = setTimeout(() => {
        estado_reaction = "listo";

        container_reaction.classList.remove('bg-danger');
        container_reaction.classList.add('bg-success');

        boton_reaction.innerText = "¡HAZ CLICK!";

        inicioTiempo_reaction = performance.now();

    }, delay);
}

// ===== EVENTO PRINCIPAL =====

boton_reaction.addEventListener('click', () => {

    // 1. Inicio del juego
    if (estado_reaction === "idle") {
        iniciarEspera_reaction();
        return;
    }

    // 2. Click demasiado temprano
    if (estado_reaction === "esperando") {
        clearTimeout(timeout_reaction);

        boton_reaction.disabled = true;

        container_reaction.classList.remove('bg-danger');
        container_reaction.classList.add('bg-warning');

        boton_reaction.innerText = "¡Muy pronto! Intenta de nuevo";

        setTimeout(reset_reaction, 1500);
        return;
    }

    // 3. Click correcto (medir tiempo)
    if (estado_reaction === "listo") {
        const fin = performance.now();
        const duracion = (fin - inicioTiempo_reaction) / 1000; // segundos

        container_reaction.classList.remove('bg-success');
        container_reaction.classList.add('bg-info');
        boton_reaction.disabled = true; 

        boton_reaction.innerText = `Tiempo: ${duracion.toFixed(3)} s`;

        setTimeout(reset_reaction, 2000);
    }
});

//~~~~~~~~~~~~~~~~~~~~fin juego 4


//~~~~~~~~~~~~~~~~~~~~~~~inicio juego 5 trivia
const g5_preguntasBanco = [
    { p: "¿Cuál es el felino más pequeño de Chile?", r: ["Puma","Gato andino","Güiña","Leopardo"], c: 2 },
    { p: "¿Qué ave es característica del bosque húmedo del sur de Chile?", r: ["Cóndor","Tiuque","Loica","Chucao"], c: 3 },    { p: "¿Cuál es endémico de Chile?", r: ["Zorro culpeo","Degú","Puma","Guanaco"], c: 1 },
    { p: "¿Mamífero marino del norte/centro de Chile?", r: ["Elefante marino","Chungungo","Lobo marino común","Ballena azul"], c: 1 },
    { p: "¿Ave voladora más grande de Chile?", r: ["Flamenco chileno","Águila mora","Cóndor andino","Pelícano"], c: 2 },
    { p: "¿Pingüino típico del norte de Chile?", r: ["Pingüino emperador","Pingüino de Magallanes","Pingüino de Humboldt","Pingüino rey"], c: 2 },
    { p: "¿Reptil característico del desierto de Atacama?", r: ["Iguana chilena","Lagartija de Atacama","Culebra de cola larga","Tortuga marina"], c: 1 },
    { p: "¿Marsupial chileno?", r: ["Quirquincho","Monito del monte","Vizcacha","Coipo"], c: 1 },
    { p: "¿Animal adaptado a la altura en la cordillera?", r: ["Vicuña","Caballo","Ciervo rojo","Jabalí"], c: 0 },
    { p: "¿Ave con patas azules?", r: ["Piquero peruano","Gaviota dominicana","Albatros","Piquero de patas azules"], c: 3 }
];

const g5_btnPregunta = document.getElementById("g5_pregunta");
const g5_scoreBox = document.getElementById("g5_score");
const g5_alts = document.querySelectorAll(".g5_alt");
const g5_historial = document.getElementById("g5_historial");

let g5_preguntas = [];
let g5_index = 0;
let g5_puntos = 0;
let g5_correcta = 0;

// iniciar
g5_btnPregunta.addEventListener("click", g5_iniciar);

function g5_iniciar() {
    g5_btnPregunta.disabled = true;

    g5_preguntas = [...g5_preguntasBanco]
        .sort(() => Math.random() - 0.5)
        .slice(0, 7);

    g5_index = 0;
    g5_puntos = 0;
    g5_historial.innerHTML = "";
    g5_scoreBox.textContent = "Puntos: 0";

    g5_mostrarPregunta();
}

function g5_mostrarPregunta() {

    const q = g5_preguntas[g5_index];

    g5_btnPregunta.textContent = q.p;
    g5_animar(g5_btnPregunta);

    // mezclar respuestas
    let opciones = q.r.map((txt, i) => ({ txt, correcta: i === q.c }));
    opciones.sort(() => Math.random() - 0.5);

    opciones.forEach((op, i) => {
        g5_alts[i].textContent = op.txt;
        g5_alts[i].dataset.correcta = op.correcta;
        g5_alts[i].disabled = false;
        g5_alts[i].className = "btn btn-secondary w-100 g5_alt";
    });
}

g5_alts.forEach(btn => {
    btn.addEventListener("click", g5_responder);
});

function g5_responder(e) {

    const btn = e.target;
    const esCorrecta = btn.dataset.correcta === "true";

    g5_alts.forEach(b => b.disabled = true);

    if (esCorrecta) {
        btn.classList.replace("btn-secondary", "btn-success");
        g5_puntos++;
        g5_historial.innerHTML += '<div class="g5_box bg-success"></div>';
    } else {
        btn.classList.replace("btn-secondary", "btn-danger");

        g5_alts.forEach(b => {
            if (b.dataset.correcta === "true") {
                b.classList.replace("btn-secondary", "btn-success");
            }
        });

        g5_historial.innerHTML += '<div class="g5_box bg-danger"></div>';
    }

    g5_animar(btn);
    g5_scoreBox.textContent = "Puntos: " + g5_puntos;

    setTimeout(() => {
        g5_index++;
        if (g5_index < g5_preguntas.length) {
            g5_mostrarPregunta();
        } else {
            g5_btnPregunta.textContent = "Fin del juego, clic para reiniciar";
            g5_btnPregunta.disabled = false;
        }
    }, 1000);
}

function g5_animar(el) {
    el.classList.remove("martillazo");
    void el.offsetWidth;
    el.classList.add("martillazo");
}

//~~~~~~~~~~~~~~~~~~~~~~~fin juego 5 trivia

//~~~~~~~~~~~~~~~~~~~~~~~~~~~inicio juego 6
const g6_area = document.getElementById("g6_area");
const g6_obj = document.getElementById("g6_objetivo");
const g6_scoreBox = document.getElementById("g6_score");
const g6_startBtn = document.getElementById("g6_start");

let g6_puntos = 0;
let g6_jugando = false;
let g6_timeout = null;

// iniciar juego
g6_startBtn.addEventListener("click", g6_iniciar);

function g6_iniciar() {
    // duración del juego (10s)
    const g6_finalBox = document.getElementById("g6_final");
    g6_finalBox.textContent = " ";
    g6_puntos = 0;
    g6_jugando = true;
    g6_scoreBox.textContent = "Puntos: 0";

    g6_startBtn.disabled = true;

    g6_spawn();

    setTimeout(() => {
        g6_jugando = false;
        g6_obj.style.display = "none";

        // mostrar resultado
        g6_finalBox.style.display = "block";
        g6_finalBox.textContent = g6_puntos + " Puntos";

        // animación
        g6_finalBox.classList.remove("martillazo");
        void g6_finalBox.offsetWidth;
        g6_finalBox.classList.add("martillazo");

        g6_startBtn.disabled = false;

    }, 10000);
}

// aparecer objetivo
function g6_spawn() {

    if (!g6_jugando) return;

    const maxX = g6_area.clientWidth - 60;
    const maxY = g6_area.clientHeight - 60;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    g6_obj.style.left = x + "px";
    g6_obj.style.top = y + "px";
    g6_obj.style.display = "block";

    // desaparecer solo si no lo clickeas
    g6_timeout = setTimeout(() => {
        g6_obj.style.display = "none";
        g6_spawn();
    }, 800);
}

// click en objetivo
g6_obj.addEventListener("click", () => {

    if (!g6_jugando) return;

    clearTimeout(g6_timeout);

    g6_puntos++;
    g6_scoreBox.textContent = "Puntos: " + g6_puntos;

    // animación
    g6_scoreBox.classList.remove("martillazo");
    void g6_scoreBox.offsetWidth;
    g6_scoreBox.classList.add("martillazo");

    g6_spawn();
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~fin juego 6

//~~~~~~~~~~~~~~~~~~~~~~~~~~juego7 : preguntas rapidas matematica
const g7_timerBar = document.getElementById("g7_timer");
const g7_display = document.getElementById("g7_operacion");
const g7_input = document.getElementById("g7_input");
const g7_startBtn = document.getElementById("g7_start");
const g7_scoreDisplay = document.getElementById("g7_score");
const g7_feedback = document.getElementById("g7_feedback");

let g7_puntos = 0;
let g7_respuestaCorrecta;
let g7_tiempoRestante;
let g7_intervalo;
const g7_TIEMPO_LIMITE = 50; // 5 segundos (50 ticks de 100ms)

function g7_generarOperacion() {
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];

    if (op === '+') g7_respuestaCorrecta = a + b;
    if (op === '-') g7_respuestaCorrecta = a - b;
    if (op === '*') g7_respuestaCorrecta = a * b;

    g7_display.textContent = `${a} ${op === '*' ? 'x' : op} ${b}`;
    g7_input.value = "";
    g7_input.focus();
}

function g7_terminarJuego() {
    clearInterval(g7_intervalo);
    g7_input.disabled = true;
    g7_startBtn.disabled = false;
    g7_display.textContent = "FIN";
    g7_feedback.textContent = `¡Tiempo agotado! Puntuación final: ${g7_puntos}`;
    g7_timerBar.style.width = "0%";
}

function g7_iniciarCiclo() {
    g7_generarOperacion();
    g7_tiempoRestante = g7_TIEMPO_LIMITE;
    
    clearInterval(g7_intervalo);
    g7_intervalo = setInterval(() => {
        g7_tiempoRestante--;
        let porcentaje = (g7_tiempoRestante / g7_TIEMPO_LIMITE) * 100;
        g7_timerBar.style.width = porcentaje + "%";

        if (g7_tiempoRestante <= 0) {
            g7_terminarJuego();
        }
    }, 100);
}

// Validación automática al escribir
g7_input.addEventListener("input", () => {
    if (parseInt(g7_input.value) === g7_respuestaCorrecta) {
        g7_puntos++;
        g7_scoreDisplay.textContent = g7_puntos;
        g7_feedback.textContent = "¡Bien! Siguiente...";
        
        // Efecto visual de acierto
        g7_display.classList.remove("martillazo");
        void g7_display.offsetWidth;
        g7_display.classList.add("martillazo");
        
        g7_iniciarCiclo(); // Reinicia tiempo y genera nueva pregunta
    }
});

g7_startBtn.addEventListener("click", () => {
    g7_puntos = 0;
    g7_scoreDisplay.textContent = "0";
    g7_input.disabled = false;
    g7_startBtn.disabled = true;
    g7_feedback.textContent = "¡Escribe rápido!";
    g7_iniciarCiclo();
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~+juego7

//~~~~~~~~~~~~~~~~~~~~~~~~~~juego 8
const ttt_inicio = document.getElementById("ttt_inicio");
const ttt_tablero = document.getElementById("ttt_tablero");
const ttt_container = document.getElementById("ttt_container");
const ttt_turno = document.getElementById("ttt_turno");
const ttt_celdas = document.querySelectorAll(".ttt_celda");
const ttt_reiniciar = document.getElementById("ttt_reiniciar");

let ttt_jugador = "X";
let ttt_juegoActivo = false;

let ttt_tableroEstado = [
    "", "", "",
    "", "", "",
    "", "", ""
];

//iniciar juego
ttt_inicio.addEventListener("click",()=>{

    ttt_juegoActivo = true;

    ttt_tablero.classList.add("ttt_activo");

    ttt_inicio.style.display = "none";

});

//verificar ganador
function ttt_verificarGanador(){

    const combinaciones = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let combo of combinaciones){

        let a = combo[0];
        let b = combo[1];
        let c = combo[2];

        if(
            ttt_tableroEstado[a] !== "" &&
            ttt_tableroEstado[a] === ttt_tableroEstado[b] &&
            ttt_tableroEstado[a] === ttt_tableroEstado[c]
        ){

            ttt_juegoActivo = false;

            //animacion
            ttt_celdas[a].classList.remove("martillazo");
            ttt_celdas[b].classList.remove("martillazo");
            ttt_celdas[c].classList.remove("martillazo");

            void ttt_celdas[a].offsetWidth;
            void ttt_celdas[b].offsetWidth;
            void ttt_celdas[c].offsetWidth;

            ttt_celdas[a].classList.add("martillazo");
            ttt_celdas[b].classList.add("martillazo");
            ttt_celdas[c].classList.add("martillazo");

            //texto ganador
            ttt_turno.textContent =
                "GANÓ EL JUGADOR " +
                ttt_tableroEstado[a];

            //mostrar reiniciar
            ttt_reiniciar.style.display =
                "inline-block";

            return true;

        }

    }

    //empate
    if(!ttt_tableroEstado.includes("")){

        ttt_juegoActivo = false;

        ttt_turno.textContent = "EMPATE";

        ttt_reiniciar.style.display =
            "inline-block";

        return true;

    }

    return false;

}

//click celdas
ttt_celdas.forEach((celda,index)=>{

    celda.addEventListener("click",()=>{

        if(!ttt_juegoActivo) return;

        //evitar sobreescribir
        if(
            celda.classList.contains("ttt_x") ||
            celda.classList.contains("ttt_o")
        ) return;

        //jugador X
        if(ttt_jugador === "X"){

            celda.classList.add("ttt_x");

            ttt_tableroEstado[index] = "X";

            if(ttt_verificarGanador()) return;

            ttt_jugador = "O";

            ttt_turno.textContent =
                "turno jugador O";

            ttt_container.classList.remove(
                "ttt_turno_x"
            );

            ttt_container.classList.add(
                "ttt_turno_o"
            );

        }

        //jugador O
        else{

            celda.classList.add("ttt_o");

            ttt_tableroEstado[index] = "O";

            if(ttt_verificarGanador()) return;

            ttt_jugador = "X";

            ttt_turno.textContent =
                "turno jugador X";

            ttt_container.classList.remove(
                "ttt_turno_o"
            );

            ttt_container.classList.add(
                "ttt_turno_x"
            );

        }

    });

});

//reiniciar juego
function ttt_reiniciarJuego(){

    ttt_jugador = "X";

    ttt_juegoActivo = true;

    ttt_tableroEstado = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    ttt_turno.textContent =
        "turno jugador X";

    ttt_container.classList.remove(
        "ttt_turno_o"
    );

    ttt_container.classList.add(
        "ttt_turno_x"
    );

    ttt_reiniciar.style.display =
        "none";

    ttt_celdas.forEach(celda=>{

        celda.classList.remove("ttt_x");
        celda.classList.remove("ttt_o");
        celda.classList.remove("martillazo");

    });

}

//boton reiniciar
ttt_reiniciar.addEventListener("click",()=>{

    ttt_reiniciarJuego();

});
//~~~~~~~~~~~~~~~~~~~~~~~~~~juego 8

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~juego 9
const sn9_tablero = document.getElementById("sn9_tablero");
const sn9_btnInicio = document.getElementById("sn9_inicio");
const sn9_texto = document.getElementById("sn9_turno");

const sn9_tamaño = 8;

let sn9_snake = [];
let sn9_manzana = {};
let sn9_direccion = "derecha";
let sn9_activo = false;


// tablero
function sn9_crearTablero(){
    sn9_tablero.innerHTML = "";

    for(let y=0; y<sn9_tamaño; y++){
        for(let x=0; x<sn9_tamaño; x++){

            const celda = document.createElement("div");
            celda.classList.add("sn9_celda");
            celda.id = `sn9_${x}_${y}`;
            sn9_tablero.appendChild(celda);
        }
    }
}


// manzana segura
function sn9_crearManzana(){

    let ok = false;

    while(!ok){

        let x = Math.floor(Math.random() * sn9_tamaño);
        let y = Math.floor(Math.random() * sn9_tamaño);

        let ocupada = sn9_snake.some(p => p.x === x && p.y === y);

        if(!ocupada){
            sn9_manzana = {x, y};
            ok = true;
        }
    }
}


// dibujar
function sn9_dibujar(){

    // limpiar
    document.querySelectorAll(".sn9_celda").forEach(c=>{
        c.className = "sn9_celda";
    });

    // manzana (solo si existe)
    const m = document.getElementById(`sn9_${sn9_manzana.x}_${sn9_manzana.y}`);
    if(m) m.classList.add("sn9_manzana");

    // snake
    sn9_snake.forEach((p,i)=>{

        const c = document.getElementById(`sn9_${p.x}_${p.y}`);
        if(!c) return;

        if(!sn9_activo){
            c.classList.add("sn9_muerto");
            return;
        }

        if(i === 0){

            c.classList.add("sn9_cabeza");

            if(sn9_direccion === "arriba") c.classList.add("sn9_arriba");
            if(sn9_direccion === "abajo") c.classList.add("sn9_abajo");
            if(sn9_direccion === "izquierda") c.classList.add("sn9_izquierda");
            if(sn9_direccion === "derecha") c.classList.add("sn9_derecha");

        } else if(i === sn9_snake.length - 1){

            c.classList.add("sn9_cola");

        } else {

            c.classList.add("sn9_snake");
        }
    });
}


// mover
function sn9_mover(dx,dy){

    if(!sn9_activo) return;

    const cabeza = {
        x: sn9_snake[0].x + dx,
        y: sn9_snake[0].y + dy
    };

    // pared
    if(
        cabeza.x < 0 ||
        cabeza.x >= sn9_tamaño ||
        cabeza.y < 0 ||
        cabeza.y >= sn9_tamaño
    ){
        sn9_gameOver();
        return;
    }

    // choque cuerpo
    if(sn9_snake.some(p => p.x === cabeza.x && p.y === cabeza.y)){
        sn9_gameOver();
        return;
    }

    sn9_snake.unshift(cabeza);

    if(cabeza.x === sn9_manzana.x && cabeza.y === sn9_manzana.y){
        sn9_crearManzana();
        fahh.play();
    } else {
        sn9_snake.pop();
    }

    sn9_dibujar();
}


// game over
function sn9_gameOver(){
    sn9_activo = false;
    fail.play()
    sn9_texto.textContent = "Perdiste. Presiona iniciar para reiniciar";
    sn9_dibujar();
}


// iniciar
function sn9_inicio(){

    if(sn9_activo) return; // <- clave: evita reinicio en medio del juego

    sn9_activo = true;

    sn9_snake = [
        {
            x: Math.floor(Math.random() * sn9_tamaño),
            y: Math.floor(Math.random() * sn9_tamaño)
        }
    ];

    sn9_direccion = "derecha";

    sn9_crearManzana();

    sn9_texto.textContent = "movimiento -> W, A, S, D";

    sn9_dibujar();
}

// teclado
document.addEventListener("keydown",(e)=>{

    if(!sn9_activo) return;

    const k = e.key.toLowerCase();

    if(k === "w" && sn9_direccion !== "abajo"){
        sn9_direccion = "arriba";
        sn9_mover(0,-1);
    }

    if(k === "s" && sn9_direccion !== "arriba"){
        sn9_direccion = "abajo";
        sn9_mover(0,1);
    }

    if(k === "a" && sn9_direccion !== "derecha"){
        sn9_direccion = "izquierda";
        sn9_mover(-1,0);
    }

    if(k === "d" && sn9_direccion !== "izquierda"){
        sn9_direccion = "derecha";
        sn9_mover(1,0);
    }

});


// botón
sn9_btnInicio.addEventListener("click", sn9_inicio);


// init
sn9_crearTablero();
sn9_dibujar();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~juego 9


//~~~~~~~~~~~~~ load cosas topo ~ seguimiento de el mouse
const topocont = document.getElementById('topo_container');
const topofollow = document.getElementById('follower');

topocont.addEventListener('mousemove', (e) => {
    // Obtenemos la posición del contenedor respecto a la ventana
    const rect = topocont.getBoundingClientRect();

    // Calculamos la posición del mouse relativa al contenedor
    // Restamos la mitad del ancho/alto de la imagen (25px) para que el mouse quede al centro de la imagen
    const x = e.clientX - rect.left - 25; 
    const y = e.clientY - rect.top - 25;

    // Movemos la imagen
    topofollow.style.left = `${x}px`;
    topofollow.style.top = `${y}px`;
});

topocont.addEventListener('click', () => {
    // Reiniciar animación si ya estaba activa
    topofollow.classList.remove('martillazo');
    void topofollow.offsetWidth; // fuerza reflow

    // Activar animación
    topofollow.classList.add('martillazo');
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Logica juego topo
let topos_puntos = 0;
let juegoEjecutandose = false;
const botones = document.querySelectorAll('.cuadrado');
const scoreDisplay = document.getElementById('score');

// Cargar audio
const fahh = new Audio('audios/fah2.mp3');
const fail = new Audio('audios/fail2.mp3');

// Función para obtener un número al azar entre 0 y 8
const randomTopo = () => Math.floor(Math.random() * botones.length);

function aparecerTopo() {
    if (!juegoEjecutandose) return;

    // Seleccionamos hoyo y topo, y limpiamos CUALQUIER estado previo
    const hoyo = botones[randomTopo()];
    const topo = hoyo.querySelector('.topo-img');
    
    hoyo.classList.remove('hoyo-success', 'hoyo-fail');
    topo.classList.remove('subir', 'bajar', 'aplastado');

    // Forzamos un pequeño reset visual
    void hoyo.offsetWidth; 

    // 1. SUBIR
    topo.classList.add('subir');
    let interactuado = false;

    // Función para cuando le pegas
    hoyo.onclick = () => {
        if (interactuado) return;
        interactuado = true;
        
        topos_puntos++;
        scoreDisplay.innerText = topos_puntos;

        // Feedback de ACIERTO
        hoyo.classList.add('hoyo-success');
        topo.classList.add('aplastado');
        fahh.play();

        // Se queda aplastado 700ms para que el usuario lo vea bien
        setTimeout(() => {
            topo.classList.replace('subir', 'bajar');
            topo.classList.remove('aplastado');
            setTimeout(() => hoyo.classList.remove('hoyo-success'), 300);
        }, 700);
    };

    // 2. TIEMPO LÍMITE (Ventana de oportunidad)
    setTimeout(() => {
        if (!interactuado) {
            interactuado = true; // Ya no puede pegarle
            hoyo.onclick = null;

            // Feedback de FALLO
            hoyo.classList.add('hoyo-fail');
            topo.classList.add('bajar');
            fail.play();

            // Quitamos el rojo después de un momento
            setTimeout(() => {
                hoyo.classList.remove('hoyo-fail');
            }, 500);
        }

        // 3. RITMO DEL JUEGO: Pausa entre un topo y el siguiente
        // Aumentamos el tiempo de espera para que no sea estresante
        if (juegoEjecutandose) {
            const pausaCorta = 1000; // 1 segundo de calma
            setTimeout(aparecerTopo, Math.random() * 500 + pausaCorta);
        }
    }, 1200); // El topo espera 1.2 segundos antes de darte por vencido
}
// Botón de Inicio
document.getElementById('btn-inicio_topo').addEventListener('click', () => {
    topos_puntos = 0;
    scoreDisplay.innerText = topos_puntos;
    juegoEjecutandose = true;
    aparecerTopo();
    
    // El juego dura 15 segundos
    setTimeout(() => {
        juegoEjecutandose = false;
        alert("¡Juego terminado! Puntos: " + topos_puntos);
    }, 20000);
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ fin logica topo