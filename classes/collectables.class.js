class Collectable extends MovableObject {

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    collisionBox = {
        offsetX: 30,
        offsetY: 30,
        widthAdjustment: 60,
        heightAdjustment: 60
    };
    
    constructor(imagePath, x, y, w, h) {
        super();
        this.loadImage(imagePath);
        
        if (imagePath.includes('coin')) {
            this.loadImages(this.IMAGES_COIN);
            this.animate();
        };
        
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h; 
    }

    /**
     * Animates the static coins.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 500);
     };
};