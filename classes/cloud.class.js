class Cloud extends MovableObject {
    y = 0
    width = 720;  
    height = 405; 

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.moveLeft();
         
    };

    animate(){
        this.moveLeft();
    }

    
}