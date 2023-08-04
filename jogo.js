console.log('Flappy Bird');

let frames = 0

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

const som_PULO = new Audio();
som_PULO.src = './efeitos/pulo.wav'

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');





// [Plano de Fundo]
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};

// [Chao]

function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      //console.log('wwww')
      
      const movimentoDoChao = 1
      const repeteEm = chao.largura / 2
      const movimentacao = chao.x - movimentoDoChao

      chao.x = movimentacao % repeteEm
    },
    desenha() {
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,
      );
  
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        (chao.x + chao.largura), chao.y,
        chao.largura, chao.altura,
      );
    },
  };
  return chao;
}



function fazColisao(flappyBird, chao){
  const flappyBirdY = flappyBird.y + flappyBird.altura
  const chaoY = chao.y

  if(flappyBirdY >= chaoY){
    return true;
  }
  return false;
}

function criaFlappyBird(){
  //cria o objeto do jogador

  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 34,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      
      flappyBird.velocidade = - flappyBird.pulo 
      som_PULO.play();
    },
    gavidade: 0.25,
    velocidade: 0,
    atualiza() {
  
      if(fazColisao(flappyBird, globais.chao)){
        console.log('fez colisao')
        som_HIT.play()

        /*setTimeout(() => {
          mudaParaTela(Telas.INICIO)
        }, 500)*/

        mudaParaTela(Telas.GAME_OVER)
        
        return
      }
  
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gavidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    movimentos: [
      {spriteX: 0, spriteY: 0,},
      {spriteX: 0, spriteY: 26,},
      {spriteX: 0, spriteY: 52,},
      {spriteX: 0, spriteY: 26,},
    ],
    frameAtual:0,
    atualizaOFrameAtual(){
      const intervaloDeFrames = 10
      const passouOIntervalo = frames % intervaloDeFrames === 0
      if(passouOIntervalo){
        const baseDoIncremento = 1
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length
        flappyBird.frameAtual = incremento % baseRepeticao
      }
      
    },
    desenha() {
      this.atualizaOFrameAtual()
      const {spriteX, spriteY} = this.movimentos[flappyBird.frameAtual]
      contexto.drawImage(
        sprites,
        spriteX, spriteY, // Sprite X, Sprite Y
        flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura,
      );
    }
  }
  return flappyBird;
}




//Mensagem inicio
const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sY,
      mensagemGetReady.w, mensagemGetReady.h, 
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w, mensagemGetReady.h
    );
  }
}

//Medalhas

function medalhas() {
  const medalha = {
    sX: 0,
    sY: 78,
    w: 44,
    h: 44,
    x: (canvas.width / 2) - 173 / 2,
    y: 137,//pos

    posicaoMedalhas: [
      {sX: 0, sY: 78,},
      {sX: 48, sY: 78,},
      {sX: 0, sY: 124,},
      {sX: 48, sY: 124,},
    ],
    ponto : globais.placar.pontuacao,
    atualizaPontos() {
      ponto = globais.placar.pontuacao
      posiMedalha = 0
      if(ponto < 3){
        posiMedalha = 0
      }else if(ponto < 6 && ponto >= 3){
        posiMedalha = 1
      }else if(ponto < 9 && ponto >= 6){
        posiMedalha = 2
      }else{
        posiMedalha = 3
      }
      
    },
    

    desenha(){
      
      
      this.atualizaPontos()
      const {sX, sY} = this.posicaoMedalhas[posiMedalha]
      //const sX = this.posicaoMedalhas[2]
      //const sY = this.posicaoMedalhas[2]
      contexto.drawImage(
        sprites,
        sX, sY,
        medalha.w, medalha.h, 
        medalha.x, medalha.y,
        medalha.w, medalha.h
      );
    }
  }
  return medalha;
}





//Mensagem de Game Over

const mensagemGameOver = {
  sX: 134,
  sY: 153,
  w: 226,
  h: 200,
  x: (canvas.width / 2) - 226 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGameOver.sX, mensagemGameOver.sY,
      mensagemGameOver.w, mensagemGameOver.h, 
      mensagemGameOver.x, mensagemGameOver.y,
      mensagemGameOver.w, mensagemGameOver.h
    );
  }
}


