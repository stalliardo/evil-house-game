import GameStateManager from "@/classes/GameStateManager"
import { basementMap, foyerMap } from "./map";

export const levelLoader = () => {
    const gameStateManager = new GameStateManager();
    const level = gameStateManager.get("level");

    if(!level){
        return {level: "basement", map: basementMap, playerPosition: {x: 300, y: 255}}
    }
    
    switch(level){
        case "foyer": {
            return {level, map: foyerMap, playerPosition: {x: 420, y: 630}};
        }
    }

}