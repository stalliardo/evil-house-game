import { INTERACTION_TYPES } from '../../gameUtils/consts.js';
import { BASEMENT_DIALOGUE_DATA } from '../../gameUtils/dialogue/basementDialogueData.js';
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
      case "ground_floor":
        // dialogueData = import('./ground_floor_dialogue_data.js').then((module) => module.default);
        break;
      // Add cases for other levels if needed
    }
  }


  filterDialogueData(dialogueData, instance) {
    const interactionType = instance.interactionType;
    const hasItem = this.gameStateManager.hasItem(dialogueData.lootableItem);
    const hasKey = this.gameStateManager.hasItem(dialogueData.keyRequired);
    const isUnlocked = this.gameStateManager.get(dialogueData.lockName) === "unlocked"; // the locked items name ie "locker"

    switch (interactionType) {

      case INTERACTION_TYPES.LOCKED_WITH_LOOT: {

        // if they do then they have already looted this so return the lootedText
        if (hasItem) {
          return dialogueData.alreadyTakenResponse;
        } else if (hasKey && !isUnlocked) {
          return { question: dialogueData.questionWithKey, options: dialogueData.options, lootableItem: dialogueData.lootableItem, keyRequired: dialogueData.keyRequired }
          // return dialogueData
        } else if (isUnlocked) {
          return { question: dialogueData.itemOpenedQuestion, options: dialogueData.itemOpenedOptions, lootableItem: dialogueData.lootableItem, keyRequired: dialogueData.keyRequired }
        } else {
          return { question: dialogueData.questionWithoutKey };
        }
      }


      case INTERACTION_TYPES.LOCKED_DOOR: {
        if (hasKey && !isUnlocked) {
          console.log("top if");
          return { question: dialogueData.questionWithKey, options: dialogueData.options, keyRequired: dialogueData.keyRequired, lockName: dialogueData.lockName };
        } else if (!hasKey) {
          console.log("else called");
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

