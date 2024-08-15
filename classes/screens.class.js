class Screen extends DrawableObject {
    
    height = 480;

    constructor(path, x, y, width) {
        super().loadImage(path);
        this.x = x;
        this.y = y;
        this. width = width;
    };

    /**
     * Animates the bounce effect of the winning screen.
     */
    bounce() {
        let targetY = 0;
        let bounceHeight = 50;
        let animationSteps = 30;
        let currentStep = 0;
        let interval = setInterval(() => {
            this.y = targetY + Math.sin((currentStep / animationSteps) * Math.PI) * bounceHeight;
            currentStep++;
            if (currentStep > animationSteps) {
                clearInterval(interval);
                this.y = targetY; 
            };
        }, 1000 / 60); 
    };
};