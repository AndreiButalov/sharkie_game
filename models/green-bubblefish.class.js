class GreenBubbleFish extends Bubblefish {

    frequency = 0.09;
    amplitude = 12;

    BUBBLEFISH_SWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];

    constructor(x) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = x;
        this.initialY = 60 + Math.random() * 300;
        this.y = this.initialY;
        this.loadImages(this.BUBBLEFISH_SWIM);
        this.speed = 0.3 + Math.random() * 0.5;
        this.applySwim();
        this.animateEnemy();
    }
    

    animateEnemy() {       
        setInterval(() => {
            this.moveLeft();            
        }, 1000 / 60);    

        setInterval(() => {
            this.playAnimation(this.BUBBLEFISH_SWIM);
        }, 200);
    }
}


// constructor(x, previousY = null) {
//     super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
//     this.x = x;
//     this.loadImages(this.BUBBLEFISH_SWIM);
    
//     this.y = this.generateRandomY(previousY);
//     console.log(this.y);
    
//     this.speed = 0.3 + Math.random() * 0.5;
//     this.animateEnemy();
// }



// generateRandomY(previousY) {
//     let y = 60 + Math.random() * 300;

//     if (previousY !== null) {
//         if (Math.abs(y - previousY) < 70) {
//             if (y < previousY) {
//                 y = previousY + 50;
//             } 
//             else {
//                 y = previousY - 50;
//             }
//             if (y < 60) {
//                 y = 60;
//             } else if (y > 360) {
//                 y = 360;
//             }
//         }
//     }

//     return y;
// }

// animateEnemy() {
//     setInterval(() => {
//         this.moveLeft();
        
//         if (this.x <= -150) {
//             this.x = 720;
//             this.y = this.generateRandomY(this.y);
//             this.speed = 0.3 + Math.random() * 0.5;
//         }
//     }, 1000 / 60);
    
//     setInterval(() => {
//         this.playAnimation(this.BUBBLEFISH_SWIM);
//     }, 200);
// }
// }