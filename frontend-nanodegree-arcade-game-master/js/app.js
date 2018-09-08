// Enemies our player must avoid
let Enemy = function(x,y,speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.speed * dt;
  // Update the enemy's position, required method for game

  if (this.x > 600){
    this.x=-100;
    this.speed = 500 * Math.random()
  }
  else if (this.x > player.x-40 && this.x < player.x+30 && this.y == player.y){
      this.x=-80;
      player.x=200;
      player.y=400;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
  }

  update(){
    if (this.y == -25){
        // player.x=200;
        // player.y=400;
        clearInterval(timer);
    //display message upon game completion.
        const finish = document.querySelector("#end");
        finish.style.display = "block";
        const finMsg = finish.querySelectorAll("p");
        const playAgain = finish.querySelector(".again");
        playAgain.addEventListener("click" , function(){
          finish.style.display = "none";
          images.style.display = "block";
        });
     }
  }

  render(){
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyCode){
    if (keyCode == 'left' && this.x>0){
      this.x = this.x - 100;
    }
    else if (keyCode == 'up' && this.y>0){
      this.y = this.y - 85;
    }
    else if (keyCode == 'down' && this.y<400){
      this.y = this.y + 85;
    }
    else if (keyCode == 'right' && this.x<400){
      this.x = this.x + 100;
    }
  }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


let allEnemies = [];
let allEnemy = function(){
  let i=0; y=60;
  while(i<4 && y<300){
    allEnemies.push(new Enemy(-80,y,500 * Math.random()));
    i++;
    y=y+85;
  }
}
let player = new Player(-100,-100);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Start button to choose the player and start the game

let start = document.querySelector('.start');
let images = document.querySelector('#player');
start.addEventListener('click' , function(){
  images.style.display="block";
})


//code for choosing a player icon to start game

let select = [...document.querySelectorAll('.img')];
for (let img of select){
  img.addEventListener('click' , function(){
    images.style.display="none";
    allEnemies = [];
    allEnemy();
    setTimeout(allEnemy,5000);
    timer();
    player.sprite = img.getAttribute('src');
    player.x=200;
    player.y=400;

  });
}

//code for restart or refreshing the game.

let reStart = document.querySelector(".restart");
reStart.addEventListener('click' , function(){
  clearInterval(timer);
  timer();
  player.x=200;
  player.y=400;
});

let timep = document.querySelector('.timer');


let sec=0,min=0,hr=0;
function add(){
  sec++;
  if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
              min = 0;
              hr++;
        }
    }
    timep.textContent = (hr ? (hr > 9 ? hr : "0" + hr) : "00") + ":" + (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (sec > 9 ? sec : "0" + sec);

}

function timer() {
    setInterval(add, 1000);
}
