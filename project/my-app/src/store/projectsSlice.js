
import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: [
    { id: 'react-proj', name: 'ריאקט', description: 'פרויקט פיתוח ב-React', date: '01/01/2020' },
    { id: 'csharp-proj', name: 'C#', description: 'פרויקט תשתית ב-C#', date: '01/01/2020' },
    { id: 'node-proj', name: 'Node.js', description: 'פרויקט צד שרת', date: '01/01/2020' },
    { id: 'python-proj', name: 'Python', description: 'פרויקט בינה מלאכותית', date: '01/01/2020' }
  ],
  reducers: {
    addProject: (state, action) => {
      // בדיקה פשוטה למניעת כפילות לפי ID
      const exists = state.find(p => p.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },
updateProject: (state, action) => {
  const { id, updatedProject } = action.payload;
  const index = state.findIndex(p => p.id === id);
  if (index !== -1) {
    state[index] = { ...state[index], ...updatedProject };
  }
},

    deleteProject: (state, action) => {
      //  Redux Toolkit מאפשר להשתמש ב-filter רק אם מחזירים את המערך החדש
      return state.filter(project => project.id !== action.payload);
    },
  },
});

export const { addProject, deleteProject,updateProject } = projectsSlice.actions;
export default projectsSlice.reducer;
