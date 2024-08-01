class Chicken extends MovableObject {
    x = 200 + Math.random() * 500; //überschreibt die Koordinate aus movableObject
    y = 365
    width = 80;  
    height = 79;  
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    speed = 0.15 + Math.random() * 1;
    
    
    

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 % 6 => 1, Rest 1, modulu behält nur den Rest!
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 80);
    }

    eat() {
        console.log('eating');
    }
}