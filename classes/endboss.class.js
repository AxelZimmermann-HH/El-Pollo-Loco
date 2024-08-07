class Endboss extends MovableObject {
    x = 1500; //überschreibt die Koordinate aus movableObject
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
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_HURT = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    IMAGES_ATTACK = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'
    ]
    speed = 0.15 + Math.random() * 1;
    isHurt = false;
    isDead = false;
    animationStarted = false;
    
    world;
    alertSound = new Audio('../audio/alert2.wav');
    bottleBreakSound = new Audio('../audio/bottle_break.mov');

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
        // this.animate();
    }

    animate() {
        this.checkCharacterPositionInterval = setInterval(() => {
            if (this.world && this.world.getCharacterX && this.world.getCharacterX() >= 700 && !this.animationStarted) {
                this.animationStarted = true;
                this.playAlertSound();
                this.startAnimation();
            }
        }, 100); // Überprüft alle 100ms die Charakterposition
    }

    playAlertSound() {
        pauseBackgroundMusic(); // Hintergrundmusik pausieren
        this.alertSound.play();

        // Wiederaufnahme der Hintergrundmusik nach Ende des Sounds
        this.alertSound.onended = () => {
            restartBackgroundMusic();
        };
    }

    startAnimation() {
        let alertInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
            this.x -= 13
        }, 100); // Setze die Frame-Dauer für die Alert-Animation

        setTimeout(() => {
            clearInterval(alertInterval);
            this.startWalkingAnimation();
        }, 3500); // 5 Sekunden Alert-Animation
    }

    startWalkingAnimation() {
        let stepCycle = [0, -4, -8, -12, -16, -20, -16, -12, -8, -4];
        let stepIndex = 0;

        this.walkingInterval = setInterval(() => {
            if (!this.isHurt && !this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
                this.x += stepCycle[stepIndex];
                stepIndex = (stepIndex + 1) % stepCycle.length; // Schrittzyklus inkrementieren und zurücksetzen
            }
        }, 150);
    }

    hurt() {
        this.isHurt = true;
        this.clearTimeoutsIntervals();
        this.bottleBreakSound.play();
        this.hurtInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 100);

        this.hurtTimeout = setTimeout(() => {
            clearInterval(this.hurtInterval);
            this.attack();
        }, 2000);
    }

    clearTimeoutsIntervals() {
        clearTimeout(this.hurtTimeout); // Reset the hurt timeout if it's already running
        clearTimeout(this.attackTimeout); // Reset the attack timeout if it's already running
        clearInterval(this.walkingInterval);
        clearInterval(this.hurtInterval); // Reset hurt interval
        clearInterval(this.attackInterval); // Reset attack interval
    }

    attack() {
        this.playAttackAnimation();
        this.setAttackTimout();
         // Attack animation for 2 seconds
    }

    playAttackAnimation() {
        let i = 0;
        this.attackInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_ATTACK[i]];
            i++;
            this.x -= 15;
            if (i >= this.IMAGES_ATTACK.length) {
                i = 0;
            }
        }, 80);
    };

    setAttackTimout() {
        this.attackTimeout = setTimeout(() => {
            clearInterval(this.attackInterval);
            this.isHurt = false;
            this.startWalkingAnimation(); // Restart walking animation
        }, 3000);
    }

    dead() {
        this.isDead = true;
        this.clearTimeoutsIntervals();

        let deadInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 100);

        setTimeout(() => {
            // clearInterval(deadInterval);
            this.isDead = false;
            this.world.showWinScreen();
            setTimeout(() => {
                document.getElementById('button2').classList.remove('d-none');
            }, 1500);
        }, 1000); // Dead animation for 5 seconds
    }
}