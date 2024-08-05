class World {

    character = new Character();  
    throwableObjects = [ ];

    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusHealth;
    statusCoins;
    statusBottles;
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.statusBottles = new StatusBottles();
        this.statusCoins = new StatusCoins(this.statusBottles);
        this.statusHealth = new StatusHealth();

        this.draw();
        this.setWorld();
        this.run();
    }

    

    /**
     * Übergabe der World-Funktionen an Character.
     * Relevant für Keyboard-Übergabe
     */
    setWorld() { 
        this.character.world = this;
    }


    //COLLISIONS
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.collectBottles();
            this.collectCoins();
            this.checkThrowObjects();
        }, 200);
    };

    checkCollisions() {
     this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
         this.character.hit();
         this.statusHealth.setPercentage(this.character.energy);

         console.log(this.character.energy);
        }
     });
    };

    collectCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                coin.y = -1000;
                this.statusCoins.currentCoins++;
                this.statusCoins.updateCoinBar();
                console.log('coin');
             }
        })
    }

    collectBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                bottle.y = -1000;
                if (this.statusBottles.currentBottles < 5) {
                    this.statusBottles.currentBottles++;
                    this.statusBottles.updateBottleBar();    
                }
                this.statusBottles.animateBottleEffect();
             }
        })
    }

    checkThrowObjects() {
        if(this.keyboard.THR && this.statusBottles.currentBottles > 0) {
            let bottle = new ThrowableObject(this.character.x +60, this.character.y +100);
            this.throwableObjects.push(bottle);
            this.statusBottles.currentBottles--;
            this.statusBottles.updateBottleBar();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // X-Achse verschiebt sich für alle Elemente dazwischen
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.bgObjects);
        //this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        
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
