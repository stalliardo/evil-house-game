
import Interaction from "./Interaction";


export default class BookShelf extends Interaction {
    static width = 32;
    static height = 32;

    constructor(position, dialogueIdentifier, level, spriteSheetCoords, ctx, requiresKey, interactionType) {
        super(position, dialogueIdentifier, spriteSheetCoords, requiresKey, interactionType);
        this.position = position;
        this.dialogueIdentifier = dialogueIdentifier;
        this.level = level;
        this.ctx = ctx;
        this.width = 32;
        this.height = 32;
    }

    draw() {
        const spriteSheet = new Image();
        spriteSheet.src = "BookShelf.png";
    
        this.ctx.drawImage(
            spriteSheet,
            this.position.x,
            this.position.y,
            32,
            32
        );
    }

}