//////////Trabajo final de Brenda Fabri////////////////
///////////////Alumna de Coderhouse///////////////////
let jugador ="Nombre del Jugador";
let puntos=0;
let data = [];
const firstmode = 'firstmode';
const darkmode = 'darkmode';
let jugadornombre = document.getElementById ("jugadornombre")
let jn =document.getElementById ("jn")
let best = JSON.parse(localStorage.getItem("mejores"))
const ranking= document.getElementById ("ranking")
let contadorj= 0;
let contadorm= 0;
document.getElementById("ranking").addEventListener("click", () =>{
    document.getElementById("panelRanking").classList.toggle('hide');
    getListadoMejores();
});

/////////////funcion principal////////
function gameMain (playerName) {
    
    /////Guardar jugador/////
    if(localStorage.getItem("jugadorname")=="true"){
        playerName =localStorage.getItem("Nombre del Jugador")
    }



    console.log('Nombre del Jugador: ', playerName);
    timer();
    sonido();
    // const eleccionesjugador= ["PIEDRA, PAPEL O TIJERA"]
    // eleccionesjugador.push ()
    
    // console.log ( eleccionesjugador)
    
    jugadornombre.innerHTML = playerName;
    jn.innerHTML = playerName;
   
    //////Constantes ////
    const Piedra = "Piedra";
    const Papel = "Papel";
    const Tijera = "Tijera";
    
    const Empate = 0;
    const Perdiste = 1;
    const Ganaste = 2;

 


    const PiedraBTN = document.getElementById ("Piedra")
    const PapelBTN= document.getElementById ("Papel")
    const TijeraBTN = document.getElementById ("Tijera")
    const resultmaquina = document.getElementById ("resultmaquina")
    const resultplayer = document.getElementById ("resultplayer")
    const textresultado = document.getElementById ("textresultado")
    const abandonar = document.getElementById  ("abandonar")
    const Contadorj_span= document.getElementById ("Contadorj")
    const Contadorm_span= document.getElementById ("Contadorm")


    /////////Eventos//////////
    PiedraBTN.addEventListener("click",()=>{
           jugar(Piedra);
    });
    
    PapelBTN.addEventListener("click", () =>{
            jugar(Papel);
     });
     
     TijeraBTN.addEventListener("click", () =>{
              jugar(Tijera);
     });
    
    
    
    function jugar (jugador) {
        
        const opcionmaquina = calcopcionmaquina ();
        const resultado = calcresult(jugador, opcionmaquina);
    
    
        resultplayer.src = `./img/${jugador}.png`;
        resultmaquina.src= "./img/"+ opcionmaquina +".png";
           
        textresultado.innerHTML = calcresult(jugador, opcionmaquina);
       
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
    
    }else if (jugador=== Piedra && opcionmaquina === Papel){
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
    

}

////////////Ranking////////////

getListadoMejores = async() => {

    const resp = await fetch("./mJugadores.json")
    data = await resp.json();

    data.sort((a, b) => b.puntosS - a.puntosS)

    html = ""
    data.forEach(mejores => {
        html += `
            <p><b>${mejores.nombreS}</b>: ${mejores.puntosS}</p>
        `
    });
    panelRanking.innerHTML = html

}


if(best == null){
    getListadoMejores()
}else{
    mejoresDataBase()
}


function mejoresDataBase(){

    data = best

    html = ""
    best.forEach(mejores => {
        html += `
         <b>${mejores.nombreS}</b>: ${mejores.puntosS}</p>
        `
    });
    panelRanking.innerHTML = html
    
}

function agregoMejores(){

    localStorage.removeItem("mejores")


    objMejores = {
    nombreS: jugador,
    puntosS: puntos,
    }

    let seAgrego = 0

     data.forEach(elemento => {
     
        let i = data.indexOf( elemento );

       
        if (elemento.nombreS === jugador && elemento.puntosS <= puntos){
            data.splice(i, 1)
            data.push(objMejores)
            seAgrego = 1
            return
        
        } else if(elemento.nombreS == jugador && elemento.puntosS>= puntos){
            seAgrego = 1
            return
        }
    })

      if (seAgrego == 0) {
        data.push(objMejores)
    }

    
    localStorage.setItem("mejores", JSON.stringify(data))


    html = ""
    data.forEach(mejores => {
        html += `
            <b>${mejores.nombreS}</b>: ${mejores.puntosS}</p>
        `
    });
    panelRanking.innerHTML = html

}


///////Musica//////////
function sonido(){
    const sonido=new Audio('./audio/man-is-he-mega-glbml-22045.mp3');
    sonido.loop = true;
    sonido.play();
    sonido.volume=0.2;
}

//////timpo//////
function timer() {
    let tiempo = 5;

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
agregoMejores ();

finJuego = () => {
    document.getElementById("end-game").className = 'fin-juego fin-juego--open';
    document.getElementById("Piedra").setAttribute('disabled', '');
    document.getElementById("Papel").setAttribute('disabled', '');
    document.getElementById("Tijera").setAttribute('disabled', '');
    const nombreJugador = document.getElementById("jugadornombre").innerHTML

    if(contadorm === 0 && contadorj === 0) {
        document.getElementById("end-game").innerHTML += '<div class="fin-juego--text">El tiempo se ha acabado y no has jugado</div>';
        document.getElementById("end-game").innerHTML += `<div class="fin-juego--text">${nombreJugador} has perdido</div>`
    } else if(contadorm > contadorj) {
        document.getElementById("end-game").innerHTML += `<div class="fin-juego--text">${nombreJugador} has perdido</div>`
    } else if(contadorm < contadorj) {
        document.getElementById("end-game").innerHTML += `<div class="fin-juego--text">${nombreJugador} has ganado!!</div>`
    } else {
        document.getElementById("end-game").innerHTML += `<div class="fin-juego--text">${nombreJugador} has Empatado</div>`;
    }

    document.getElementById("end-game").innerHTML += '<button id="end-game-close">Cerrar</button>'
    document.getElementById("end-game-close").addEventListener('click', () => {
        resetGame();
        initGame();
    })
    document.getElementById("end-game").innerHTML += '<button id="end-game-reset">Reiniciar</button>'
    document.getElementById("end-game-reset").addEventListener('click', () => {
        resetGame();
        gameMain();
    })
}


resetGame = () => {
    contadorj= 0;
    contadorm= 0;
    document.getElementById ("Contadorm").innerHTML = contadorm;
    document.getElementById ("Contadorj").innerHTML = contadorj;
    document.getElementById("end-game").className = 'fin-juego hide';
    document.getElementById("end-game").innerHTML = 'PARTIDA TERMINADA'
    document.getElementById("Piedra").removeAttribute('disabled');
    document.getElementById("Papel").removeAttribute('disabled');
    document.getElementById("Tijera").removeAttribute('disabled');
}
