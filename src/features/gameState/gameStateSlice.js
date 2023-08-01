import { createSlice } from '@reduxjs/toolkit'
import { levelLoader } from '../../../gameUtils/levelLoader';

export const gameStateSlice = createSlice({
    name: 'gameState',
    initialState: {
        value: 0,
        level: null,
        map: null
    },
    reducers: {
        updateLevelData: (state) => {
              state.level = levelLoader().level;
              state.map = levelLoader().map;
              state.playerPosition = levelLoader().playerPosition;
        },
       
    },
})

export const { updateLevelData } = gameStateSlice.actions

export default gameStateSlice.reducer;