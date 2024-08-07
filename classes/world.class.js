class World {

    character = new Character();  
    throwableObjects = [];

    level = null;  // Initial kein Level gesetzt

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusHealth;
    statusCoins;
    statusBottles;
    statusEnemy;
    screen;
    invulnerability = false;
    throwCooldown = false;
    characterControlEnabled = true;
    chickenSound = new Audio('../audio/chicken.mov');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.statusBottles = new StatusBottles();
        this.statusCoins = new StatusCoins(this.statusBottles);
        this.statusHealth = new StatusHealth();
        this.statusEnemy = new StatusEnemy();

        this.setWorld();
        this.draw();
    }

    getCharacterX() {
        return this.character.x;
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
            if (this.level) {
                this.checkCollisions();
                this.collectBottles();
                this.collectCoins();
                this.checkThrowObjects();
            }
        }, 1000 / 60);
    }

    checkCollisions() {
        let enemiesToDefeat = [];
    
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.addEnemyToDefeat(enemiesToDefeat, enemy);
                this.chickenSound.play();
            }
        });
    
        this.level.endboss.forEach((boss) => {
            if (this.character.isColliding(boss)) {
                this.addEnemyToDefeat(enemiesToDefeat, boss);
            }
        });
    
        this.handleDefeatedEnemies(enemiesToDefeat);
    }

    addEnemyToDefeat(enemiesToDefeat, enemy) {
        let thisCollisionBox = this.character.cutThisObject();
        let enemyCollisionBox = enemy.cutOtherObject(enemy);
        let characterBottom = this.character.y + this.character.height - thisCollisionBox.heightAdjustment;
        let enemyTop = enemy.y + enemyCollisionBox.offsetY;

        if (characterBottom <= enemyTop + 5 && this.character.speedY < 0) {
            enemiesToDefeat.push(enemy);
            this.setInvulnerability(50);
        } else if (!this.invulnerability) {
            this.characterHurt();
        }
    }

    setInvulnerability(duration) {
        this.invulnerability = true;
        setTimeout(() => {
            this.invulnerability = false;
        }, duration);
    }

    characterHurt() {
        this.character.hit();
        this.statusHealth.setPercentage(this.character.energy);
    }

    handleDefeatedEnemies(enemiesToDefeat) {
        if (enemiesToDefeat.length > 0) {
            enemiesToDefeat.forEach(enemy => enemy.defeat());
            this.character.speedY = 20; // Lässt den Charakter abprallen
        }
    }

    collectCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                coin.y = -1000;
                this.statusCoins.currentCoins++;
                this.statusCoins.updateCoinBar();
            }
        });
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
        });
    }

    checkThrowObjects() {
        if (this.keyboard.THR && this.statusBottles.currentBottles > 0 && !this.throwCooldown) {
            let bottle = new ThrowableObject(this, this.character.x + 60, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBottles.currentBottles--;
            this.statusBottles.updateBottleBar();
            this.setThrowCooldown(400); 
        }
    }

    setThrowCooldown(duration) {
        this.throwCooldown = true;
        setTimeout(() => {
            this.throwCooldown = false;
        }, duration);
    }

    showWinScreen() {
        this.characterControlEnabled = false; // Steuerung des Charakters deaktivieren
        this.screen = new Screen('../img/9_intro_outro_screens/win/win_2.png', 40, 0, 640); // Screen-Objekt erstellen
        this.screen.bounce(); // Bounce-Effekt starten
    }

    showLoseScreen() {
        this.characterControlEnabled = false;
        this.screen = new Screen('../img/9_intro_outro_screens/game_over/game over!.png', 0, 0, 720); // Screen-Objekt erstellen
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // X-Achse verschiebt sich für alle Elemente dazwischen
        this.ctx.translate(this.camera_x, 0);

        if (this.level) {
            this.addObjectsToMap(this.level.bgObjects);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.endboss);
        }
        
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        
        // X-Achse verschiebt sich
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusHealth);
        this.addToMap(this.statusCoins);
        this.addToMap(this.statusBottles);
        this.addToMap(this.statusEnemy);
        
        if (this.screen) { // Nur zeichnen, wenn das Screen-Objekt vorhanden ist
            this.addToMap(this.screen);
        }

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
        if (mo.backwards) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

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

    loadLevel(level) {
        this.level = level;
        this.level.enemies.forEach(enemy => {
            enemy.world = this; // Setze die world-Instanz für die Gegner
            if (enemy.startAnimation) {
                enemy.startAnimation(); // Starte die Animation nur bei loadLevel
            }
        });
        this.level.endboss.forEach(boss => {
            boss.world = this; // Setze die world-Instanz für den Endboss
            if (boss.startAnimation) {
                boss.animate(); // Starte die Animation nur bei loadLevel
            }
        });
        this.run(); // Starte das Spiel erst, wenn das Level geladen ist
    }
}
