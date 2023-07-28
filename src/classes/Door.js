import DialogueManager from "./DialogueManager";

export default class Door extends Interaction {
    constructor(x, y, dialogueIdentifier) {
        super(x, y, dialogueIdentifier);
    }

    interact() {
        // interacting with door

        const dialogueManager = new DialogueManager();
        dialogueManager.handleInteraction(this.dialogueIdentifier);
    }
}