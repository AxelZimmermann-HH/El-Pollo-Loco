class MovableObject extends DrawableObject {
    
    speed = 0.15;
    backwards = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;
  
     applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                // Ensure y does not go below 206
                if (this.y > 206) {
                    this.y = 206;
                    this.speedY = 0; // Reset speed when character reaches the ground
                    
                }
              }
        }, 1000 / 25);
    };
    
    isAboveGround() {
        return this.y < 206;
    };

    

    // character.isColliding(chicken)
    isColliding(mo) {
        return (this.x + this.width) >= mo.x && 
            this.x <= (mo.x + mo.width) && 
            (this.y + this.height) >= mo.y &&
            (this.y) <= (mo.y + mo.height);
    }

    hit() {
        this.energy -= 10 ;
        if(this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // diff in ms
        timepassed = timepassed /  1000; //seconds
        return timepassed < 1 ; // wird in character returned zu true
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {  
        let i = this.currentImage % images.length; // let i = 7 % 6 => 1, Rest 1, modulu behält nur den Rest!
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        this.x -= this.speed;
    };

    moveRight() {
        this.x += this.speed;
    };

    jump() {
        this.speedY = 25;
    }
}