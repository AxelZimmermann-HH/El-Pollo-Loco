class ThrowableObject extends MovableObject {
    
    width = 80;
    height = 80;

    collisionBox = {
        offsetX: 10,
        offsetY: 10,
        widthAdjustment: 30,
        heightAdjustment: 30
    };

    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(world, x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.world = world;
        this.loadImages(this.IMAGES_ROTATE);
        this.x = x;
        this.y = y;
        this.throw();
    };

    /**
    * Sets X- and Y-Speed for the bottle to throw and plays the animation.
    */
    throw() {
        this.speedY = 30;
        this.throwLogic();
        this.horizontalMovementInterval = setInterval(() => {
            this.x += 35;
            this.playAnimation(this.IMAGES_ROTATE);
        }, 70);
    };

    /**
     * Defines the gravitation of the bottle to throw as well as the actions when colliding.
     */
    throwLogic() {
        let interval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                this.handleCollisionWithEndboss(interval);
                this.handleGroundCollision(interval);
            } 
        }, 1000 / 25);
    };

    /**
     * Animates the throwed bottle when colliding with endboss and reduces Energy of endboss.
     * @param {number} interval 
     */
    handleCollisionWithEndboss(interval) {
        this.world.level.endboss.forEach((endboss) => {
            if (this.isColliding(endboss)) {
                this.splashAnimation(interval, this.IMAGES_SPLASH, 25);
                this.world.statusEnemy.reduceEnergy(this.world.level.endboss, 0);
            }
        });
    };
    
    /**
     * Animates the bottle when colliding with the ground.
     * @param {number} interval 
     */
    handleGroundCollision(interval) {
        if (this.y >= 386) {
            this.y = 386;
            this.playBottleBreakSound();
            this.splashAnimation(interval, this.IMAGES_SPLASH, 25);
        }
    };
    
    /**
     * Plays the sound of breaking bottle.
     */
    playBottleBreakSound() {
        let bottleBreakSound = new Audio('audio/bottle_break.mov');
        bottleBreakSound.volume = globalVolume;
        bottleBreakSound.play();
    };
    
    /**
     * Animates the splashing bottle and stops the gravitaion.
     * @param {number} interval 
     * @param {array} array 
     * @param {number} speed 
     */
    splashAnimation(interval, array, speed) {
        clearInterval(interval);
        // Stop the horizontal movement interval if it exists
        if (this.horizontalMovementInterval) {
            clearInterval(this.horizontalMovementInterval);
            this.playEndAnimationOnce(array, speed);
        }
    };
};