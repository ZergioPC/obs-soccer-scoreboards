//MARK:VAR DOM
/* Marcador */
const $btnStart = document.getElementById('controlShow');
const $btnStop = document.getElementById('controlHide');
    $btnStop.disabled = true;
const $controlLog = document.getElementById('contolLog');

const $boardTimer = document.getElementById('score-timer');
const $boardExtraTime = document.getElementById('score-extraTime');

const $teamLocal = document.getElementById('score-Local-name');
const $teamVisit = document.getElementById('score-Visit-name');

const $scoreLocal = document.getElementById('score-Local-num');
const $scoreVisit = document.getElementById('score-Visit-num');

const $changeTeam = document.getElementById('score-playerTeam');
const $changeIn = document.getElementById('score-playerOut');
const $changeOut = document.getElementById('score-playerIn');

/* Panel de Control */
const $btnGoalLocal = document.getElementById('golAddTeamA');
    $btnGoalLocal.disabled = true;
const $panelGoalLocal = document.getElementById('golTeamA');
const $btnNoGoalLocal = document.getElementById('golLessTeamA');
    $btnNoGoalLocal.disabled = true;

const $btnGoalVisit = document.getElementById('golAddTeamB');
    $btnGoalVisit.disabled = true;
const $panelGoalVisit = document.getElementById('golTeamB');
const $btnNoGoalVisit = document.getElementById('golLessTeamB');
    $btnNoGoalVisit.disabled = true;

const $btnSetNames = document.getElementById('setTeamsNames');
const $txtLocalName = document.getElementById('txt-local-team');
const $txtVisitName = document.getElementById('txt-visit-team');

const $btnSetScore = document.getElementById('setTeamsScores');
const $txtLocalScore = document.getElementById('score-init-local');
const $txtVisitScore = document.getElementById('score-init-visit');

const $btnSetTimer = document.getElementById('setTimer');
const $txtTimerMin = document.getElementById('setTimerMin');
const $txtTimerSeg = document.getElementById('setTimerSeg');

const $btnSetExtraTime = document.getElementById('setExtraTime');
const $txtExtraTime = document.getElementById('data-extraTime');

const $btnChangeLocal = document.getElementById('ch-player-TA');
    $btnChangeLocal.disabled = true;
const $btnChangeVisit = document.getElementById('ch-player-TB');
    $btnChangeVisit.disabled = true;
const $txtPlayerIn = document.getElementById('change-player-in');
const $txtPlayerOut = document.getElementById('change-player-out');

//MARK: GLOBALES
class Tiempo {
    constructor(){
        this.interval = false;
    }

    startTime(callback){
        this.interval = setInterval(()=>{callback()},100);
    }

    stopTime(){
        clearInterval(this.interval);
        this.interval = false;
    }
}

const sc_marcador = [0,0];
const sc_equipos = ["AAA","BBB"];

const sc_timeGlob = [0,0]
const sc_timeInit = [0,0];

let countdown = 45;

const sc_cambio = {
    entra: 'Pepito Perez Peralta',
    sale: 'Pepito Perez Peralta'
}

const Temporizador = new Tiempo();

//MARK:Funciones
function cambioDeJugador(){
    //Estilos de cambiar de jugador
}

function showExtraTime(){
    //Estilo de mostrar tiempo extra
}

function golEffect(div){
    //Estilo del gol
}

function noGolEffect(div){
    //Estilo de gol anulado
}

function timeChange(){    
    if(sc_timeGlob[1] < 59){
        sc_timeGlob[1]++;
    }else{
        sc_timeGlob[1] = 0;
        sc_timeGlob[0]++;
        countdown--;
        
    }

    if(countdown === 0){
        showExtraTime();
    }
    
    function auxDraw(num){
        if(num < 10){
            return `0${num}`;
        }else{
            return `${num}`;
        }
    }
    $boardTimer.innerText = `${auxDraw(sc_timeGlob[0])}:${auxDraw(sc_timeGlob[1])}`;
}

function equipoChange(name,inner){
    if(name.length > 3){
        $controlLog.innerText = 'Solo 3 Letras!';
        return
    }else{
        inner.innerText = name.toUpperCase();
    }
}

//MARK: EventListeneres