//Função dos canos
function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    desenha(){
      

      canos.pares.forEach(function(par) {

        const yRandom = par.y
        const espacamentoEntreCanos = 92

        //Cano do ceu
        const canoCeuX = par.x;
        const canoCeuY = yRandom;
      
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura,canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura
        )

        //Cano do Chão
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
        
        contexto.drawImage(
          sprites,
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura,canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura

        )

        par.canoCeu = {
          x: canoCeuX,
          y: canoCeuY + canos.altura,
        }
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })
    },

    temColisaoComOFlappyBird(par){

      const cabecaDoFlappy = globais.flappyBird.y
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura

      if((globais.flappyBird.x + globais.flappyBird.largura - 5) >= par.x){
        
        if(cabecaDoFlappy <= par.canoCeu.y) {
          return true
        }

        if(peDoFlappy >= par.canoChao.y) {
          return true
        }
      }
      return false;
    },

    pares: [],
    

    atualiza() {
      const passou100Frames = frames % 100 === 0
      if (passou100Frames){
        //this.pares[this.pares.length - 1].atualiza();
        console.log('passou 100')
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        })
      }

      canos.pares.forEach(function(par) {
        par.x = par.x - 2

        if (canos.temColisaoComOFlappyBird(par)){
          console.log('voce perdeu')
          som_HIT.play()
          mudaParaTela(Telas.GAME_OVER)          
        }

        if(par.x + canos.largura <= 0){
          canos.pares.shift()
        }
      })

    }
  }
  return canos;
}


//Placar
function criaPlacar() {
  const placar = {
    pontuacao: 0,
    desenha() {
      contexto.font = '30px "Press Start 2P"'
      contexto.textAlign = 'right'
      contexto.fillStyle = 'white'
      contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 40)
      //placar.pontuacao
    },
    atualiza(){
      const intervaloDeFrames = 30
      const passouOIntervalo = frames % intervaloDeFrames === 0
      
      if (passouOIntervalo){
        placar.pontuacao = placar.pontuacao + 1
      }
      
    },

    final(){
      contexto.font = '15px "Press Start 2P"'
      contexto.textAlign = 'right'
      contexto.fillStyle = '#FAAA09'
      //score
      contexto.fillText(`${placar.pontuacao}`, canvas.width - 68, 146)
      //best
      contexto.fillText(`${placar.pontuacao}`, canvas.width - 68, 186)

      
      
    },
  }
  return placar
}


//Telas

const globais = {};

let telaAtiva = {};
function mudaParaTela(novaTela){
  telaAtiva = novaTela;
  if(telaAtiva.inicializa){
    telaAtiva.inicializa();
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird() //cria o flappy bird na tela
      globais.chao = criaChao() //cria o chão na tela
      
      globais.canos = criaCanos() //cria os canos na tela
    },

    desenha(){
      planoDeFundo.desenha();
      
      globais.flappyBird.desenha();
      
      mensagemGetReady.desenha();
      
      globais.chao.desenha();
    },

    click() {
      mudaParaTela(Telas.JOGO)
    },

    atualiza(){
      globais.chao.atualiza()
      
    }
  }
};

Telas.JOGO = {

  inicializa() {
    globais.placar = criaPlacar()
  },

  desenha() {
    planoDeFundo.desenha();
    globais.canos.desenha() //desenha o cano na tela
    globais.chao.desenha();
    globais.flappyBird.desenha();
    globais.placar.desenha()
  },
  click() {
    globais.flappyBird.pula()
  },
  atualiza() {
    globais.canos.atualiza()
    globais.flappyBird.atualiza();
    globais.chao.atualiza()
    globais.placar.atualiza()
  },
}

Telas.GAME_OVER = {
  
  desenha() {


    globais.medalha = medalhas()
    mensagemGameOver.desenha()
    globais.medalha.desenha()
    globais.placar.final()
    
  },
  atualiza(){

  },
  click(){
    mudaParaTela(Telas.INICIO)
  }
}


function loop() {
  
  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1

  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if(telaAtiva.click){
    telaAtiva.click();
  }

})

mudaParaTela(Telas.INICIO);
loop();

