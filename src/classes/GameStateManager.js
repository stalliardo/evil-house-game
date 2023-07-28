export default class GameStateManager {
    constructor() {
      this.loadFromLocalStorage();
      this.playerInventory = new PlayerInventory();
    }
  
    loadFromLocalStorage() {
      const gameStateJSON = localStorage.getItem("gameState");
      this.gameState = gameStateJSON ? JSON.parse(gameStateJSON) : {};
    }
  
    saveToLocalStorage() {
      const gameStateJSON = JSON.stringify(this.gameState);
      localStorage.setItem("gameState", gameStateJSON);
    }
  
    set(key, value) {
      this.gameState[key] = value;
      this.saveToLocalStorage();
    }
  
    get(key) {
      return this.gameState[key];
    }
  
    has(key) {
      return key in this.gameState;
    }
  
    addToInventory(item) {
      this.playerInventory.collectItem(item);
      this.saveToLocalStorage();
    }
  
    hasItem(item) {
      return this.playerInventory.hasItem(item);
    }
  }
  
  class PlayerInventory {
    constructor() {
      this.loadFromLocalStorage();
    }
  
    loadFromLocalStorage() {
      const inventoryJSON = localStorage.getItem("playerInventory");
      this.collectedItems = inventoryJSON ? JSON.parse(inventoryJSON) : [];
    }
  
    saveToLocalStorage() {
      const inventoryJSON = JSON.stringify(this.collectedItems);
      localStorage.setItem("playerInventory", inventoryJSON);
    }
  
    collectItem(item) {
      this.collectedItems.push(item);
      this.saveToLocalStorage();
    }
  
    hasItem(item) {
      return this.collectedItems.includes(item);
    }
  }
  