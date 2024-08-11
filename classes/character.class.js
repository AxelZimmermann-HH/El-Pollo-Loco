class Character extends MovableObject {
    y = 206
    width = 120;  
    height = 240;  
    speed = 5;

    collisionBox = {
        offsetX: 20,
        offsetY: 90,
        widthAdjustment: 40,
        heightAdjustment: 100
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png', 
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world; // Variable, durch die man auf die Funktionen in World zugreifen kann
    // Relevant für Keyboard-Übergabe

    walking_sound = new Audio('audio/walkingfast.mov');
    jumping_sound = new Audio('audio/jump.mp3');
    
    lastKeyPressTime = 0;
    firstDead = false;
    
    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.gravityJump();
        this.animate();
        this.startInitialIdleAnimation();
    }

    startInitialIdleAnimation() {
        this.lastKeyPressTime = Date.now(); // Set initial key press time

        setInterval(() => {
            const timeSinceLastKeyPress = Date.now() - this.lastKeyPressTime;
            if (timeSinceLastKeyPress > 10000) { // 4 seconds delay
                this.playAnimation(this.IMAGES_IDLE_LONG);
            } else if (timeSinceLastKeyPress > 10) { // 1 second delay
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 400);
    
    };

    
    animate() {
        // Movement
        setInterval(() => {
            if (this.world.characterControlEnabled) {
            this.walking_sound.pause();
            
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.backwards = false;
                this.walking_sound.play();
                this.walking_sound.volume = globalVolume;
                this.lastKeyPressTime = Date.now();
            };

            
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.backwards = true;
                this.walking_sound.volume = globalVolume;
                this.walking_sound.play();
                this.lastKeyPressTime = Date.now();
            }

            //JUMP
            if (this.world.keyboard.SPACE  && !this.isAboveGround()) {
                this.jump(0, 25);
                this.jumping_sound.volume = globalVolume;
                this.jumping_sound.play();  
                this.lastKeyPressTime = Date.now();
                // this.jumping_sound.play();
            };
        };

            this.world.camera_x = -this.x +50;
        }, 1000 / 60);
    


        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                
                if (!this.firstDead) {
                    this.world.showLoseScreen();
                    if (backgroundMusic) {
                        backgroundMusic.pause();  // Musik pausieren
                        backgroundMusic.currentTime = 0;  // Musik zurücksetzen, optional
                    }
                
                    // Sieges-Sound abspielen
                    let loseSound = new Audio('audio/game-over.mp3');
                    loseSound.volume = globalVolume;
                    loseSound.play();
                    
                    setTimeout(() => {
                        document.getElementById('button2').classList.remove('d-none');
                    }, 1500)
                    
                    this.firstDead = true;
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    
        setInterval(() => {
            const timeSinceLastKeyPress = Date.now() - this.lastKeyPressTime;
            if (timeSinceLastKeyPress > 10000) { // 4 seconds delay
                this.playAnimation(this.IMAGES_IDLE_LONG);
            } else if (timeSinceLastKeyPress > 1) { // 1 second delay
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 400);

        setInterval(() => {
            if (this.isAboveGround() && !this.isDead() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_JUMP);
            }
            
        }, 100);
    }
}