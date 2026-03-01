import React, { useState } from 'react';
import {
    Box, TextField, Typography, Button, Stack, FormControl, InputLabel, Select, MenuItem, Paper
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import SaveIcon from '@mui/icons-material/Save'; 
import dayjs from 'dayjs';
import { data } from 'react-router-dom';

const AddTask = ({ onBack,onSave }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [dueDate, setDueDate] = useState(dayjs());

    const handleSave=()=>{
        const newTask={
            id:Date.now(),
            name:taskName,
            description:description,
            status,status,
            priority:priority,
            dueDate: dueDate.format('DD/MM/YYYY')
        }
        onSave(newTask);
        
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh', direction: 'rtl' }}>
                <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', borderRadius: 3 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={onBack}
                        sx={{ mb: 3 }}
                    >
                        חזור ללוח המשימות
                    </Button>

                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                        הוספת משימה חדשה לפרויקט
                    </Typography>

                    <Stack spacing={3}>
                        <TextField
                            label="שם המשימה"
                            fullWidth
                            required
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <TextField
                            label="תיאור המשימה"
                            fullWidth
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
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
                        <FormControl fullWidth>
                            <InputLabel>רמת דחיפות</InputLabel>
                            <Select
                                value={priority}
                                label="רמת דחיפות"
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <MenuItem value="low">🟢 נמוכה</MenuItem>
                                <MenuItem value="medium">🟡 בינונית</MenuItem>
                                <MenuItem value="high">🔴 גבוהה</MenuItem>
                            </Select>
                        </FormControl>

                        {/* לוח השנה המקצועי של MUI */}
                        <DatePicker
                            label="תאריך יעד"
                            value={dueDate}
                            onChange={(newValue) => setDueDate(newValue)}
                            slotProps={{ textField: { fullWidth: true } }}
                        />

                        <Button onClick={handleSave}
                            variant="contained"
                            size="large"
                            startIcon={<SaveIcon />}
                            fullWidth
                            sx={{ mt: 2, py: 1.5, fontSize: '1.1rem' }}
                        >
                            שמור משימה
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
};

export default AddTask;