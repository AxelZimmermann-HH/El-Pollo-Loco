class BgObject extends MovableObject {
    
    width = 721;  
    height = 405; 

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    };
};