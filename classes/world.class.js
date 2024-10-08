class World {

    character = new Character();  
    throwableObjects = [];
    level = null;
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
    throwEnabled = true;

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
    };

    /**
     * Just returns the current x-value of the character.
     * @memberof World
     * @returns the current x-value of the character
     */
    getCharacterX() {
        return this.character.x;
    };

    /**
     * Passing the world functions to character. Relevant for keyboard passing.
     */
    setWorld() { 
        this.character.world = this;
    };

    /**
     * This function is checking for collisions and actions. It is run on 60 frames per second.
     */
    run() {
        setInterval(() => {
            if (this.level) {
                this.checkCollisions();
                this.collectBottles();
                this.collectCoins();
                this.checkThrowObjects();
            }
        }, 1000 / 60);
    };

    /**
     * This function adds the enemies or the enboss to an array, if colliding with the character. 
     * Then it calls the action. 
     * isColliding() is defined in movable-object.class.js
     */
    checkCollisions() {
        let enemiesToDefeat = [];
    
        [...this.level.enemies, ...this.level.endboss].forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.addEnemyToDefeat(enemiesToDefeat, enemy);
            }
        });    
    
        this.handleDefeatedEnemies(enemiesToDefeat);
    };

    /**
     * This function seperates if the enemy is killed when jumped upon it 
     * or the character gets hurt when running into it.
     * @param {array} enemiesToDefeat 
     * @param {object} enemy 
     */
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
    };

    /**
     * Defines a time in which the character is invulnerable after killing an enemy.
     * Otherwise, the character would be also hurt when killing the enemy.
     * @param {number} duration 
     */
    setInvulnerability(duration) {
        this.invulnerability = true;
        setTimeout(() => {
            this.invulnerability = false;
        }, duration);
    };

    /**
     * Defines the action when the character gets hurt. Sound playing and energy level decreasing.
     */
    characterHurt() {
        this.character.hit();
        this.character.jump(-20, 5);
        let hurtSound = new Audio('audio/hurt.mp3');
        hurtSound.volume = globalVolume * 1.5; 
        hurtSound.play();
        this.statusHealth.setPercentage(this.character.energy);
    }; 

    /**
     * Defines the action after killing an enemy. defeat() animates the enemy and the character bounces away.
     * @param {array} enemiesToDefeat 
     */
    handleDefeatedEnemies(enemiesToDefeat) {
        if (enemiesToDefeat.length > 0) {
            enemiesToDefeat.forEach(enemy => enemy.defeat());
            this.character.speedY = 20;
        }
    };

    /**
     * Defines the action after colliding with coin objects.
     * Audio is played, coin disappears, status bar is updated.
     */
    collectCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let coinSound = new Audio('audio/coin.mov');
                coinSound.volume = globalVolume * 2; 
                coinSound.play();
                coin.y = -1000;  // Setze die Münze außerhalb des Sichtfelds
                this.statusCoins.currentCoins++;
                this.statusCoins.updateCoinBar();
            }
        });
    }

    /**
     * Defines the action after colliding with bottles objects.
     * Audio is played, coin disappears, status bar is updated and animated.
     */
    collectBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                let drinkSound = new Audio('audio/slurp.mp3');
                drinkSound.volume = globalVolume;
                drinkSound.play();
                bottle.y = -1000;
                if (this.statusBottles.currentBottles < 5) {
                    this.statusBottles.currentBottles++;
                    this.statusBottles.updateBottleBar();
                }
                this.statusBottles.animateBottleEffect();
            }
        });
    };

    /**
     * Defines the action when throwing a bottle. New throwable object is created, the coordinates are defined
     * and the status bar is updated.
     */
    checkThrowObjects() {
        if (this.keyboard.THR && this.statusBottles.currentBottles > 0 && !this.throwCooldown && this.throwEnabled) {
            let bottle = new ThrowableObject(this, this.character.x + 60, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBottles.currentBottles--;
            this.statusBottles.updateBottleBar();
            this.setThrowCooldown(400); 
        }
    };

    /**
     * Defines a time in which no bottle can be thrown after the last one.
     * @param {number} duration 
     */
    setThrowCooldown(duration) {
        this.throwCooldown = true;
        setTimeout(() => {
            this.throwCooldown = false;
        }, duration);
    };

    /**
     * Calls the winning screen when killed the endboss. Character can't be moved anymore.
     */
    showWinScreen() {
        this.characterControlEnabled = false; 
        this.screen = new Screen('img/9_intro_outro_screens/win/win_2.png', 40, 0, 640); 
        this.screen.bounce();
    };

    /**
     * Calls the game over screen when killed the endboss. Character can't be moved anymore.
     */
    showLoseScreen() {
        this.characterControlEnabled = false;
        this.screen = new Screen('img/9_intro_outro_screens/game_over/game over!.png', 0, 0, 720); // Screen-Objekt erstellen
    }

    /**
     * This function draws every object onto canvas. First movable objects in between the camera translation, 
     * then static objects.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);
        this.addMovableLevelObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.addStaticObjects();
        
        this.drawFrequently();
    };

    /**
     * Draws every object that can be moved or is moved by camera motion.
     */
    addMovableLevelObjects() {
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
    };

    /**
     * Draws every object which is not moved by camera motion like status bars and screens.
     */
    addStaticObjects() {
        this.addToMap(this.statusHealth);
        this.addToMap(this.statusCoins);
        this.addToMap(this.statusBottles);
        this.addToMap(this.statusEnemy);

        if (this.screen) { 
            this.addToMap(this.screen);
        };
    };

    /**
     * Ensures that the draw-function calls itself permanently.
     */
    drawFrequently() {
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    };
    
    /**
     * General function for drawing objects. Differences between drawing the character walking left or right.
     * @param {object} mo 
     */
    addToMap(mo) {
        if (mo.backwards) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.backwards) {
            this.flipImageBack(mo);
        }
    };

    /**
     * General function for calling addToMap() for every array object.
     * @param {array} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };

    /**
     * Mirrors an object, in this case the character when walking back.
     * @param {object} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); 
        this.ctx.scale(-1, 1); 
        mo.x = mo.x * -1; 
    };

    /**
     * Re-Mirrors an object, in this case the character when walking forwards again.
     * @param {object} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    };

    /**
     * Loads all level elements included in level.js
     * @param {class} level 
     */
    setLevel(level) {
        this.level = level;
    
        this.initializeEnemiesAndBosses(this.level.enemies, 'startAnimation');
        this.initializeEnemiesAndBosses(this.level.endboss, 'animate');
    
        setTimeout(() => {
            this.run();
        }, 100);
    };

    /**
     * Clears the world with all elements, also from the level.
     */
    clearWorld() {
        this.level.enemies.forEach(enemy => {
            if (enemy.checkCharacterPositionInterval) {
                clearInterval(enemy.checkCharacterPositionInterval);
            }
            if (enemy.animationStarted) {
                enemy.animationStarted = false; 
            }
        });
    
        this.level.endboss.forEach(boss => {
            if (boss.checkCharacterPositionInterval) {
                clearInterval(boss.checkCharacterPositionInterval);
            }
            if (boss.animationStarted) {
                boss.animationStarted = false; 
            }
        });
    
        this.level.enemies = [];  
        this.level.endboss = [];  
        this.level.clouds = [];  
        this.level.bgObjects = [];  
        this.level.coins = [];  
        this.level.bottles = [];  
     
        this.throwableObjects = [];
        this.camera_x = 0;
     
        this.character = new Character(); 
        this.characterControlEnabled = true; 
        this.invulnerability = false; 
        this.throwCooldown = false; 
        this.throwEnabled = true; 
    
        this.statusBottles = new StatusBottles();
        this.statusCoins = new StatusCoins(this.statusBottles);
        this.statusHealth = new StatusHealth();
        this.statusEnemy = new StatusEnemy();
    };
    
    

    /**
     * Initializes objects, used in loadLevel().
     * @param {array} objects 
     * @param {function} animationMethod 
     */
    initializeEnemiesAndBosses(objects, animationMethod) {
        if (!Array.isArray(objects)) return;
        objects.forEach(obj => {
            obj.world = this; 
            if (obj[animationMethod]) {
                obj[animationMethod](); 
            }
        });
    }
};