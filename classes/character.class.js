class Character extends MovableObject {
    y = 206
    width = 120;  
    height = 240;  
    speed = 5;
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    world; // Variable, durch die man auf die Funktionen in World zugreifen kann
    // Relevant für Keyboard-Übergabe
    
    
    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    };

    animate() {
        // Movement
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.backwards = false;
            };
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.backwards = true;
            }
        }, 1000 / 60);
    

        setInterval(() => {
            if (this.world.keyboard.RIGHT ||  this.world.keyboard.LEFT) {

            // Walk animation    
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 % 6 => 1, Rest 1, modulu behält nur den Rest!
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
        }, 50);
    }

    jump() {
        console.log('jumps');
    };
}