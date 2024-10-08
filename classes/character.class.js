class Character extends MovableObject {

    y = 206
    width = 120;  
    height = 240;  
    speed = 5;

    collisionBox = {
        offsetX: 20,
        offsetY: 90,
        widthAdjustment: 40,
        heightAdjustment: 100
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png', 
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world; 

    walking_sound = new Audio('audio/walkingfast.mov');
    jumping_sound = new Audio('audio/jump.mp3');
    
    lastKeyPressTime = 0;
    firstDead = false;
    
    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.gravityJump();
        this.animate();
        this.startInitialIdleAnimation();
    };

    /**
     * Animates the walking and jumping of the character.
     */
    animate() {
        this.checkMovement();
        this.actionsDependingEnergy();
        this.animateIdle();
        this.animateJumpImages();
    };

    /**
     * Defines duration of idle and long idle animation and plays it.
     */
    startInitialIdleAnimation() {
        this.lastKeyPressTime = Date.now(); 

        setInterval(() => {
            const timeSinceLastKeyPress = Date.now() - this.lastKeyPressTime;
            if (timeSinceLastKeyPress > 10000) { 
                this.playAnimation(this.IMAGES_IDLE_LONG);
            } else if (timeSinceLastKeyPress > 10) { 
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 400);
    };

    /**
     * Checks if the character is moving and calls relevant events.
     */
    checkMovement() {
        setInterval(() => {
            if (this.world && this.world.characterControlEnabled) {
                this.walking_sound.pause();
                this.characterWalkRight();
                this.characterWalkLeft();
                this.characterJump();
            }
    
            if (this.world) {
                this.world.camera_x = -this.x + 50;
            }
        }, 1000 / 60);
    };

    /**
     * Calls event, if character walks right.
     */
    characterWalkRight() {
        if (this.world && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.backwards = false;
            this.walking_sound.play();
            this.walking_sound.volume = globalVolume;
            this.lastKeyPressTime = Date.now();
        };
    };
    
    characterWalkLeft() {
        if (this.world && this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.backwards = true;
            this.walking_sound.volume = globalVolume;
            this.walking_sound.play();
            this.lastKeyPressTime = Date.now();
        };
    };
    
    characterJump() {
        if (this.world && this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump(0, 25);
            this.jumping_sound.volume = globalVolume;
            this.jumping_sound.play();  
            this.lastKeyPressTime = Date.now();
        };
    };

    /**
     * Checks the energy status of the character and calls different events depending to it.
     */
    actionsDependingEnergy() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.gameOver();   
                if (this.world) {
                    this.world.throwEnabled = false;
                    this.world.characterControlEnabled = false;
                    let boss = this.world.level.endboss[0];
                    if (boss && boss.gameOverAnimation) {
                        boss.gameOverAnimation();
                    }
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (!this.isAboveGround() && this.world && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                this.playAnimation(this.IMAGES_WALKING);
            };
        }, 50);
    };

    /**
     * Calls different actions if the character is game over.
     */
    gameOver() {
        if (!this.firstDead) {
            this.world.showLoseScreen();
            this.stopBgMusic();
            this.playLoseSound();
            this.showPlayAgain();
            this.firstDead = true;
        };
    };

    /**
     * Playing the game over sound.
     */
    playLoseSound() {
        let loseSound = new Audio('audio/game-over.mp3');
        loseSound.volume = globalVolume;
        loseSound.play();
    };

    /**
     * Animates idle and long idle images.
     */
    animateIdle() {
        setInterval(() => {
            const timeSinceLastKeyPress = Date.now() - this.lastKeyPressTime;
            if (timeSinceLastKeyPress > 10000) { 
                this.playAnimation(this.IMAGES_IDLE_LONG);
            } else if (timeSinceLastKeyPress > 1) { 
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 400);
    };

    /**
     * Animates the jumping character.
     */
    animateJumpImages() {
        setInterval(() => {
            if (this.isAboveGround() && !this.isDead() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_JUMP);
            };
        }, 100);
    };
};