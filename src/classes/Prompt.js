export default class Prompt {
   
    constructor(promptText, xPos, yPos, canvas, ctx){
        this.promptText = promptText;
        this.xPos = xPos;
        this.yPos = yPos;
        this.canvas = canvas
        this.ctx = ctx;
    }

    draw(){

        // this.ctx.strokeStyle = "white"
        // this.ctx.strokeRect(this.rectXPos, this.rectYPos, this.rectWidth, this.rectHeight);
        this.ctx.font = "30px Arial"
        this.ctx.fillStyle = "white"
        this.ctx.fillText(this.promptText, this.xPos, this.yPos);

    
    }
}