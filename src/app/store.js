
import { configureStore } from '@reduxjs/toolkit';
import gameStateReducer from '@/features/gameState/gameStateSlice';

export default configureStore({
  reducer: {
    gameState: gameStateReducer
  },
})