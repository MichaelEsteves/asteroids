function Asteroid(x, y, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.size = 72;
    this.scale = random(0.5, 1.5);
    this.scaledSize = this.scale * this.size;
    this.rotateSpeed = random(-2, 2);
    this.rotationDegrees = 0;
    //sprite
    this.step = 1;
    this.spriteSpeed = 4;
    this.spriteCounter = 1;
    this.maxStep = 18;
    this.spriteSize = 72;
    this.cols = 5;
    this.rows = 4;
    this.col = 0;
    this.row = 0;


    this.update = function () {
        this.rotationDegrees += this.rotateSpeed;
        if (this.rotationDegrees > 360) {
            this.rotationDegrees = this.rotationDegrees - 360;
        } else if (this.rotationDegrees < -360) {
            this.rotationDegrees = this.rotationDegrees + 360;
        }
        push();
        translate(this.x - this.scaledSize, this.y - this.scaledSize);
        rotate(this.rotationDegrees);
        
        var posx = this.col * this.spriteSize;
        var posy = this.row * this.spriteSize;
        
//        rect(-(this.scaledSize / 2), -(this.scaledSize / 2), this.scaledSize, this.scaledSize);
        image(
                asteroidSprite, //img source
                -(this.scaledSize / 2), -(this.scaledSize / 2), //destination position
                this.scaledSize, this.scaledSize, //destination size
//                this.col * this.size, this.row * this.size, //source position
                posx, posy, //source position
                this.size, this.size //source size
                );
        pop();
        
        if(this.spriteCounter == this.spriteSpeed){
            this.col++;
            this.step++;
            if (this.step % this.cols == 0) {
                this.row++;
                this.col = 0;
            }

            if(this.step == this.maxStep+1){
                //reset everything
                this.step = 1;
                this.col = 0;
                this.row = 0;
            }
            
            this.spriteCounter = 0;
        }
        
        
        
        this.spriteCounter++;

        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    this.isHit = function () {
        var hit = false;
        for (var i = 0; i < lasers.length; i++) {
            var d = int(dist(this.x - this.scaledSize, this.y - this.scaledSize, lasers[i].x, lasers[i].y));

            if (d < (this.scaledSize / 2)) {
                hit = true;
                lasers.splice(i, 1);
            }
        }

        return hit;
    }
}