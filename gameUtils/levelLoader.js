import GameStateManager from "@/classes/GameStateManager"
import { basementMap } from "./map";

export const levelLoader = () => {
    const gameStateManager = new GameStateManager();
    const level = gameStateManager.get("level");

    if(!level){
        return {level: "basement", map: basementMap}
    }

    // TODO - i dont think this will work as intended
    return {level, map: `${level}Map`};

}