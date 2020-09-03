const Engine = Matter.Engine,
const World = Matter.World,
const Events = Matter.Events,
const  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions= [];

var divisionHeight=300;
var count =0;

var particle;
var score=0;
var count=0;

var gameState= "play";

function setup() {

  createCanvas(480, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
       plinkos.push(new Plinko(j,375));
    }
}

function draw() {
  background("black");
  textSize(20)
  stroke(7);
  text("Score : "+count,100,60);
  //text
  text(count,40,630);
  text(count,120,630);
  text(count,200,630);
  text(count,280,630);

  Engine.update(engine);
 
  // displaying loops
   for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
   }

   for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

   if(frameCount%60===0){
     particles.push(new particle(random(width/2-30, width/2+30), 10,10));
     score++;
   }
 
  for (var j = 0; j < particles.length; j++) {
     particles[j].display();
   }

   //ground
   ground.display();

   // scoring
   	if(particle!=null) { 
       particle.display(); 
       
       if (particle.body.position.y>760) { 
         
         if (particle.body.position.x < 300) {
           score=score+500; 
           particle=null; 
           
             if ( count>= 5) gameState ="end"; 
        } 
          
    else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) {
        score = score + 100;
        particle=null; 
        
        if ( count>= 5) gameState ="end"; 
      } 
      
      else if (particle.body.position.x < 900 && particle.body.position.x > 601 ) {
        
        score = score + 200; 
        particle=null; 
        
        if ( count>= 5) gameState ="end"; 
      } 
    } 
  }

  if(gameState==="end") {
    textSize(20);
    text("GAME OVER",270,400);
  }

}

function mousePressed() {

  if(gamesState!=="end") {
     count++;
     particle= new Particle(mouseX,10,10,10);
  }
}