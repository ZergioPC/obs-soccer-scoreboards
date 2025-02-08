/* MARCADOR */

function scoreInit(elemnts){
    elemnts.forEach(element => {
        element.classList.add('fx-barrido-h-empty'); 
    });
}

function scoreShowHide(elemnt){
    elemnt.classList.toggle('fx-barrido-h-empty');
    elemnt.classList.toggle('fx-barrido-h-full');
    elemnt.classList.add('key-shine');
    setTimeout(()=>{
        elemnt.classList.remove('key-shine');
    },1510);
};

/* TIEMPO EXTRA*/

function extraTime(time,extra,state){
    if(state){
        time.classList.add('scoreboard-time-counter-displace');
        extra.classList.add('scoreboard-time-extra-displace');
    }else{
        time.classList.remove('scoreboard-time-counter-displace');
        extra.classList.remove('scoreboard-time-extra-displace');
    }
}

/* GOLES FX */

function goal(div){
    div.classList.add('key-shine');
    setTimeout(()=>{div.classList.remove('key-shine')},550);
}

function goalNo(div){
    div.classList.add('key-dark');
    setTimeout(()=>{div.classList.remove('key-dark')},550);
}

/* CAMBIOS DE JUGADOR */
function changePlayer(team,entra,sale){
    function auxTransition(element,time,show){
        setTimeout(()=>{
            if(show){
                element.classList.remove('fx-barrido-h-empty');
                element.classList.add('fx-barrido-h-full');
            }else{
                element.classList.remove('fx-barrido-h-full');
                element.classList.add('fx-barrido-h-empty');
            }
        },time);
    }

    entra.classList.add('chPlayer-in');
    sale.classList.add('chPlayer-out');
    
    auxTransition(team,0,true);
    auxTransition(entra,200,true);
    auxTransition(sale,400,true);

    setTimeout(()=>{
        entra.classList.remove('chPlayer-in');
        entra.classList.add('chPlayer-out');
        sale.classList.remove('chPlayer-out');
        sale.classList.add('chPlayer-in');
    },5000);

    auxTransition(team,10400,false);
    auxTransition(entra,10000,false);
    auxTransition(sale,10200,false);

    setTimeout(()=>{
        entra.classList.remove('chPlayer-out');
        sale.classList.remove('chPlayer-in');
    },10600);
}

export default {
    scoreInit,
    scoreShowHide,
    extraTime,
    goal,goalNo,
    changePlayer
};
