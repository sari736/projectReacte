import '../App.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box, Typography, Grid, Paper, IconButton, Menu, MenuItem, Button, Stack, Divider
} from '@mui/material';
import AddTask from './AddTask';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditTask from './EditTask';
import ChangeStatus from './ChangeStatus';
import { useSelector, useDispatch } from 'react-redux';
import {addTask, setTasks, deleteTask, updateTask  } from '../store/taskSlice';
const DetailsProject = () => {

    const { AllProjectId } = useParams(); 
    const dispatch=useDispatch();
    const [currentPage, setCurrentPage] = useState('details');
    const [menuData, setMenuData] = useState({ anchorEl: null, task: null });
    const tasks = useSelector((state) => state.tasks.items);

    // שמירת הנתונים בכל פעם שהמערך tasks משתנה
    useEffect(() => {
        dispatch(setTasks({ projectId: AllProjectId }));
    }, [AllProjectId,dispatch]);
    // פונקציה שמוסיפה משימה חדשה למערך

    const handleOpenMenu = (event, task) => {
        setMenuData({ anchorEl: event.currentTarget, task: task });
    };

    const handleCloseMenu = () => {
        setMenuData({ anchorEl: null, task: null });
    };
    const columns = [
        { id: 'todo', title: 'משימות שלא בוצעו', color: '#4caf50' },
        { id: 'in-progress', title: 'בביצוע מפתח', color: '#ff9800' },
        { id: 'review', title: 'מוכן לבדיקות', color: '#9c27b0' },
        { id: 'done', title: 'נבדקו ובוצעו', color: '#2196f3' },
    ];

    // מחיקת משימה 
    const DeleteTask = () => {
        if (menuData.task) {
            dispatch(deleteTask({ projectId: AllProjectId, taskId: menuData.task.id }));
            handleCloseMenu();
        }
    };
      // פונקציה לעדכון משימה קיימת במערך
      const onSaveUpdate = (updatedTask) => {
        dispatch(updateTask({ projectId: AllProjectId, updatedTask }));
        setCurrentPage('details');
    };
    //  בדיקה: אם המצב הוא 'add-task', נציג רק את קומפוננטת הוספת המשימה
    if (currentPage === 'add-task') {
        return <AddTask onSave={(newTask) => {
            dispatch(addTask({ projectId: AllProjectId, task: newTask }));
            setCurrentPage('details');
        }}
            onBack={() => setCurrentPage('details')} />;
    }
  
    // עריכת משימה
    if (currentPage === 'edit-task' && menuData.task) {
        return (
            <EditTask
                taskToEdit={menuData.task}
                onSave={onSaveUpdate}
                onBack={() => setCurrentPage('details')}
            />
        );
    }
    // שינוי סטטוס
    if (currentPage === 'change-status' && menuData.task) {
        return (
            <ChangeStatus
                taskToEdit={menuData.task}
                onSave={onSaveUpdate}
                onBack={() => setCurrentPage('details')}
            />
        );
    }
    return (
        <>
            <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh', direction: 'rtl' }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                    פרטי פרויקט: {AllProjectId}
                </Typography>
                <Grid container spacing={3}>
                    {columns.map((column) => (
                        <Grid item xs={12} sm={6} md={3} key={column.id}>
                            <Paper elevation={2} sx={{ p: 2, borderRadius: 2, bgcolor: '#ebedf0', minHeight: 400 }}>
                                {/* כותרת העמודה עם 3 נקודות */}
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: column.color }} />
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {column.title}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                {/* אזור הצגת המשימות */}
                                <Box sx={{ flexGrow: 1 }}>
                                    {/* סינון המשימות שמתאימות לעמודה הנוכחית */}
                                    {tasks.filter(t => t.status === column.id).length > 0 ? (
                                        tasks.filter(t => t.status === column.id).map((task) => (
                                            <Paper
                                                key={task.id}
                                                elevation={1}
                                                sx={{ p: 2, mb: 2, borderRadius: 2, bgcolor: 'white', position: 'relative', borderRight: `4px solid ${column.color}` }}
                                            >
                                                <IconButton size="small" onClick={(e) => handleOpenMenu(e, task)}
                                                    sx={{
                                                        position: 'absolute',
                                                        left: 8,
                                                        top: 8,
                                                        color: 'text.secondary'
                                                    }}>
                                                    <MoreVertIcon fontSize="small" />
                                                </IconButton>
                                                <Typography variant="subtitle2" fontWeight="bold">{task.name}</Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', mt: 0.5 }}>
                                                    {task.description}
                                                </Typography>
                                                <Divider sx={{ my: 1 }} />
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="caption" sx={{ bgcolor: '#f0f0f0', px: 1, borderRadius: 1 }}>
                                                        {task.priority}
                                                    </Typography>
                                                    <Typography variant="caption" color="primary">{task.dueDate}</Typography>
                                                </Stack>
                                            </Paper>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center', mt: 4 }}>
                                            אין משימות עדיין
                                        </Typography>
                                    )}
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Button
                                    startIcon={<AddIcon />}
                                    fullWidth
                                    onClick={() => setCurrentPage('add-task')} // משנה את ה-State
                                    sx={{ justifyContent: 'flex-start', color: 'text.secondary', textTransform: 'none' }}>
                                    הוסף משימה
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* תפריט אפשרויות (נפתח בלחיצה על 3 נקודות) */}
                <Menu
                    anchorEl={menuData.anchorEl}
                    open={Boolean(menuData.anchorEl)}
                    onClose={handleCloseMenu}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => {
                        setMenuData({ anchorEl: null, task: menuData.task });
                        setCurrentPage('edit-task');
                        // handleCloseMenu();
                    }}>
                        <EditIcon fontSize="small" sx={{ ml: 1 }} /> עריכת משימה
                    </MenuItem>
                    <MenuItem onClick={() => {
                        setMenuData({ anchorEl: null, task: menuData.task });
                        setCurrentPage('change-status');
                        // handleCloseMenu();
                    }}>
                        <EditIcon fontSize="small" sx={{ ml: 1 }} />שינוי סטטוס משימה
                    </MenuItem>
                    <MenuItem onClick={DeleteTask} sx={{ color: 'error.main' }}>
                        <DeleteIcon fontSize="small" sx={{ ml: 1 }} /> מחיקת משימה
                    </MenuItem>
                </Menu>
            </Box>
        </>
    )
}
export default DetailsProject;