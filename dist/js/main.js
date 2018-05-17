"use strict";

var level = document.getElementById("level");
var highest = document.getElementById("high");
// constructor for the enemies
var Enemy = function Enemy(x, y, speed) {

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
//To increase the positionof enemies with respect to time.
Enemy.prototype.update = function (dt) {
    this.x = this.x + this.speed * level.textContent * dt;
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
var Player = function Player(x, y) {
    this.x = x, this.y = y, this.sprite = 'images/char-boy.png';
};
// function to increase the levels , to check the highest level and to restart the game as the player reach the end point. 
Player.prototype.update = function () {
    if (player.y < 50) {
        level.textContent++;
        if (level.textContent > highest.textContent) {
            highest.textContent++;
        }
        //Winning is the text displayed as the player reaches the final point.
        var winning = document.getElementById("won");
        winning.style.display = "flex";
        player.x = 200;
        player.y = 460;
        won = true;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// THis function helps to use the keys for the movement of the player.
Player.prototype.handleInput = function (direction) {
    var winning = document.getElementById("won");

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
};
// The enemies and players with their particular initial positions.
var enemy1 = new Enemy(200, 220, 100);
var enemy2 = new Enemy(100, 140, 200);
var enemy3 = new Enemy(150, 50, 240);
var enemy4 = new Enemy(80, 295, 50);
var enemy5 = new Enemy(220, 390, 70);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
var player = new Player(200, 460);

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
'use strict';

var Engine = function (global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 707;
    doc.body.appendChild(canvas);

    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;

        win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
    }

    function updateEntities(dt) {
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {

        var rowImages = ['images/water-block.png', // Top row is water
        'images/stone-block.png', // Row 1 of 3 of stone
        'images/stone-block.png', // Row 2 of 3 of stone
        'images/stone-block.png', // Row 3 of 3 of stone
        'images/stone-block.png', // Row 1 of 2 of grass
        'images/stone-block.png', // Row 2 of 2 of grass
        'images/grass-block.png'],
            numRows = 7,
            numCols = 8,
            row,
            col;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {

                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {

        allEnemies.forEach(function (enemy) {
            enemy.render();
        });

        player.render();
    }

    function reset() {}

    Resources.load(['images/stone-block.png', 'images/water-block.png', 'images/grass-block.png', 'images/enemy-bug.png', 'images/char-boy.png', 'images/Star.png']);
    Resources.onReady(init);

    global.ctx = ctx;
}(undefined);
"use strict";

(function () {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    function load(urlOrArr) {
        if (urlOrArr instanceof Array) {

            urlOrArr.forEach(function (url) {
                _load(url);
            });
        } else {

            _load(urlOrArr);
        }
    }

    function _load(url) {
        if (resourceCache[url]) {

            return resourceCache[url];
        } else {

            var img = new Image();
            img.onload = function () {

                resourceCache[url] = img;

                if (isReady()) {
                    readyCallbacks.forEach(function (func) {
                        func();
                    });
                }
            };

            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        var ready = true;
        for (var k in resourceCache) {
            if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();