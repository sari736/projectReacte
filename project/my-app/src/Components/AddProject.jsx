
import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; 

const AddProject = () => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    
    // הגדרת תאריך היום כברירת מחדל בפורמט שה-TextField מבין
    const [projectDate, setProjectDate] = useState(new Date().toISOString().split('T')[0]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSave = () => {
        if (!projectName) return alert("חובה להזין שם פרויקט");

        const newProject = {
            id: uuidv4(),
            name: projectName,
            description: description,
            date: projectDate // נשמור את התאריך הנבחר
        };


        // אנחנו שולחים את הפעולה לפי השם שלה ב-Slice בלי לייבא אותה
        dispatch({ type: 'projects/addProject', payload: newProject });
        
        navigate('/AllProject');
    };

    return (
        <Box sx={{ p: 4, bgcolor: '#ffffff', minHeight: '100vh', direction: 'rtl' }}>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', borderRadius: 3 }}>
                <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={() => navigate('/AllProject')}
                    sx={{ mb:3 }}
                >
                    חזור לרשימה
                </Button>

                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    הוספת פרויקט חדש
                </Typography>

                <Stack spacing={3} sx={{ mt: 2 }}>
                    <TextField
                        label="שם הפרויקט"
                        fullWidth
                        required
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <TextField
                        label="תיאור הפרויקט"
                        fullWidth
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* שדה התאריך שהוספנו */}
                    <TextField
                        label="תאריך פרויקט"
                        type="date"
                        fullWidth
                        value={projectDate}
                        onChange={(e) => setProjectDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        sx={{ py: 1.5 }}
                    >
                        שמור פרויקט
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default AddProject;