class MovableObject extends DrawableObject {
    speed = 0.15;
    backwards = false;
    speedY = 0;
    speedX = 0;
    accelerationX = 0.2; // Beispielwert für die horizontale Beschleunigung
    jumpInterval = null;
    acceleration = 2.5;
    lastHit = 0;

    gravityJump() {
        if (this.jumpInterval) clearInterval(this.jumpInterval); // Stoppe vorheriges Intervall, falls vorhanden
        this.jumpInterval = setInterval(() => {
            
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

                // Bewege den Charakter nach hinten
                this.x += this.speedX;
                if (this.speedX < 0) {
                    this.speedX += this.accelerationX; // Reduziere die Rückwärtsgeschwindigkeit
                }

                // Ensure y does not go below 206
                if (this.y > 206) {
                    this.y = 206;
                    this.speedY = 0; // Reset speed when character reaches the ground
                    clearInterval(this.jumpInterval); // Stoppe das Intervall
                    
                }
            } else {
                clearInterval(this.jumpInterval); // Stoppe das Intervall
                
            }
        }, 1000 / 25);
    }

    
    
    


    gravityJump2(){
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
        if (this instanceof ThrowableObject) { //Throwable objects should always fall
            return true
        } else {
            return this.y < 206;
        }
    };


    isColliding(mo) {
        const thisCollisionBox = this.cutThisObject();
        const moCollisionBox = mo.cutOtherObject(mo);
        const buffer = 5; // Adding a buffer to make collision detection more precise
    
        return (this.x + thisCollisionBox.offsetX + this.width - thisCollisionBox.widthAdjustment + buffer) >= (mo.x + moCollisionBox.offsetX) &&
               (this.x + thisCollisionBox.offsetX - buffer) <= (mo.x + moCollisionBox.offsetX + mo.width - moCollisionBox.widthAdjustment) &&
               (this.y + thisCollisionBox.offsetY + this.height - thisCollisionBox.heightAdjustment + buffer) >= (mo.y + moCollisionBox.offsetY) &&
               (this.y + thisCollisionBox.offsetY - buffer) <= (mo.y + moCollisionBox.offsetY + mo.height - moCollisionBox.heightAdjustment);
    }
    
    
    cutThisObject() {
        // Kollisionsbox-Daten für das aktuelle Objekt
        const thisOffsetX = this.collisionBox?.offsetX || 0;
        const thisOffsetY = this.collisionBox?.offsetY || 0;
        const thisWidthAdjustment = this.collisionBox?.widthAdjustment || 0;
        const thisHeightAdjustment = this.collisionBox?.heightAdjustment || 0;
        return { offsetX: thisOffsetX, offsetY: thisOffsetY, 
            widthAdjustment: thisWidthAdjustment, heightAdjustment: thisHeightAdjustment };
    }
    
    cutOtherObject(mo) {
        // Kollisionsbox-Daten für das andere Objekt
        const moOffsetX = mo.collisionBox?.offsetX || 0;
        const moOffsetY = mo.collisionBox?.offsetY || 0;
        const moWidthAdjustment = mo.collisionBox?.widthAdjustment || 0;
        const moHeightAdjustment = mo.collisionBox?.heightAdjustment || 0;
        return { offsetX: moOffsetX, offsetY: moOffsetY, 
            widthAdjustment: moWidthAdjustment, heightAdjustment: moHeightAdjustment };
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

    jump(speedX, speedY) {
        this.speedY = speedY; // Initialisieren der Sprunggeschwindigkeit
        this.speedX = speedX; // Setze eine Rückwärtsgeschwindigkeit

        // Führe die ersten Berechnungen sofort durch, um Verzögerung zu minimieren
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;

            // Bewege den Charakter nach hinten
            this.x += this.speedX;
            if (this.speedX < 0) {
                this.speedX += this.accelerationX; // Reduziere die Rückwärtsgeschwindigkeit
            }

            // Ensure y does not go below 206
            if (this.y > 206) {
                this.y = 206;
                this.speedY = 0; // Reset speed when character reaches the ground
            }
        }

        // Starte das Intervall für weitere Berechnungen
        this.gravityJump();
    }

    playEndAnimationOnce(array, speed) {
        this.loadImages(array);
            let i = 0;
            let splashInterval = setInterval(() => {
                this.playAnimation([array[i]]);
                i++;
                if (i >= array.length) {
                    clearInterval(splashInterval);
                    // Optionally, hide the object or set it to a "disappeared" state
                    this.y = -1000; // Move the object out of view
                }
            }, 1000 / speed);
    };
}