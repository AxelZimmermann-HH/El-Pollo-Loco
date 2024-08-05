class Endboss extends MovableObject {
    x = 1500; //überschreibt die Koordinate aus movableObject
    y = 68;
    width = 348;  
    height = 406;  

    collisionBox = {
        offsetX: 10,
        offsetY: 60,
        widthAdjustment: 20,
        heightAdjustment: 70
    };

    IMAGES_WALKING = [
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
    
    
    

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.animate();
    }

    animate() {
        // Walking animation
        this.walkingInterval = setInterval(() => {
            if (!this.isHurt && !this.isDead) { // Nur abspielen, wenn der Boss nicht verletzt oder tot ist
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 80);

        // Attack animation every 7 seconds
        this.attackInterval = setInterval(() => {
            if (!this.isHurt && !this.isDead) { // Nur abspielen, wenn der Boss nicht verletzt oder tot ist
                clearInterval(this.walkingInterval); // Stop the walking animation
                let attackIndex = 0;
                let attackAnimation = setInterval(() => {
                    this.img = this.imageCache[this.IMAGES_ATTACK[attackIndex]];
                    attackIndex++;
                    if (attackIndex >= this.IMAGES_ATTACK.length) {
                        attackIndex = 0; // Reset the attack animation index
                    }
                }, 200); // Set the frame duration for the attack animation
                setTimeout(() => {
                    clearInterval(attackAnimation);
                    if (!this.isHurt && !this.isDead) { // Nur zurücksetzen, wenn der Boss nicht verletzt oder tot ist
                        this.walkingInterval = setInterval(() => {
                            this.playAnimation(this.IMAGES_WALKING);
                        }, 200);
                    }
                }, 2000); // Animiert für 2 Sekunden
            }
        }, 7000);
    }

    hurt() {
        this.isHurt = true; // Zustand ändern
        clearInterval(this.walkingInterval);
        clearInterval(this.attackInterval);
        let hurtInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 100);
        setTimeout(() => {
            clearInterval(hurtInterval);
            this.isHurt = false; // Zustand zurücksetzen
            this.animate(); // Restart animation
        }, 2000); // Animiert für 2 Sekunden
    }

    dead() {
        this.isDead = true; // Zustand ändern
        clearInterval(this.walkingInterval);
        clearInterval(this.attackInterval);
        let deadInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 100);
        setTimeout(() => {
            clearInterval(deadInterval);
            this.isDead = false; // Zustand zurücksetzen
        }, 5000); // Animiert für 5 Sekunden
    }

    
}