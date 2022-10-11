var
        ship,
        lasers = [],
        shipImg,
        thrustImg,
        stars,
        crosshair,
        asteroids = [],
        asteroidSprite,
        asteroidSpawnFrequency = 30,
        counter = 0,
        explosionSprites,
        laserSprite = [],
        explosions = [];


function preload() {
    shipImg = loadImage("assets/ship.png");
    thrustImg = loadImage("assets/ship-thrust.png");
    asteroidSprite = loadImage("assets/asteroid1.png");
    explosionSprite = loadImage("assets/explosion.png");
    laserSprite.push(loadImage("assets/laser-big-blue.png"));
    laserSprite.push(loadImage("assets/laser-big-green.png"));
    laserSprite.push(loadImage("assets/laser-big-aqua.png"));
}

function setup() {
    noCursor();
    angleMode(DEGREES);
    createCanvas(windowWidth, windowHeight);
    stars = new Stars(200);
    ship = new Ship(shipImg, thrustImg);
    crosshair = new Crosshair();
}

function draw() {
    background(0);
    noStroke();
    stars.render();
    for (var i = 0; i < lasers.length; i++) {
        lasers[i].fire();
        if (
                lasers[i].x - lasers[i].width > width || lasers[i].x + lasers[i].width < 0 ||
                lasers[i].y - lasers[i].length > height || lasers[i].y + lasers[i].length < 0
                ) {
            lasers.splice(i, 1);
        }
    }

    if (counter == asteroidSpawnFrequency) {

        var start = random(["left", "right", "top", "bottom"]);
        var xstart = 0;
        var ystart = 0;
        var xspeed = random(1, 3);
        var yspeed = random(1, 3);
        if (start == "left") {
            xstart = -100;
            ystart = random(0, height);
            yspeed = xspeed;
        } else if (start == "right") {
            xstart = width + 100;
            xspeed = -xspeed;
            ystart = random(0, height);
            yspeed = xspeed;
        } else if (start == "top") {
            xstart = random(0, width);
            ystart = -100;
            xspeed = (random([1, 2]) == 1) ? xspeed : -xspeed;
        } else if (start == "bottom") {
            xstart = random(0, width);
            yspeed = -yspeed;
            ystart = height + 100;
            xspeed = (random([1, 2]) == 1) ? xspeed : -xspeed;
        }

        var asteroid = new Asteroid(xstart, ystart, xspeed, yspeed);
        asteroids.push(asteroid);
        counter = 0;
    }

    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].update();

        if (asteroids[i].isHit()) {
            var explosion = new Explosion(asteroids[i].x, asteroids[i].y, asteroids[i].scaledSize);
            explosions.push(explosion);
            asteroids.splice(i, 1);
            
        } else if (
                asteroids[i].x - 200 > width || asteroids[i].x + 200 < 0 ||
                asteroids[i].y - 200 > height || asteroids[i].y + 200 < 0
                ) {
            asteroids.splice(i, 1);
        }
    }
    
    for (var i = 0; i < explosions.length; i++) {
        explosions[i].explode();
        if (explosions[i].step == explosions[i].maxStep) {
            explosions.splice(i, 1);
        }
    }



    ship.show();
    crosshair.update();
    counter++;
}

function fireLaser() {
    var laser = new Laser(ship.x - (ship.width / 2), ship.y - (ship.width / 2), mouseX, mouseY);
    lasers.push(laser);
}

function mouseMoved() {
    ship.orient();
}

function mouseClicked() {
    fireLaser();
}

function keyPressed() {
    if (key == " ") {
        fireLaser();
        console.log(asteroids);
    }
}