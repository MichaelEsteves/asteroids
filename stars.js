function Stars(count) {
    this.count = count;
    this.maxSize = 5;
    this.minSize = 1;
    this.maxBrightness = 0.8;
    this.minBrightness = 0.2;
    this.stars = [];

    for (var i = 0; i < this.count; i++) {
        this.stars.push({
            x: random(width),
            y: random(height),
            brightness: random(this.minBrightness, this.maxBrightness),
            size: random(this.minSize, this.maxSize),
        });
    }
    

    this.render = function () {
        for (var i = 0; i < this.stars.length; i++) {
            fill('rgba(255,255,255, ' + this.stars[i].brightness + ')');
            ellipse(this.stars[i].x, this.stars[i].y, this.stars[i].size);
        }
    }

}