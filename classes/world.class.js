class World {

    character = new Character();  

    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusHealth = new StatusHealth();
    statusCoins = new StatusCoins();
    statusBottles = new StatusBottles();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    

    /**
     * Übergabe der World-Funktionen an Character.
     * Relevant für Keyboard-Übergabe
     */
    setWorld() { 
        this.character.world = this;
    }


    //COLLISIONS
    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
               if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusHealth.setPercentage(this.character.energy);
                this.statusCoins.setPercentage(this.character.energy);
                this.statusBottles.setPercentage(this.character.energy);

                console.log(this.character.energy);
               }
            });
        }, 1000);
    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // X-Achse verschiebt sich für alle Elemente dazwischen
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.bgObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        
        // X-Achse verschiebt sich
        this.ctx.translate(-this.camera_x, 0);


        this.addToMap(this.statusHealth);
        this.addToMap(this.statusCoins);
        this.addToMap(this.statusBottles);


        //draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }




    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.backwards) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.backwards) {
            this.flipImageBack(mo);
        }
    }




    flipImage(mo) {
        this.ctx.save(); //Eigenschaften gespeichert
        this.ctx.translate(mo.width, 0); // Bild spiegeln
        this.ctx.scale(-1, 1); //Verschieben nach rechts
        mo.x = mo.x * -1; // X-Koordinate spiegeln
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1; // X-Koordinate spiegeln
        this.ctx.restore();
    }
}
