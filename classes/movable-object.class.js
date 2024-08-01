class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    backwards = false;


    loadImage(path) {
        this.img = new Image(); // image bereits vordefiniert
        this.img.src = path;
    }

    loadImages(array){
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    };

    moveRight() {
        console.log('moving right');
    };
}