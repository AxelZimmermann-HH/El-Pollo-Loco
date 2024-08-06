class Screen extends DrawableObject {
    x = 40;
    y = 0;
    width = 640;
    height = 480;


    constructor(path) {
        super().loadImage(path);
    }

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
                this.y = targetY; // Ensure it ends exactly at the target position
            }
        }, 1000 / 60); // 60 FPS
    }

}