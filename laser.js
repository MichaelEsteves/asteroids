function Laser(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.orientation = atan2(targetY - this.y, targetX - this.x) + 90;
    this.img = random(laserSprite);
    this.speed = 15;
    this.length = 68;
    this.width = 26;
    this.xDirection = (targetX > x) ? "right" : "left";
    this.yDirection = (targetY > y) ? "down" : "up";

    //sprite
    this.step = 1;
    this.spriteSpeed = 2;
    this.spriteCounter = 1;
    this.maxStep = 5;
    this.spriteHeight = 68;
    this.spriteWidth = 26;
    this.cols = 5;
    this.rows = 1;
    this.col = 0;
    this.row = 0;

    var xDif = abs(targetX - x);
    var yDif = abs(targetY - y);
    var totalDif = xDif + yDif;
    var xPercent = Math.round(xDif / totalDif * 100) / 100;
    var yPercent = Math.round((1 - xPercent) * 100) / 100;

    this.xspeed = (this.xDirection == "left") ? -(this.speed * xPercent) : this.speed * xPercent;
    this.yspeed = (this.yDirection == "up") ? -(this.speed * yPercent) : this.speed * yPercent;

    this.fire = function () {
        push();
//        fill(255, 0, 0);
        translate(this.x, this.y);
        rotate(this.orientation);
        var posx = this.col * this.spriteWidth;
        var posy = 0;
//        rect(0, 0, this.width, this.length);
        image(
                this.img, //img source
                -(this.width), -(this.width), //destination position
                this.width*1.5, this.length*1.5, //destination size
                posx, posy, //source position
                this.spriteWidth, this.spriteHeight //source size
                );
        
        if(this.spriteCounter == this.spriteSpeed){
            this.col++;
            this.step++;

            if(this.step == this.maxStep+1){
                //reset everything
                this.step = 1;
                this.col = 0;
                this.row = 0;
            }
            
            this.spriteCounter = 0;
        }
        
        
        
        this.spriteCounter++;
        this.y += this.yspeed;
        this.x += this.xspeed;
        pop();
    }

}
