class BarrierDownUp extends Barrier {
    
    y = 0;
    height = 480; 
    width = 500;    

    constructor(x) {
        super().loadImage('img/3. Background/Barrier/1.png');
        this.x = x;
    }
}