let height = 0
let width = 0
let vidas = 1
let tempo = 15

let criaMosquitoTempo = 1500

let nivel = window.location.search
nivel = nivel.replace("?", "")

if(nivel === "normal") {
    criaMosquitoTempo = 1500
} else if(nivel === "dificil") {
    criaMosquitoTempo = 1000
} else if(nivel === "chucknorris") {
    criaMosquitoTempo = 750
}

// Aqui recuperamos a altura e a largura da página
function ajustarTamanhoPalcoJogo(){
    height = window.innerHeight
    width = window.innerWidth
}

ajustarTamanhoPalcoJogo()


//Cronometro para término do jogo
let cronometro = setInterval(function() {
    tempo -= 1

    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = "vitoria.html"
    } else {
        document.querySelector("#cronometro").innerHTML = tempo 
    }   
}, 1000)

function posicaoRandomica() {

    //Removendo o mosquito anterior (caso exista)
    if (document.querySelector("#mosquito")){
        document.querySelector("#mosquito").remove()

        if (vidas > 3) {
            window.location.href = "fim-de-jogo.html"
        } else {
            document.querySelector("#v" + vidas).src="imagens/coracao_vazio.png"
            vidas++
        }
    }

    //Criação de valores randomicos
    let posicaoX = Math.floor(Math.random() * width) - 90
    let posicaoY = Math.floor(Math.random() * height) - 90

    //Verificamos se a posição for menor que zero, se for recebe 0, senão recebe ela mesma
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    //Criação do elemento HTML, utilizando o DOM
    let mosquito = document.createElement("img")
    mosquito.src = "imagens/mosquito.png"
    mosquito.alt = "Imagem Mosquito"
    mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio()
    mosquito.style.left = posicaoX + "px"
    mosquito.style.top = posicaoY + "px"
    mosquito.style.position = "absolute"
    mosquito.id = "mosquito"
    mosquito.onclick = function() {
        this.remove()
    }

    document.body.appendChild(mosquito)

}

//Criando tamanhos aleatórios para o mosquito
function tamanhoAleatorio() {
    let classe = Math.floor(Math.random() * 3)
    
    switch(classe) {
        case 0: 
            return "mosquito1"
        case 1:
            return "mosquito2"
        case 2: 
            return "mosquito3"
    }
}

//Invertendo o lado da imagem
function ladoAleatorio() {
    let classe = Math.floor(Math.random() * 2)
    switch(classe) {
        case 0:
            return "ladoA"
        case 1:
            return "ladoB"
    }
}

//Criamos um intervalo de tempo para remover o mosquito
let criaMosquito = setInterval(function() {
    posicaoRandomica()
}, criaMosquitoTempo)
