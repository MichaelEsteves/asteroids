function Explosion(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.step = 1;
    this.maxStep = 32;
    this.spriteSize = 128;
    this.cols = 5;
    this.rows = 7;
    this.col = 0;
    this.row = 0;

    this.explode = function () {
        if (this.step <= this.maxStep) {
            push();
            translate(this.x-this.size, this.y-this.size);

            var posx = this.col * this.spriteSize;
            var posy = this.row * this.spriteSize;

            image(
                    explosionSprite, //img source
                    -(this.size), -(this.size), //destination position
                    this.size*2, this.size*2, //destination size
                    posx, posy, //source position
                    this.spriteSize, this.spriteSize //source size
                    );
            pop();

            this.col++;
            this.step++;
            if (this.step % this.cols == 0) {
                this.row++;
                this.col = 0;
            }
        }
    }

}