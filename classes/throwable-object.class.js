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
]



constructor(world, x, y) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.world = world;
    this.loadImages(this.IMAGES_ROTATE);
    this.x = x;
    this.y = y;
    this.throw();
}


throw() {
    this.speedY = 30;
    this.throwLogic();
    this.horizontalMovementInterval = setInterval(() => {
        this.x += 35;
        this.playAnimation(this.IMAGES_ROTATE);
    }, 70);
}


throwLogic(){
    let interval = setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            this.world.level.endboss.forEach((endboss) => {
                if (this.isColliding(endboss)) {
                    this.splashAnimation(interval, this.IMAGES_SPLASH, 25);
                    this.world.statusEnemy.reduceEnergy(this.world.level.endboss, 0);
                }
            });
            if (this.y >= 386) {
                this.y = 386;
                let bottleBreakSound = new Audio('audio/bottle_break.mov');
                bottleBreakSound.volume = globalVolume;
                bottleBreakSound.play();
                this.splashAnimation(interval, this.IMAGES_SPLASH, 25);
            }
        } 
    }, 1000 / 25);
};

    
    

splashAnimation(interval, array, speed) {
    clearInterval(interval);
    // Stop the horizontal movement interval if it exists
    if (this.horizontalMovementInterval) {
        clearInterval(this.horizontalMovementInterval);
        this.playEndAnimationOnce(array, speed);
    }
};

    
    
    


}