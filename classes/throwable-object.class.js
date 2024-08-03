class ThrowableObject extends MovableObject {

    
    width = 80;
    height = 80;

    IMAGES_ROTATE = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];



    constructor(x, y) {
        super().loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.throw();
    }


    applyGravityThrow(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
               }
        }, 1000 / 25);
    };

    throw() {
        this.speedY = 30;
        this.applyGravityThrow();
        setInterval( () => {
            this.x += 25;
        }, 50);
    }


}