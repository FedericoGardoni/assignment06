var myData;
var people = [];
var incrementX;
var ita;
var rus;
var usa;
var nazione;
var morto = false;


function preload() {
  myData = loadJSON('assets/peopleinspace.json');
  ita = loadImage("./assets/ita.png")
  usa = loadImage("./assets/usa.png")
  rus = loadImage("./assets/rus.png")
}

function setup() {
  var vita = 3;
  createCanvas(500, 500);

  //print(myData);
  for (var i = 0; i < myData.people.length; i++) {
    var astroData = myData.people[i];
    //print(astroData);
    var newAstronaut = new Astronaut(astroData.launchdate, astroData.name, astroData.title, astroData.country);
    people.push(newAstronaut);
  }
}

function draw() {

  background(20);

  push();
  fill(60);
  ellipse(250, -430, 1300);
  fill(150, 150, 250);
  ellipse(250, -430, 1000);
  pop();
  // people.length
  for (var i = 0; i < people.length; i++) {
    var astronaut = people[i];
    astronaut.move();
    astronaut.display();
  }

  if (morto == true) {
    background(0, 0, 0);
    push();
    textSize(50);
    fill(200);
    textStyle(BOLD)
    text("GAME OVER", width / 2, height / 2);
       textStyle(ITALIC)
        textSize(22);
    text("Houston, we have a problem." + this.name, width / 2, height / 2+40)
    pop();
  } 
  push()
  textSize(16);
  fill(240);
  textAlign(RIGHT)
  text("Astronauts are falling on earth!", 480, 470);
  text("More days on space --> More chance", 480, 490)
  pop()

}

function Astronaut(launchDate, name, title, country) {
  var vita = 3;
  this.name = name;
  this.title = title;
  this.country = country;
  // transform the launch date from String
  // to a date Object calculated in milliseconds
  this.launchDate = Date.parse(launchDate);
  // calculate the time spent in space
  var timeInSpace = Date.now() - this.launchDate;
  // define radius according to the time spent in space
  this.radius = floor(timeInSpace / (1000 * 60 * 60 * 24)) / 5;
  print(this.radius)


  this.x = random(this.radius, width - this.radius);
  this.y = random(this.radius, height - this.radius) / 6 + 5 * height / 6 - 10;

  this.incrementX = (random() * 2.5) - 1;
  this.incrementY = 20 / (this.radius);
  mousePremuto = false;

  this.display = function() {

    if (this.title == 'commander') {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    //ellipse(this.x, this.y, this.radius * 2);
    //image(ita,this.x,this.y)

    switch (this.country) {
      case "italy":
        nazione = ita;
        break;
      case "russia":
        nazione = rus;
        break;

      case "usa":
        nazione = usa;
        break;
      default:
        nazione = usa;
    }
    image(nazione, this.x, this.y)
    text (this.name,this.x-this.radius,this.y-this.radius)



    fill(0);
    textAlign(CENTER);
    text(this.country, this.x, this.y + this.radius + 15);

    //contatto terra
    if (this.y <= 200) {
      background(255, 0, 0, 30);
      this.incrementY -= 0.1;
      if (this.x <= 250) {
        this.incrementX = 1
      } else {
        this.incrementX = -1
      }
      push()
      textFont('Verdana');
      textStyle(ITALIC)
      textSize(20);
      fill(240);
      text("An astronaut is being attracted by earth!", 250, 400);
      textSize(30);
      textStyle(BOLD);
      text("CLICK SOMEWHERE OMG", 250, 440);
      pop();
    }
    

    push();
    fill(255, 100, 100);
    textSize(23);
    textStyle(BOLD);
    textAlign(LEFT);
    text("Vite: " + vita, 20, 480);
    pop();


    if (mouseIsPressed) {
      if (mouseButton == 'left') {
        if(this.y <=200) {
          this.incrementY += 1;
        }
        else {
          this.incrementY += 0.3;
        }
        fill(40)
        ellipse(mouseX,mouseY,60);

      } else if (mouseButton == 'right') {
        //text(this.name, this.x, this.y + this.radius / 8 + 5);
          //background(255,200,99)
    }
    }


    }

    this.move = function() {

      this.x += this.incrementX;
      this.y += this.incrementY;

      if (this.x > width - this.radius || this.x < this.radius) {
        this.incrementX *= -1
          //print(this.x);
          //print(this.radius);
      }

      if (this.y > height - this.radius) {
        this.incrementY *= -1
          //print(this.y);
          //print(this.radius);
      }

      if (this.y < this.radius && vita >= 1) {
        vita = vita - 1;
        if (vita > 1) {
          this.incrementY *= -1/2;
        } else {
          this.remove
        }
      }
      if (vita < 1) {
        vita = "Sei Morto!";
        morto = true;
      }
    }





   


  }

  