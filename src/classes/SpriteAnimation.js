export default class SpriteAnimation {
    static width = 20; // was 32
    static height = 20; // was 32

    constructor(spriteSheetSrc, numberOfFramesPerRow, numberOfRows, animationSpeed, scalingFactor = 1, position, velocity, ctx) {
        this.spriteSheet = new Image();
        this.spriteSheet.src = spriteSheetSrc;
        this.frameWidth = this.spriteSheet.width / numberOfFramesPerRow;
        this.frameHeight = this.spriteSheet.height / numberOfRows;
        this.numberOfFrames = numberOfFramesPerRow * numberOfRows;
        this.numberOfFramesPerRow = numberOfFramesPerRow;
        this.frameIndex = 0;
        this.frameCounter = 0;
        this.direction = 'right';
        this.animationSpeed = animationSpeed;
        this.scalingFactor = scalingFactor;
        this.position = position;
        this.velocity = velocity;
        this.width = 28; // was 32
        this.height = 32;
        this.ctx = ctx;
        this.spriteRow;
        this.spriteColumn;
    }

    updateFrame() {
       
        // below is used for animating sprite sheets but not using for now
        // this.frameCounter += 1;

        // if (this.frameCounter >= 16 * this.animationSpeed) { // <- time
        //     this.frameIndex += 1  ;
        //     this.frameCounter = 0;
        //     if (this.frameIndex > 1) {
        //         this.frameIndex = 0;
        //     }
        // }

    }

    drawSprite() {
        let rowIndex = 0;
        switch (this.direction) {
            // case 'up':
            //     rowIndex = 3;
            //     break;
            // case 'down':
            //     rowIndex = 0;
            //     break;
            case 'left':
                rowIndex = 1;
                break;
            case 'right':
                rowIndex = 0;
                break;
            default:
                rowIndex = 0;
        }

        // const frameX = this.frameIndex * this.frameWidth;
        // const frameY = rowIndex * this.frameHeight;

        const frameX = this.spriteColumn * this.frameWidth;
        const frameY = this.spriteRow * this.frameHeight;
        

        this.ctx.drawImage(
            this.spriteSheet,
            frameX,
            frameY,
            this.frameWidth,
            this.frameHeight,
            this.position.x,
            this.position.y,
            this.frameWidth * this.scalingFactor,
            this.frameHeight * this.scalingFactor
        );

    }

    update() {
        this.drawSprite();

        // Done this to temporarily set the player sprite direction, shit but will have to do for now
        if(this.direction === "right"){
            this.spriteColumn = 0;
            this.spriteRow = 0;
        } else if (this.direction === "left") {
            this.spriteColumn = 6;
            this.spriteRow = 2;
        }
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    setDirection(newDirection) {
        this.direction = newDirection;
    }
}