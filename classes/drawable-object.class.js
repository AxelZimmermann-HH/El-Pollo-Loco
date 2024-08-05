class DrawableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    energy = 100;

    

    constructor() {

    };



    loadImage(path) {
        this.img = new Image(); // image bereits vordefiniert
        this.img.src = path;
    };

    loadImages(array){
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Collectable) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = "blue";
    
            let offsetX = 0, offsetY = 0, widthAdjustment = 0, heightAdjustment = 0;
    
            if (this.collisionBox) {
                offsetX = this.collisionBox.offsetX || 0;
                offsetY = this.collisionBox.offsetY || 0;
                widthAdjustment = this.collisionBox.widthAdjustment || 0;
                heightAdjustment = this.collisionBox.heightAdjustment || 0;
            }
    
            ctx.rect(this.x + offsetX, this.y + offsetY, this.width - widthAdjustment, this.height - heightAdjustment);
    
            ctx.stroke();
        }
    }
}