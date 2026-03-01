import { createStore, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import SavedUser from './SavedUser';
import tasksReducer from './taskSlice';

const store = configureStore({
    reducer: {
      auth: SavedUser,
      tasks: tasksReducer,
      
    },
  });
export default store;
