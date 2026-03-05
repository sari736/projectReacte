
import { configureStore } from '@reduxjs/toolkit';
import SavedUser from './SavedUser';
import tasksReducer from './taskSlice';
import projectsReducer from './projectsSlice'; 

const store = configureStore({
    reducer: {
      auth: SavedUser,
      tasks: tasksReducer,
      // 2. הוספת המפתח projects כדי שהנתונים יישמרו במערך
      projects: projectsReducer, 
    },
});

export default store;