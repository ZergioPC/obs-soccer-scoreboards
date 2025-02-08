//MARK:VAR DOM
import scoreScript from './js/marcador_01.js'

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
        this.interval = setInterval(()=>{callback()},1000);
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



const sc_cambio = {
    entra: 'Pepito Perez Peralta',
    sale: 'Pepito Perez Peralta'
}

scoreScript.scoreInit([
    document.querySelector('.scoreboard'),
    $changeTeam,
    $changeIn,
    $changeOut
]);

const Temporizador = new Tiempo();

//MARK:Funciones
function cambioDeJugador(){
    $btnChangeLocal.disabled = true;
    $btnChangeVisit.disabled = true;

    scoreScript.changePlayer($changeTeam,$changeIn,$changeOut);
    
    setTimeout(()=>{
        $btnChangeLocal.disabled = false;
        $btnChangeVisit.disabled = false;
    },11000)
}

function showExtraTime(){
    scoreScript.extraTime(
        document.querySelector('.scoreboard-time-counter'),
        document.querySelector('.scoreboard-time-extra'),
        true
    )
}

function golEffect(div){
    scoreScript.goal(div);
}

function noGolEffect(div){
    scoreScript.goalNo(div);
}

function timeChange(){    
    if(sc_timeGlob[1] < 59){
        sc_timeGlob[1]++;
    }else{
        sc_timeGlob[1] = 0;
        sc_timeGlob[0]++;       
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
    setTimeout(()=>{$btnStop.disabled = false},2000);
    
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

    scoreScript.scoreShowHide(document.querySelector('.scoreboard'));
    
    Temporizador.startTime(function(){
        timeChange()
    });

    $controlLog.innerText = "Comienza el juego";
});

$btnStop.addEventListener('click',()=>{
    $btnStop.disabled = true;
    setTimeout(()=>{$btnStart.disabled = false},2000);

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
    
    scoreScript.extraTime(
        document.querySelector('.scoreboard-time-counter'),
        document.querySelector('.scoreboard-time-extra'),
        false
    )
    $controlLog.innerText = 'Tiempo detenido';
    scoreScript.scoreShowHide(document.querySelector('.scoreboard'));
});

$btnSetTimer.addEventListener('click',()=>{
    sc_timeInit[0] = parseInt($txtTimerMin.value);
    sc_timeInit[1] = parseInt($txtTimerSeg.value);


    $controlLog.innerText = `Tiempo cambiado a ${sc_timeInit[0]}:${sc_timeInit[1]}`;
    timeChange()
});

$btnSetExtraTime.addEventListener('click',()=>{
    $boardExtraTime.innerText = "+ "+$txtExtraTime.value;
    $controlLog.innerText = `Tiempo extra: ${$txtExtraTime.value} min`;
    showExtraTime();
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
    setTimeout(()=>{
        $scoreLocal.innerText = sc_marcador[0];
    },250)
});

$btnGoalVisit.addEventListener('click',()=>{
    sc_marcador[1]++;
    golEffect($scoreVisit);
    setTimeout(()=>{
        $scoreVisit.innerText = sc_marcador[1];
    },250)
});

$btnNoGoalLocal.addEventListener('click',()=>{
    sc_marcador[0]--;
    noGolEffect($scoreLocal);
    setTimeout(()=>{
        $scoreLocal.innerText = sc_marcador[0];
    },250)
});

$btnNoGoalVisit.addEventListener('click',()=>{
    sc_marcador[1]--;
    noGolEffect($scoreVisit);
    setTimeout(()=>{
        $scoreVisit.innerText = sc_marcador[1];
    },250)
});

/* Equipos */

$btnSetNames.addEventListener('click',()=>{
    equipoChange($txtLocalName.value,$teamLocal);
    equipoChange($txtVisitName.value,$teamVisit);
    $controlLog.innerText = $txtLocalName.value + " vs " + $txtVisitName.value;
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
