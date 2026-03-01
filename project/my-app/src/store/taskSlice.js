import { createSlice } from '@reduxjs/toolkit';
// לטעון את הדברים מה localStorage
const loadTasksFromStorage = (projectId) => {
    const saved = localStorage.getItem(`tasks_${projectId}`);
    return saved ? JSON.parse(saved) : [];
};

const taskSlice = createSlice({
    name:'task',
    initialState:{
        // כל המשימות של הפרויקט הנוכחי 
        items:[]
    },
    reducers:{
        // טעינת משימות לפי פרויקט
        setTasks: (state, action) => {
            const { projectId } = action.payload;
            state.items = loadTasksFromStorage(projectId);
        },
        // הוספת משימה
        addTask: (state, action) => {
            const { projectId, task } = action.payload;
            state.items.push(task);
            localStorage.setItem(`tasks_${projectId}`, JSON.stringify(state.items));
        },
        // עדכון משימה (עריכה + שינוי סטטוס)
        updateTask: (state, action) => {
            const { projectId, updatedTask } = action.payload;
            state.items = state.items.map(t => t.id === updatedTask.id ? updatedTask : t);
            localStorage.setItem(`tasks_${projectId}`, JSON.stringify(state.items));
        },
        // מחיקת משימה
        deleteTask: (state, action) => {
            const { projectId, taskId } = action.payload;
            state.items = state.items.filter(t => t.id !== taskId);
            localStorage.setItem(`tasks_${projectId}`, JSON.stringify(state.items));
        }
    }
})

export const { setTasks, addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;