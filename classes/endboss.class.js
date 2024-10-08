class Endboss extends MovableObject {
    
    x = 4000; 
    y = 68;
    width = 348;  
    height = 406;  

    collisionBox = {
        offsetX: 25,
        offsetY: 60,
        widthAdjustment: 35,
        heightAdjustment: 70
    };

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    speed = 0.15 + Math.random() * 1;
    isHurt = false;
    isDead = false;
    animationStarted = false;
    world;
    alertSound = new Audio('audio/alert2.wav');
    

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
        this.winSound = null;
        this.screamSound = null;
    };

    /**
     * Starts the animation of the endboss when the character reaches x = 3200.
     */
    animate() {
        this.checkCharacterPositionInterval = setInterval(() => {
            if (this.world && this.world.getCharacterX && this.world.getCharacterX() >= 3200 && !this.animationStarted) {
                this.animationStarted = true;
                this.playAlertSound();
                this.startAnimation();
            };
        }, 100);
    };

    /**
     * Stops the background music when the endboss comes in and restarts it after the alert animation.
     */
    playAlertSound() {
        pauseBackgroundMusic(); 
        this.alertSound.volume = globalVolume * 2; 
        this.alertSound.play();

        this.alertSound.onended = () => {
            restartBackgroundMusic();
        };
    };

    /**
     * Animates the incoming endboss, then stops the alert animation and starts the walking animation.
     */
    startAnimation() {
        let alertInterval = setInterval(() => {
            this.world.characterControlEnabled = false;
            this.world.throwEnabled = false;
            this.playAnimation(this.IMAGES_ALERT);
            this.x -= 13
        }, 100); 

        setTimeout(() => {
            clearInterval(alertInterval);
            this.startFirstAttack();
        }, 3500);
    };

    /**
     * Animates the endboss walking.
     */
    startWalkingAnimation() {
        let stepCycle = [0, -4, -8, -12, -16, -20, -16, -12, -8, -4];
        let stepIndex = 0;

        this.walkingInterval = setInterval(() => {
            if (!this.isHurt && !this.isDead) {
                this.world.characterControlEnabled = true;
                this.world.throwEnabled = true;
                this.playAnimation(this.IMAGES_WALKING);
                this.x += stepCycle[stepIndex];
                stepIndex = (stepIndex + 1) % stepCycle.length;
            };
        }, 150);
    };

    /**
     * Animates the hurt endboss.
     */
    hurt() {
        this.isHurt = true;
        this.clearTimeoutsIntervals();
        this.playBottleBreakSound();
        
        this.hurtInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 100);

        this.startAttack();
    };

    /**
     * Clears every timeout and interval, so that another one can start.
     */
    clearTimeoutsIntervals() {
        clearTimeout(this.hurtTimeout); 
        clearTimeout(this.attackTimeout); 
        clearInterval(this.walkingInterval);
        clearInterval(this.hurtInterval); 
        clearInterval(this.attackInterval); 
    };

    /**
     * Play the sound of a breaking bottle on endboss.
     */
    playBottleBreakSound() {
        let bottleBreakSound = new Audio('audio/bottle_break.mov');
        bottleBreakSound.volume = globalVolume;
        bottleBreakSound.play();
    };

    /**
     * Automatically starts attack animation after hurt status.
     */
    startAttack() {
        this.hurtTimeout = setTimeout(() => {
            clearInterval(this.hurtInterval);
            this.attack();
        }, 500);
    };

    /**
     * Automatically starts attack animation after entry.
     */
    startFirstAttack() {
        setTimeout(() => {
            this.attack();
        }, 100);
    }

    /**
     * Runs attack animation
     */
    attack() {
        this.playAttackAnimation();
        this.setAttackTimout();
    };

    /**
     * Animates attack interval.
     */
    playAttackAnimation() {
        let i = 0;
        this.attackInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_ATTACK[i]];
            i++;
            this.x -= 50;
            if (i >= this.IMAGES_ATTACK.length) {
                i = 0;
            }
        }, 80);
    };

    /**
     * Ends attack animation and restarts walking animation.
     */
    setAttackTimout() {
        this.attackTimeout = setTimeout(() => {
            clearInterval(this.attackInterval);
            this.isHurt = false;
            this.startWalkingAnimation(); 
        }, 500);
    };

    /**
     * Animates the end of the game after beating the endboss.
     */
    dead() {
        this.isDead = true;
        this.clearTimeoutsIntervals();

        let deadInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 100);

        this.stopBgMusic();
        this.playWinSound();

        this.gameWon(); 
    };

    /**
     * Starts winning melody.
     */
    playWinSound() {
        this.winSound = new Audio('audio/win.mov');
        this.screamSound = new Audio('audio/endboss_scream.mp3');
        this.winSound.volume = globalVolume * 0.5;
        this.screamSound.volume = globalVolume * 0.5;
        this.winSound.play();
        this.screamSound.play();
    }

    stopWinSound() {
        if (this.winSound) {
            this.winSound.pause();
            this.winSound.currentTime = 0;
        }
    }

    /**
     * Calls the win screen and the play again button.
     */
    gameWon() {
        setTimeout(() => {
            this.isDead = false;
            this.world.showWinScreen();
            this.showPlayAgain();
        }, 1000); 
    };

    /**
     * Defines Endboss action when character is dead.
     */
    gameOverAnimation() {
        this.clearTimeoutsIntervals();
        this.world.characterControlEnabled = false;
        this.world.throwEnabled = false;
        this.playAnimation(this.IMAGES_ALERT);
    };
};