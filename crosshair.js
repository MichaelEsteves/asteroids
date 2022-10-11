function Crosshair(){
    this.color = color(50, 255, 50);
    this.activeColor = color(255, 50, 50);
    this.scale = 15;
    
    this.update = function(){
        push();
        strokeWeight(1);
        stroke(this.color);
        noFill();
        ellipse(mouseX, mouseY, this.scale);
        pop();
    }
    
}