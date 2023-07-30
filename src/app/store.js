
import { configureStore } from '@reduxjs/toolkit';
import gameStateReducer from '@/features/gameState/gameStateSlice';
import modalReducer from '@/features/gameState/modalSlice';

export default configureStore({
  reducer: {
    gameState: gameStateReducer,
    modal: modalReducer
  },
})