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

    playAnimation(images) {  
        let i = this.currentImage % images.length; // let i = 7 % 6 => 1, Rest 1, modulu behält nur den Rest!
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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