//////////Trabajo final de Brenda Fabri////////////////
///////////////Alumna de Coderhouse///////////////////

/////////////funcion principal////////
function gameMain (playerName) {
    /////Guardar jugador/////
    localStorage.setItem('player', playerName);
    
    timer();
  
    jugadornombre.innerHTML = playerName;
    jn.innerHTML = playerName;   
}

function inicioRanking() {
    best = JSON.parse(localStorage.getItem(bestLocalStorage));
    if(best){
        mejoresDataBase();
    }else{
        getListadoMejores();
    }
}

function jugar (jugador) {
        
    const opcionmaquina = calcopcionmaquina ();
    const resultado = calcresult(jugador, opcionmaquina);

    resultplayer.src = `./img/${jugador}.png`;
    resultmaquina.src= "./img/"+ opcionmaquina +".png";
   
    switch (resultado) {
        case Empate:
            textresultado.innerHTML= "Empate"; 
            break;
        case Ganaste :
            textresultado.innerHTML= "Ganaste";
            contadorj++;
            Contadorj_span.innerHTML= contadorj;
            break;
        case Perdiste :
            textresultado.innerHTML = "Perdiste";
            contadorm++;
            Contadorm_span.innerHTML= contadorm;
            break;
    }
  
}

function calcopcionmaquina() {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
        case 0:
            return Piedra;
        case 1:
            return Papel;
        case 2:
            return Tijera;
    }
}

function calcresult (jugador, opcionmaquina){
    if (jugador === opcionmaquina){
        return Empate;
    }else if (jugador === Piedra && opcionmaquina === Papel){
        return Perdiste;
    
    }else if( jugador === Piedra && opcionmaquina === Tijera) {
        return Ganaste;
    }
    else if (jugador=== Tijera && opcionmaquina === Papel){
        return Ganaste;
    }else if( jugador === Tijera && opcionmaquina === Piedra) {
        return Perdiste;
    }
    else if (jugador=== Papel && opcionmaquina === Tijera){
        return Perdiste;
    }else if( jugador === Papel && opcionmaquina === Piedra) {
        return Ganaste;
    }
}

////////////Ranking////////////
getListadoMejores = async() => {
    const resp = await fetch("./mJugadores.json")
    data = await resp.json();
    data.sort((a, b) => b.puntosS - a.puntosS);
    best = data;

    let panelBody = ""
    data.forEach(mejores => {
        panelBody += `
            <p><b>${mejores.nombreS}</b>: ${mejores.puntosS}</p>
        `
    });
    panelRanking.innerHTML = panelBody;
}

function mejoresDataBase() {
    let panelBody = ""
    best.forEach(mejores => {
        panelBody += `
         <b>${mejores.nombreS}</b>: ${mejores.puntosS}</p>
        `
    });
    panelRanking.innerHTML = panelBody;
    
}

function agregoMejores(){

    localStorage.removeItem(bestLocalStorage);

    const objMejores = {
    nombreS:  localStorage.getItem('player'),
    puntosS: contadorj,
    }

    let seAgrego = 0;

    best.forEach(elemento => {
     
        let i = best.indexOf( elemento );

        if (elemento.nombreS === objMejores.nombreS && elemento.puntosS <= objMejores.puntosS){
            best.splice(i, 1)
            best.push(objMejores);
            seAgrego = 1;
            return;
        
        } else if(elemento.nombreS === objMejores.nombreS && elemento.puntosS >= objMejores.puntosS){
            seAgrego = 1;
            return;
        }
    })

    if (seAgrego == 0) {
        best.push(objMejores);
    }

    best.sort((a, b) => b.puntosS - a.puntosS);

    localStorage.setItem(bestLocalStorage, JSON.stringify(best));

    let panelBody = ""
    best.forEach(mejores => {
        panelBody += `
            <b>${mejores.nombreS}</b>: ${mejores.puntosS}</p>
        `
    });
    panelRanking.innerHTML = panelBody;
}

///////Musica//////////
function sonido(){
   if( count== 0 ){
        count = 1;
        newsonido.play();
    }else{
        count = 0;
        newsonido.pause();
    }
    newsonido.volume=0.1;
}

//////timpo//////
function timer() {
    let tiempo = 20;

    countDown = () => {
        setTimeout(() => {
            tiempo--;
            document.getElementById("tiempo").innerHTML = `Tiempo ${tiempo}`;
            if (tiempo === 0) {
                finJuego();
                return;
            }
            else {
                countDown();
            }
        }, 1000);
    }

    countDown();
}

finJuego = () => {
    let resultado;
    if(contadorm === 0 && contadorj === 0) {
        resultado = 3; // no jugo
    } else if(contadorm > contadorj) {
        resultado = 1;
    } else if(contadorm < contadorj) {
        agregoMejores ();
        resultado = 2;
    } else {
        resultado = 0;
    }
    
    endGame(resultado, localStorage.getItem('player'), contadorj);
}

resetGame = () => {
    contadorj = 0;
    contadorm = 0;
    Contadorm_span.innerHTML = contadorm;
    Contadorj_span.innerHTML = contadorj;
}

function initTheme(){ 
    const temaButton = document.getElementById ("temaButton");
    const storageTheme = localStorage.getItem('backgroundTheme');

    if (storageTheme) {
        document.body.classList.add(storageTheme);
    } else {
        localStorage.setItem('backgroundTheme', firstmode);
        document.body.classList.add(firstmode);  
    }

    temaButton.addEventListener("click", () => {
        document.body.classList.toggle(firstmode);
        document.body.classList.toggle(darkmode);

        if(document.body.classList.contains(firstmode)) {
            localStorage.setItem('backgroundTheme', firstmode);
        } else {
            localStorage.setItem('backgroundTheme', darkmode);
        }
    });

}

initTheme();