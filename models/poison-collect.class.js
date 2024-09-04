class PoisonCollect extends MovableObject {
    width = 50;
    height = 60;


    IMAGE = [
        'img/4. Marcadores/Posión/Dark - Left.png'        
    ];

    constructor() {
        super().loadImage('img/4. Marcadores/Posión/Dark - Left.png');
        this.y = 350 + Math.random() * 50;
        this.x = 460 + Math.random() * 3000;// deleten
    }

    
}