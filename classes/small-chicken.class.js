class SmallChicken extends MovableObject {
    
    y = 405
    width = 40;  
    height = 40;  
    animationStarted = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.8 ;
    };

    /**
     * Defines the start conditions for the animation.
     */
    startAnimation() {
        if (!this.animationStarted) {
            this.animationStarted = true;
            this.animate();
        };
    };

    /**
     * Runs the animation for the changing images and the x-value.
     */
    animate() {
        this.moveInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    };

    /**
     * Runs the animation when chicken is dead.
     */
    defeat() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
         
        let chickenSound = new Audio('audio/bird.mov');
        chickenSound.volume = globalVolume;
        chickenSound.play();
        this.loadImage(this.IMAGE_DEAD);
        setTimeout(() => {
            this.y = -1000;
        }, 500);
    };
};