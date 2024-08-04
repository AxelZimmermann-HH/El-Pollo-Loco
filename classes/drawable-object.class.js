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
            ctx.rect(this.x, this.y, this.width, this.height);

            // if (this instanceof Character) {
            //     ctx.rect(this.x + 10, this.y + 90, this.width - 20, this.height - 100 ); // Beispielwerte für Character
            // } else if (this instanceof Chicken) {
            //     ctx.rect(this.x, this.y, this.width, this.height); // Beispielwerte für Chicken
            // } else if (this instanceof Endboss) {
            //     ctx.rect(this.x + 10, this.y + 60, this.width - 10, this.height -70); // Beispielwerte für Endboss
            // } else if (this instanceof Collectable) {
            //     ctx.rect(this.x, this.y, this.width, this.height); // Beispielwerte für Endboss
            // }

            ctx.stroke();
        }
    };

    

}