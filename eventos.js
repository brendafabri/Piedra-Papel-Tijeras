PiedraBTN.addEventListener("click",()=>{
    jugar(Piedra);
});

PapelBTN.addEventListener("click", () =>{
    jugar(Papel);
 });
 
TijeraBTN.addEventListener("click", () =>{
    jugar(Tijera);
});

document.getElementById("ranking").addEventListener("click", () =>{
    panelRanking.classList.toggle('hide');
});