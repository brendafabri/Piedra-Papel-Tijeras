function initGame () { 
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
    /* Guardar para el raking */
    if (result.isConfirmed) {
      initGame();
    }
  })
}

//este es el css del popup

//.swal2-title {
//  position: relative;
//  max-width: 100%;
//  margin: 0;
//  padding: 1.8em 1em 0;
//  color: inherit;
//  font-size: 17px;
//  font-weight: 600;
//  text-align: center;
//  text-transform: none;
//  word-wrap: break-word;
//}