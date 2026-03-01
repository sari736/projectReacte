import React, { useState } from 'react';
import { Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Paper, Stack } from '@mui/material';
const EditTask = ({taskToEdit,onBack,onSave}) =>{
   
    const [taskName, setTaskName] = useState(taskToEdit.name);
    const [description, setDescription] = useState(taskToEdit.description);
    const [priority, setPriority] = useState(taskToEdit.priority);
    const [status, setStatus] = useState(taskToEdit.status);
    // const [dueDate, setDueDate] = useState(taskToEdit.dueDate);

    const handleSave = () => {
        onSave({
            // שמירה על המקור
            ...taskToEdit, 
            name: taskName,
            description: description,
            priority:priority,
            status:status,
            // dueDate:dueDate
        });
    };

    return (
            <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', direction: 'rtl' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                    עריכת משימה: {taskToEdit.name}
                </Typography>
        
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                    <Stack spacing={3}>
                        {/* שם המשימה */}
                        <TextField
                            label="שם המשימה"
                            fullWidth
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
        
                        {/* תיאור המשימה */}
                        <TextField
                            label="תיאור"
                            fullWidth
                            multiline
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
        
                        {/* בחירת סטטוס - חשוב שיהיה תואם ל-id של העמודות */}
                        <FormControl fullWidth>
                            <InputLabel>סטטוס</InputLabel>
                            <Select
                                value={status}
                                label="סטטוס"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="todo">משימות שלא בוצעו</MenuItem>
                                <MenuItem value="in-progress">בביצוע מפתח</MenuItem>
                                <MenuItem value="review">מוכן לבדיקות</MenuItem>
                                <MenuItem value="done">נבדקו ובוצעו</MenuItem>
                            </Select>
                        </FormControl>
        
                        {/* כפתורי פעולה */}
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button variant="outlined" onClick={onBack}>
                                ביטול
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                שמור שינויים
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        
    );
};
export default EditTask;