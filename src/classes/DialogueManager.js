import { BASEMENT_DIALOGUE_DATA } from '../../gameUtils/dialogue/basementDialogueData.js';
import GameStateManager from './GameStateManager.js';

export default class DialogueManager {
  constructor() {
    this.gameStateManager = new GameStateManager();
  }

  loadDialogueDataForLevel(level, identifier) {
    let dialogueData = null;

    switch (level) {
      case "basement":
        dialogueData = BASEMENT_DIALOGUE_DATA[identifier];
        return this.filterDialogueData(dialogueData);
      case "ground_floor":
        // dialogueData = import('./ground_floor_dialogue_data.js').then((module) => module.default);
        break;
      // Add cases for other levels if needed
    }
  }


  filterDialogueData(dialogueData) {
    if (!("keyRequired" && "lootableItem" in dialogueData)) {
      return dialogueData;
    }

    if ("lootableItem" && "keyRequired" in dialogueData) {
      // How do i get the checks? 

      // hasITem checks if the user already has the lootedable item...
      const hasItem = this.gameStateManager.hasItem(dialogueData.lootableItem);
      const hasKey = this.gameStateManager.hasItem(dialogueData.keyRequired);
      const isUnlocked = this.gameStateManager.get(dialogueData.lockName) === "unlocked"; // the locked items name ie "locker"

      // console.log("%chasItem = ", "color:red", hasItem);
      // console.log("%chasKey = ", "color:red", hasKey);
      // console.log("%cisUnlcoked = ", "color:red", isUnlocked);
      // console.log("%cdialogueData.lockNam = ", "color:red", dialogueData.lockName);
      


      // if they do then they have already looted this so return the lootedText
      if (hasItem) {
        return dialogueData.alreadyTakenResponse;
      } else if (hasKey && !isUnlocked) {
        return { question: dialogueData.questionWithKey, options: dialogueData.options, lootableItem: dialogueData.lootableItem, keyRequired: dialogueData.keyRequired }
        // return dialogueData
      } else if (isUnlocked) {
        console.log("%cunlocked called", "color:blue");
        return {question: dialogueData.itemOpenedQuestion, options: dialogueData.itemOpenedOptions, lootableItem: dialogueData.lootableItem, keyRequired: dialogueData.keyRequired}
      } else {
        // has neither key or item
        // no item or key so return the questionWithoutKey
        return { question: dialogueData.questionWithoutKey };

      }

    }

    if (("lootableItem" in dialogueData) && !("keyRequired" in dialogueData)) {
      const hasItem = this.gameStateManager.hasItem(dialogueData.lootableItem);
      return hasItem ? dialogueData.alreadyTakenResponse : dialogueData;
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

