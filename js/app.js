const level = document.getElementById("level");
const highest = document.getElementById("high");
// constructor for the enemies
var Enemy = function (x, y, speed) {

    this.x = x
    this.y = y
    this.speed = speed
    this.sprite = 'images/enemy-bug.png';
};
//To increase the positionof enemies with respect to time.
Enemy.prototype.update = function (dt) {
    this.x = this.x + this.speed * (level.textContent) * dt
    if (this.x > 550) {
        this.x = -100;
    }
    if (this.x + 40 > player.x && player.x + 40 > this.x && this.y + 40 > player.y && player.y + 40 > this.y) {
        player.x = 200;
        player.y = 460;
        level.textContent = 1;
    }
};
//to load particular images for the enemies .
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//player constructor.
const Player = function (x, y) {
    this.x = x,
        this.y = y,
        this.sprite = 'images/char-boy.png';

}
// function to increase the levels , to check the highest level and to restart the game as the player reach the end point. 
Player.prototype.update = function () {
    if (player.y < 50) {
        level.textContent++;
        if (level.textContent > highest.textContent) {
            highest.textContent++
        }
        //Winning is the text displayed as the player reaches the final point.
        const winning = document.getElementById("won");
        winning.style.display = "flex";
        player.x = 200;
        player.y = 460;
        won = true;
    }
}


Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// THis function helps to use the keys for the movement of the player.
Player.prototype.handleInput = function (direction) {
    const winning = document.getElementById("won");

    winning.style.display = "none";


    if (direction == 'left' && player.x > 50) {
        player.x -= 100;
    } else if (direction == 'up' && player.y > 0) {
        player.y -= 75;
    } else if (direction == 'down' && player.y < 465) {
        player.y += 75;
    } else if (direction == 'right' && player.x < 400) {
        player.x += 100;
    }
}
// The enemies and players with their particular initial positions.
const enemy1 = new Enemy(200, 220, 100);
const enemy2 = new Enemy(100, 140, 200);
const enemy3 = new Enemy(150, 50, 240);
const enemy4 = new Enemy(80, 295, 50);
const enemy5 = new Enemy(220, 390, 70)
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
const player = new Player(200, 460);

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});