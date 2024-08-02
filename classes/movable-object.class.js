class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    backwards = false;
    speedY = 0;
    acceleration = 2.5;

   
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


    loadImage(path) {
        this.img = new Image(); // image bereits vordefiniert
        this.img.src = path;
    }

    loadImages(array){
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // character.isColliding(chicken)
    isColliding(mo) {
        return (this.x + this.width) >= mo.x && 
            this.x <= (mo.x + mo.width) && 
            (this.y + this.height) >= mo.y &&
            (this.y) <= (mo.y + mo.height);
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