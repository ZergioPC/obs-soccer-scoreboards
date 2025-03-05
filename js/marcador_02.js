/* MARCADOR */

function scoreInit(elemnts){
    elemnts.forEach(element => {
        element.classList.add('fx-barrido-v-empty');
    });
}

function scoreShowHide(element){
    element.classList.toggle('fx-barrido-v-empty');
    element.classList.toggle('fx-barrido-v-full');
    
};

/* TIEMPO EXTRA*/

function extraTime(time,extra,state){
    if(state){
        console.log('aaa')
        extra.classList.add('scoreboard-time-extra-on');
    }else{
        extra.classList.remove('scoreboard-time-extra-on');
    }
}

/* GOLES FX */

function goal(div){
    div.classList.add('key-cube-up');
    setTimeout(()=>{div.classList.remove('key-cube-up')},2100);
}

function goalNo(div){
    div.classList.add('key-cube-dw');
    setTimeout(()=>{div.classList.remove('key-cube-dw')},2100);
}

/* CAMBIOS DE JUGADOR */
function changePlayer(team,entra,sale){
    function auxTransition(element,time,show){
        setTimeout(()=>{
            if(show){
                element.classList.remove('fx-barrido-v-empty');
                element.classList.add('fx-barrido-v-full');
            }else{
                element.classList.remove('fx-barrido-v-full');
                element.classList.add('fx-barrido-v-empty');
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
