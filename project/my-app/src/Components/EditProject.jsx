import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, Stack } from '@mui/material';

const EditProject = ({ project, onBack, onSave }) => {
    // אתחול ה-State עם הפרטים הקיימים של הפרויקט
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);

    const handleSave = () => {
        onSave({
            name: name,
            description: description,
        });
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', direction: 'rtl' }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                עריכת פרויקט: {project.name}
            </Typography>
            
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Stack spacing={3}>
                    {/* שדה עריכת שם */}
                    <TextField 
                        fullWidth 
                        label="שם הפרויקט" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />

                    {/* שדה עריכת תיאור */}
                    <TextField 
                        fullWidth 
                        label="תיאור הפרויקט" 
                        multiline 
                        rows={4} 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />

                    {/* כפתורי פעולה */}
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={onBack}>
                            ביטול
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            עדכון פרויקט
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
};

export default EditProject;