class StatusBottles extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    currentBottles = 0;
    originalWidth = 240;
    originalHeight = 64;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 105;
        this.width = this.originalWidth;
        this.height = this.originalHeight;
        this.updateBottleBar();
    };

    /**
     * Displays the updated status bar and runs the function for changing coins into a bottle.
     */
    updateBottleBar() {
        if (this.currentBottles >= 0 && this.currentBottles < this.IMAGES.length) {
            let path = this.IMAGES[this.currentBottles];
            this.img = this.imageCache[path];
        };
    };

    /**
     * Increases value of currentBottles, then updates the status bar and runs the animation.
     */
    addBottle() {
        if (this.currentBottles < 5) {
            this.currentBottles++;
            this.updateBottleBar();
        };
        this.animateBottleEffect();
    };

    /**
     * Shortly scales the status bar of the bottles when one is added.
     */
    animateBottleEffect() {
        this.scale = 1;
        this.scaleStep = 0.05;
        this.maxScale = 1.5;
        this.minScale = 1;
        this.growing = true;
    
        let animate = () => {
            this.updateScale();
            this.updateSize();
            if (this.shouldContinue()) requestAnimationFrame(animate);
        };
    
        animate();
    };
    
    /**
     * Defines the optical scale effect.
     */
    updateScale() {
        if (this.growing) {
            this.scale += this.scaleStep;
            if (this.scale >= this.maxScale) this.growing = false;
        } else {
            this.scale -= this.scaleStep;
            if (this.scale <= this.minScale) this.stopAnimation();
        };
    };
    
    /**
     * Calculates the width and height of the status bar when scaling.
     */
    updateSize() {
        this.width = this.originalWidth * this.scale;
        this.height = this.originalHeight * this.scale;
    };
    
    /**
     * This function returns the condition for contiuing with scaling.
     * @returns the condition for contiuing with scaling.
     */
    shouldContinue() {
        return this.scale > this.minScale || this.growing;
    };
    
    /**
     * Sets the final size of the status bar after scale effect.
     */
    stopAnimation() {
        this.width = this.originalWidth;
        this.height = this.originalHeight;
    };  
};