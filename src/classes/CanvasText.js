export default class CanvasText {
    constructor(text, font, colour, xPos, yPos, ctx) {
        this.text = text;
        this.font = font;
        this.colour = colour
        this.xPos = xPos;
        this.yPos = yPos;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.colour;
        this.ctx.fillText(this.text, this.xPos, this.yPos);        
    }
}