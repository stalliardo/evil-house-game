import { INTERACTION_TYPES } from '../../gameUtils/consts.js';
import { BASEMENT_DIALOGUE_DATA } from '../../gameUtils/dialogue/basementDialogueData.js';
import { FOYER_DIALOGUE_DATA } from '../../gameUtils/dialogue/foyerDialogueData.js';
import GameStateManager from './GameStateManager.js';

export default class DialogueManager {
  constructor() {
    this.gameStateManager = new GameStateManager();
  }

  loadDialogueDataForLevel(level, instance) {
    const identifier = instance?.dialogueIdentifier;
    let dialogueData = null;

    switch (level) {
      case "basement":
        dialogueData = BASEMENT_DIALOGUE_DATA[identifier];
        return this.filterDialogueData(dialogueData, instance);
      case "foyer":
        dialogueData = FOYER_DIALOGUE_DATA[identifier];
        return this.filterDialogueData(dialogueData, instance);
    }
  }


  filterDialogueData(dialogueData, instance) {

    const interactionType = instance.interactionType;
    const hasItem = this.gameStateManager.hasItem(dialogueData.lootableItem);
    const hasKey = this.gameStateManager.hasItem(dialogueData.keyRequired);
    const isUnlocked = this.gameStateManager.get(dialogueData.lockName) === "unlocked"; // the locked items name ie "locker"
    const hasItems = this.gameStateManager.hasAllItems(dialogueData.requiredItems || []);

    switch (interactionType) {
      case INTERACTION_TYPES.LOCKED_WITH_LOOT: {
        if (hasItem) {
          return dialogueData.alreadyTakenResponse;
        } else if (hasKey && !isUnlocked) {
          return { question: dialogueData.questionWithKey, options: dialogueData.options, lootableItem: dialogueData.lootableItem, keyRequired: dialogueData.keyRequired }
        } else if (isUnlocked) {
          return { question: dialogueData.itemOpenedQuestion, options: dialogueData.itemOpenedOptions, lootableItem: dialogueData.lootableItem, keyRequired: dialogueData.keyRequired }
        } else {
          return { question: dialogueData.questionWithoutKey };
        }
      }

      case INTERACTION_TYPES.LOCKED_DOOR: {
        if (hasKey && !isUnlocked) {
          return { question: dialogueData.questionWithKey, options: dialogueData.options, keyRequired: dialogueData.keyRequired, lockName: dialogueData.lockName };
        } else if (!hasKey) {
          return { question: dialogueData.questionWithoutKey };
        } else if (isUnlocked) {
          return { question: " " }
        }
      }

      case INTERACTION_TYPES.READ_ONLY: {
        return dialogueData;
      }
      case INTERACTION_TYPES.SINGLE_ITEM: {
        const hasItem = this.gameStateManager.hasItem(dialogueData.lootableItem);
        return hasItem ? dialogueData.alreadyTakenResponse : dialogueData;
      }

      case INTERACTION_TYPES.CHANGE_LEVEL: {
        return dialogueData;
      }
      case INTERACTION_TYPES.REQUIRES_ITEMS: {
        if(hasItems){
          return dialogueData; // TODO
        } else {
          return {question: dialogueData.questionWithoutItems}
        }        
      }
    }
  }

  displayQuestion(question, options) {
    // Code to display the question and options on the screen...
  }

  displayResponse(response) {
    // Code to display the response on the screen...
  }

  // ... Additional methods for handling dialogue interactions and responses ...
}

