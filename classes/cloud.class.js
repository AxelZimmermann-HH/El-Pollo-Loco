class Cloud extends MovableObject {
    y = 0
    width = 720;  
    height = 405; 


    constructor(path, x) {
        super();
        this.loadImage(path);
        this.x = x;
        this.animate();
         
    };

    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    
}