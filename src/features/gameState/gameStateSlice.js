import { createSlice } from '@reduxjs/toolkit'
import { levelLoader } from '../../../gameUtils/levelLoader';

export const gameStateSlice = createSlice({
    name: 'gameState',
    initialState: {
        value: 0,
        levelData: {
            level: null,
            map: [],
            playerPosition: {x: null, y: null}
        },
        map: null,
        puzzleInProgress: false
    },
    reducers: {
        updateLevelData: (state) => {
              state.levelData.level = levelLoader().level;
              state.levelData.map = levelLoader().map;
              state.levelData.playerPosition = levelLoader().playerPosition;
        },
        setPuzzleInProgress: (state, action) => {
            state.puzzleInProgress = action.payload;
        }
       
    },
})

export const { updateLevelData, setPuzzleInProgress } = gameStateSlice.actions

export default gameStateSlice.reducer;