function Ship(img, thrustImg) {
    this.x = width / 2;
    this.y = height / 2;
    this.width = 80;
    this.height = 100;
    this.orientation = 0;
    this.img = img;
    this.thustImg = thrustImg;
    this.activeImg = img;
    this.moveSpeed = 10;
    this.maxinertia = 100;
    this.inertia = 4;
    this.decelerateInertia = 1;
    this.xinertia = 0;
    this.yinertia = 0;
    this.xspeed = 0;
    this.yspeed = 0

    this.show = function () {
        this.move();
        this.orient();
        push();
        translate(this.x - (this.width / 2), this.y - (this.height / 2));
        rotate(this.orientation);
        image(this.activeImg, -(this.width / 2), -(this.height / 2), this.width, this.height);
        pop();
    }
    
    

    this.orient = function () {
        this.orientation = atan2(mouseY - this.y, mouseX - this.x) + 90;
    }

    this.move = function () {

        var right = 68;
        var left = 65;
        var down = 83;
        var up = 87;
        
        if(keyIsDown(right) || keyIsDown(left) || keyIsDown(up) || keyIsDown(down)){
            this.activeImg = this.thustImg;
        }else{
            this.activeImg = this.img;
        }
        

        if (keyIsDown(right)) {
            this.xinertia += this.inertia;
            this.xinertia = constrain(this.xinertia, -this.maxinertia, this.maxinertia);
        } else if (keyIsDown(left)) {
            this.xinertia -= this.inertia;
            this.xinertia = constrain(this.xinertia, -this.maxinertia, this.maxinertia);
        } else {
            if (this.xinertia > 0) {
                this.xinertia -= this.decelerateInertia;
            } else if (this.xinertia < 0) {
                this.xinertia += this.decelerateInertia;
            }
        }

        if (keyIsDown(up)) {
            this.yinertia -= this.inertia;
            this.yinertia = constrain(this.yinertia, -this.maxinertia, this.maxinertia);
        } else if (keyIsDown(down)) {
            this.yinertia += this.inertia;
            this.yinertia = constrain(this.yinertia, -this.maxinertia, this.maxinertia);
        } else {
            if (this.yinertia > 0) {
                this.yinertia -= this.decelerateInertia;
            } else if (this.yinertia < 0) {
                this.yinertia += this.decelerateInertia;
            }
        }

        if (this.xinertia !== 0) {
            this.x += (this.moveSpeed * this.xinertia / 100);
        }

        if (this.yinertia !== 0) {
            this.y += (this.moveSpeed * this.yinertia / 100);
        }

        this.x = constrain(this.x, this.height, width);
        this.y = constrain(this.y, this.height, height);
    }

}