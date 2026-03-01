const projectSlice = createSlice({
    name: 'projects',
    // כאן יהיו כל הפרויקטים והמשימות שלהם
    initialState: [],
    reducers: {
        // מוצא את הפרויקט הנכון ומוסיף לו משימה    
        addTask: (state, action) => {

        },
        // מעדכן משימה קיימת
        updateTask: (state, action) => {

        },
        // מוחק משימה
        deleteTask: (state, action) => {
            const { projectId, taskId } = action.payload;
            state.projects[projectId].tasks = state.projects[projectId].tasks.filter(t => t.id !== taskId);
          }
    }

});