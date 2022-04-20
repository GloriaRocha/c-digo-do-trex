//variáveis
var trex, trexImg, trexc;
var edges;
var chao, chaoImg;
var chaoinvisivel;
var nuven, nuvenImg;
var obs1,obs2,obs3,obs4,obs5,obs6;
var pontuacao = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameover, gameoverImg;
var restart, restartImg;
var pulosom,perdasom,pontosom
//pre carregamento de imagem 
function preload() {
  //carregar imagens em variáveis auxiliares
  trexImg = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexc = loadAnimation("trex_collided.png");
  chaoImg = loadImage("ground2.png");
  nuvenImg = loadImage("cloud.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  pulosom = loadSound("jump.mp3");
  perdasom =loadSound("die.mp3");
  pontosom = loadSound("checkPoint.mp3");
}

//configuração
function setup() {
  //criação da area do jogo
  createCanvas(600, 200);
  var mensagem ="gloria"
  
  chaoinvisivel = createSprite(200,190,400,10);
  chaoinvisivel.visible = false;
  //criando o trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("correndo", trexImg);
  trex.addAnimation("colizao", trexc);
  trex.scale = 0.5;

  chao = createSprite(200,180,400,20);
  chao.addImage("solo", chaoImg);
  //definindo limites
  edges = createEdgeSprites();

  //var test = Math.round (random(1,100));
  //console.log (test);
  obstaculos = new Group();
  nuves = new Group();
  trex.setCollider("circle",0,0,50);
 // trex.debug = true;
 gameover = createSprite(300,100);
 gameover.addImage(gameoverImg)
 gameover.scale = 0.5;
 gameover.visible = false;

 restart = createSprite(300,140);
 restart.addImage(restartImg)
 restart.scale = 0.5;
 restart.visible = false;
}


function draw() {
  background('white');
  console.log(mensagem);

  text("pontoação: "+ pontuacao,500,50);
if (gameState === PLAY){
chao.velocityX = -4;
pontuacao = pontuacao+Math.round(getFrameRate()/60);
if(pontuacao>0&&pontuacao%100===0){
  pontosom.play();
}
 if(chao.x<0){
    chao.x = chao.width / 2;
  }
  //pular quando a tecla de espaço for pressionada
  if (keyDown("space")&& trex.y>=160) {
    trex.velocityY = -10;
    pulosom.play();
  }
  //gravidade
  trex.velocityY = trex.velocityY + 0.5;
criarnuvens();
criarobstaculos();
if(obstaculos.isTouching(trex)){
 gameState = END;
 perdasom.play();
 
}
//console.log(frameCount);
}
else if(gameState === END){
  gameover.visible = true;
  restart.visible = true;
  chao.velocityX = 0;
  trex.velocityY = 0;
 trex.changeAnimation("colizao", trexc);
 obstaculos.setLifetimeEach(-1);
 nuves.setLifetimeEach(-1);
  obstaculos.setVelocityXEach(0);
  nuves.setVelocityXEach(0);
  if(mousePressedOver(restart)){
    reset ();
  }
}

  //colidindo
  trex.collide(chaoinvisivel);
  //trex.collide(edges[3]);
  drawSprites();
}
function reset (){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  obstaculos.destroyEach();
  nuves.destroyEach();
  trex.changeAnimation("correndo", trexImg)
  pontuacao = 0;
}
function criarobstaculos(){
  if (frameCount%60 === 0){
  var obstaculo = createSprite(610,165,10,40);
  obstaculo.velocityX = -(6+pontuacao/100);
  var sorteio = Math.round(random(1,6));
  switch(sorteio){
    case 1:obstaculo.addImage(obs1);
    break;
    case 2:obstaculo.addImage(obs2);
    break;
    case 3:obstaculo.addImage(obs3);
    break;
    case 4:obstaculo.addImage(obs4);
    break;
    case 5:obstaculo.addImage(obs1);
    break;
    case 6:obstaculo.addImage(obs6);
    break;
    default: break;
  }
  obstaculo.scale= 0.5;
  obstaculo.lifetime = 300;
  obstaculos.add(obstaculo);
}}
function criarnuvens(){
  if(frameCount%60 == 0){
nuven = createSprite(610,100,10,10);
nuven.y = Math.round(random(50,100));
nuven.velocityX = -3;
nuven.addImage("nuven",nuvenImg)
nuven.scale = 0.5;
nuven.depth = trex.depth;
trex.depth = trex.depth +1;

console.log(nuven.depth);
console.log(trex.depth);
nuven.lifetime = 220;
nuves.add(nuven);
}
}