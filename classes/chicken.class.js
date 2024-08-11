class Chicken extends MovableObject {
    
    y = 365
    width = 80;  
    height = 79;  
    animationStarted = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    
    
    
    

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 2500; //überschreibt die Koordinate aus movableObject
        this.speed = 0.15 + Math.random() * 0.8 ;
        // this.animate();
    }

    startAnimation() {
        if (!this.animationStarted) {
            this.animationStarted = true;
            this.animate();
        }
    }

    animate() {
        this.moveInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }


    defeat() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
         
        let chickenSound = new Audio('audio/chick2.mov');
        chickenSound.volume = globalVolume;
        chickenSound.play();
        this.loadImage(this.IMAGE_DEAD);
        setTimeout(() => {
            this.y = -1000; // Bewegt das Bild aus dem sichtbaren Bereich
        }, 500);
    }
}