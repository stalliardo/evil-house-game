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

    addToLevelInventory(data){
      this.playerInventory.collectLevelItem(data);
      this.saveToLocalStorage();
    }
  
    hasItem(item) {
      return this.playerInventory.hasItem(item);
    }

    hasItemForLevel(data){
      return this.playerInventory.hasItemForLevel(data);
    }

    hasAllItems(items) {
      return this.playerInventory.hasAllItems(items);
    }

    delete(){
      localStorage.removeItem("playerInventory");
      localStorage.removeItem("gameState");
    }
    
    deleteLevelData(level){
      this.playerInventory.deleteLevelData(level);
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
      this.loadFromLocalStorage(); // ensure data is fresh
      this.collectedItems.push(item);
      this.saveToLocalStorage();
    }

    collectLevelItem(data){
      this.loadFromLocalStorage();
      const itemsForLevel = this.collectedItems.find((i) => i?.level === data.level) || [];
      if(itemsForLevel.length){
        itemsForLevel.items.push(...data.items);
      } else {
        this.collectedItems.push({level: data.level, items: data.items})
      }

      this.saveToLocalStorage();
    }
  
    hasItem(item) {
      return this.collectedItems.includes(item);
    }

    hasItemForLevel(data){
      const itemsForLevel = this.collectedItems.find((i) => i?.level === data.level) || [];

      if(!itemsForLevel.items) {
        return false;
      }
      return itemsForLevel.items.includes(data.item);
    }

    hasAllItems(items) {
      let result = false;

      if(this.collectedItems.every(e => items.includes(e))){
        result = true
      }

      return result;
    }

    deleteLevelData(level){
      if(!this.collectedItems.length){
        return;
      }

      const dataToDelete = this.collectedItems.find((i) => i?.level === level) || [];
      const index = this.collectedItems.indexOf(dataToDelete);

      if(index >= 0){
       this.collectedItems.splice(index, 1)
        this.saveToLocalStorage();
      }    
    }
  }
  