import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import catsReducer from './slices/catsSlice';
import breedersReducer from './slices/breedersSlice';
import messagesReducer from './slices/messagesSlice';
import favoritesReducer from './slices/favoritesSlice';
import aiReducer from './slices/aiSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cats: catsReducer,
    breeders: breedersReducer,
    messages: messagesReducer,
    favorites: favoritesReducer,
    ai: aiReducer,
    ui: uiReducer
  }
});

export default store;
