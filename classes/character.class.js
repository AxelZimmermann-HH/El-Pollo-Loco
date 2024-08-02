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
    IMAGES_JUMP = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png'
    ];

    world; // Variable, durch die man auf die Funktionen in World zugreifen kann
    // Relevant für Keyboard-Übergabe

    walking_sound = new Audio('../audio/walkingfast.mov');
    jumping_sound = new Audio('../audio/arriba.mp3')
    
    
    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.applyGravity();
        this.animate();
    };

    animate() {
        // Movement
        setInterval(() => {
            
            this.walking_sound.pause();
            
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.backwards = false;
                this.walking_sound.play();
            };

            
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.backwards = true;
                this.walking_sound.play();
            }

            //JUMP
            if (this.world.keyboard.SPACE  && !this.isAboveGround()) {
                this.jump();
                this.jumping_sound.play();
            };

            this.world.camera_x = -this.x +50;
        }, 1000 / 60);
    

        setInterval(() => {
            if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMP);
            } else {

                if (this.world.keyboard.RIGHT ||  this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

    
    showWalkingImage() {
        let path = this.IMAGES_WALKING[0];
        this.img = this.imageCache[path];
    }
}