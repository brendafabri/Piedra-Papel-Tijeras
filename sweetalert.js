function initGame () {
  inicioRanking();
  Swal.fire({
    title: jugador,
    input: 'text',
    background: '#3c90e0',
    color:'black',
    backdrop:
    'rgba(0,0,123,0.8)',
    showCloseButton:false,
    allowOutsideClick: false,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    inputValidator: (value) => {
      if (!value) {
        return 'Debe ingresar nombre para poder jugar!'
      }
    }
  }).then((playerName) => {
    Swal.fire({
      title: `${playerName.value}, listo para empezar?`,
      text: "Si aceptas,el tiempo empieza a correr!",
      showCancelButton: true,
      confirmButtonText: 'Si, Juguemos!',
      cancelButtonText: 'No, tengo miedo!',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        gameMain(playerName.value);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        initGame();
      }
    })
  })
}
   
initGame();

abandonar.onclick = (e) => {
    Swal.fire({
    title: 'Desea Salir?',
    showCancelButton: true,
    confirmButtonText: 'Salir',
    allowOutsideClick: false,
    showClass: {
      popup: 'animate__animated animate__backInDown '
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      initGame();
    }
  })
}


function endGame(resultado, nombreJugador, puntaje) {
  let textResultado;
  switch (resultado) {
    case Empate:
      textResultado = `${nombreJugador} has empatado`
      break;
    case Perdiste:
      textResultado = `${nombreJugador} has perdido :(  Has hecho ${puntaje} puntos`
      break;
    case Ganaste:
      textResultado =  `${nombreJugador} has ganado!!  Has hecho ${puntaje} puntos`
      break;
    default:
      textResultado =  `Ha pasado el tiempo`
      break;
}

  Swal.fire({
    title: "PARTIDA TERMINADA",
    text: textResultado,
    showCancelButton: true,
    confirmButtonText: 'Reiniciar',
    cancelButtonText: 'Cerrar',
    reverseButtons: true,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      resetGame();
      gameMain(localStorage.getItem('player'));
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      resetGame();
      initGame();
    }
  })
}