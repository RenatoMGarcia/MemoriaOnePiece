const tabuleiro = document.getElementById('tabuleiro');

const imagens = [
    'img1.png',
    'img2.png',
    'img3.png',
    'img4.png',
    'img5.png',
    'img6.png',
];

let codigoHTML = '';

let timer = 0;

imagens.forEach(img => {
    codigoHTML += `
        <div class="memory-card" data-carta="${img}">
            <img class="frente-carta" src="imgs/${img}">
            <img class"fundo-carta" src="imgs/fundo.png">
        </div>
    `;
});

tabuleiro.innerHTML = codigoHTML + codigoHTML;



const cartas = document.querySelectorAll(".memory-card");


let primeira, segunda;
let bloqueio = true;
let gameStarted = false;
const maxCartas = 6;


const contagem = [

]



function aleatoria(){
    cartas.forEach(carta => {
        let numero = Math.floor (Math.random()*12);
        carta.style.order = numero;
    });
};

function checar(){
    
    let eIgual = primeira.dataset.carta === segunda.dataset.carta?true:false;
    if(!eIgual){
        remover();

    }

    else{
        contagem.push(primeira.dataset.carta);
        console.log("contagem", contagem);
        reset(eIgual);
        if (contagem.length == maxCartas){
            pauseTimer();
        }
    }
    
}

function remover(){
    bloqueio = true;
    setTimeout(()=>{
        primeira.classList.remove("virar");
        segunda.classList.remove("virar");
        primeira.addEventListener("click", virar);
        bloqueio = false;
        primeira = null;
        segunda = null;
    },1000)
}


function virar(){
    if(bloqueio == true){
        return false;
    }
    
        this.classList.add("virar");

        if(!primeira){
            primeira = this;
            primeira.removeEventListener('click', virar);
            return false;
        }

        segunda = this;

        checar();
    

}


function reset(eIgual){
    if(eIgual) {
        primeira.removeEventListener('click', virar);
        segunda.removeEventListener('click',virar);
        bloqueio = false;
        primeira = null;
        segunda = null;
    }
}

let timerInterval;

function startTimer(){
    bloqueio = false;
    if(!gameStarted){ 
        timerInterval = setInterval(() => {
            timer++; 
            gameStarted = true;
            renderTimer();
        }, 1000);
    }
    
}

function secToMin(x) {
    let sec;
    const min = parseInt(x / 60) 
    if((x % 60) < 10){
        sec = '0' + (x % 60);
    }else {
        sec = (x % 60);
    }
    return min + ':' + sec;
};

function playAgain() {
    location.reload();
    

}




function pauseTimer(){
    clearInterval(timerInterval);
}

function renderTimer() {
    document.getElementById("timer").innerHTML = secToMin(timer);
}

aleatoria();


cartas.forEach(c => c.addEventListener('click', virar));
