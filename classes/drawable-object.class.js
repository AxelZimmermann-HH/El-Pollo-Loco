class DrawableObject {

    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    energy = 100;

    /**
     * Loads a new image object.
     * @param {string} path 
     */
    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    };

    /**
     * Loads a new image object for every image in an array.
     * @param {array} array 
     */
    loadImages(array){
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    /**
     * Draws an object into canvas.
     * @param {string} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    /**
     * May just needed again for checking collision boxes by drawing a frame around the objects for illustration.
     * @param {*} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Collectable || this instanceof ThrowableObject) {
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
        };
    };
};