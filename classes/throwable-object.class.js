class ThrowableObject extends MovableObject {

    
width = 80;
height = 80;

IMAGES_ROTATE = [
    '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
];

IMAGES_SPLASH = [
    '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
]



constructor(x, y) {
    super().loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_ROTATE);
    this.x = x;
    this.y = y;
    this.throw();
}


throw() {
    this.speedY = 30;
    this.gravityThrow();
    this.horizontalMovementInterval = setInterval(() => {
        this.x += 25;
        this.playAnimation(this.IMAGES_ROTATE);
        if (this.y >= 356) { // Additional check to stop horizontal movement
            clearInterval(this.horizontalMovementInterval);
        }
    }, 70);
}


gravityThrow(){
    let interval = setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            if (this.y >= 356) { // Stop the object when it reaches y = 356
                this.y = 356;
                this.splashAnimation(interval, this.IMAGES_SPLASH, 25);
            }
        } else {
            clearInterval(interval);
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