/* Tiempo */
$btnStart.addEventListener('click',()=>{
    $btnStart.disabled = true;
    $btnStop.disabled = false;
    
    $btnGoalLocal.disabled = false;
    $btnGoalVisit.disabled = false;
    $btnNoGoalLocal.disabled = false;
    $btnNoGoalVisit.disabled = false;

    $btnChangeLocal.disabled = false;
    $btnChangeVisit.disabled = false;
    
    $btnSetNames.disabled = true;
    $btnSetScore.disabled = true;
    $btnSetTimer.disabled = true;

    $scoreLocal.innerText = sc_marcador[0];
    $scoreVisit.innerText = sc_marcador[1];
    
    $boardTimer.innerText = '00:00';
    sc_timeGlob[0] = sc_timeInit[0];
    sc_timeGlob[1] = sc_timeInit[1];
    
    Temporizador.startTime(function(){
        timeChange()
    });

    $controlLog.innerText = "Comienza el juego"
});

$btnStop.addEventListener('click',()=>{
    $btnStop.disabled = true;
    $btnStart.disabled = false;

    $btnGoalLocal.disabled = true;
    $btnGoalVisit.disabled = true;
    $btnNoGoalLocal.disabled = true;
    $btnNoGoalVisit.disabled = true;

    $btnChangeLocal.disabled = true;
    $btnChangeVisit.disabled = true;

    $btnSetNames.disabled = false
    $btnSetScore.disabled = false
    $btnSetTimer.disabled = false

    Temporizador.stopTime();
    $controlLog.innerText = 'Tiempo detenido';
    });

$btnSetTimer.addEventListener('click',()=>{
    sc_timeInit[0] = parseInt($txtTimerMin.value);
    sc_timeInit[1] = parseInt($txtTimerSeg.value);
    countdown = 45;
    countdown = countdown - sc_timeInit[0];
    $controlLog.innerText = `Tiempo cambiado a ${sc_timeInit[0]}:${sc_timeInit[1]}`;
    timeChange()
});

$btnSetExtraTime.addEventListener('click',()=>{
    $boardExtraTime.innerText = "+ "+$txtExtraTime.value;
    $controlLog.innerText = `Tiempo extra: ${$txtExtraTime.value} min`;
});

/* Marcador */
$btnSetScore.addEventListener('click',()=>{
    sc_marcador[0] = $txtLocalScore.value;
    sc_marcador[1] = $txtVisitScore.value;
    $controlLog.innerText = `Marcador inicial: ${sc_marcador}`;
});

$btnGoalLocal.addEventListener('click',()=>{
    sc_marcador[0]++;
    golEffect($scoreLocal);
    $scoreLocal.innerText = sc_marcador[0];
});

$btnGoalVisit.addEventListener('click',()=>{
    sc_marcador[1]++;
    golEffect($scoreVisit);
    $scoreVisit.innerText = sc_marcador[1];
});

$btnNoGoalLocal.addEventListener('click',()=>{
    sc_marcador[0]--;
    noGolEffect($scoreLocal);
    $scoreLocal.innerText = sc_marcador[0];
});

$btnNoGoalVisit.addEventListener('click',()=>{
    sc_marcador[1]--;
    noGolEffect($scoreVisit);
    $scoreVisit.innerText = sc_marcador[1];
});

/* Equipos */

$btnSetNames.addEventListener('click',()=>{
    equipoChange($txtLocalName.value,$teamLocal);
    equipoChange($txtVisitName.value,$teamVisit);
});

$btnChangeLocal.addEventListener('click',()=>{
    $controlLog.innerText = 'Equipo local Cambia de Jugadores';
    $changeTeam.innerText = $teamLocal.textContent;
    $changeIn.innerText = $txtPlayerIn.value;
    $changeOut.innerText = $txtPlayerOut.value;
    cambioDeJugador();
});

$btnChangeVisit.addEventListener('click',()=>{
    $controlLog.innerText = 'Equipo visitante Cambia de Jugadores';
    $changeTeam.innerText = $teamVisit.textContent;
    $changeIn.innerText = $txtPlayerIn.value;
    $changeOut.innerText = $txtPlayerOut.value;
    cambioDeJugador();
});
