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

    walking_sound = new Audio('../audio/walkingfast.mov');
    
    
    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    };

    animate() {
        // Movement
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.backwards = false;
                this.walking_sound.play();
            };

            
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.backwards = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x +50;
        }, 1000 / 60);
    

        setInterval(() => {
            if (this.world.keyboard.RIGHT ||  this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
        }, 50);
    }

    jump() {
        console.log('jumps');
    };
}