
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CardActionArea, Grid, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProject, updateProject } from '../store/projectsSlice'; 
import EditProject from './EditProject';

const AllProject = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentPage, setCurrentPage] = useState('all'); 

    const allProjects = useSelector((state) => state.projects);

    // פונקציות לתפריט
    const handleOpenMenu = (event, project) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setSelectedProject(project);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        if (selectedProject) {
            dispatch(deleteProject(selectedProject.id)); 
            handleCloseMenu();
            setSelectedProject(null);
        }
    };

    // פונקציה ששומרת את העריכה ומחזירה למסך הראשי
    const onSaveUpdate = (updatedData) => {
        dispatch(updateProject({ 
            id: selectedProject.id, 
            updatedProject: updatedData 
        }));
        setCurrentPage('all');
        setSelectedProject(null);
    };

    // בדיקה: אם אנחנו במצב עריכה, נציג את הקומפוננטה של העריכה
    if (currentPage === 'edit' && selectedProject) {
        return (
            <EditProject 
                project={selectedProject} 
                onSave={onSaveUpdate} 
                onBack={() => setCurrentPage('all')} 
            />
        );
    }

    return (
        <>
            <Typography variant="h4" sx={{ textAlign: 'center', my: 3, fontWeight: 'bold' }}>
                הפרויקטים שלי
            </Typography>

            <Grid container spacing={3} sx={{ padding: 3, justifyContent: 'center' }}>
                {allProjects.map((project) => (
                    <Grid item key={project.id}>
                        <Card sx={{ width: 300, textAlign: 'center', position: 'relative' }}>
                            <IconButton 
                                size="small" 
                                onClick={(e) => handleOpenMenu(e, project)}
                                sx={{ position: 'absolute', left: 8, top: 8, zIndex: 2 }}
                            >
                                <MoreVertIcon fontSize="small" />
                            </IconButton>

                            <CardActionArea component={Link} to={`/AllProject/${project.id}`}>
                                <CardContent sx={{ height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {project.name || "ללא שם"}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {project.description || "אין תיאור"}
                                    </Typography>
                                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.disabled' }}>
                                       תאריך: {project.date}
                                     </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* התפריט שנפתח */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => { setCurrentPage('edit'); setAnchorEl(null); }}>
                    <EditIcon fontSize="small" sx={{ ml: 1 }} /> עריכת פרויקט
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ ml: 1 }} /> מחיקת פרויקט
                </MenuItem>
            </Menu>

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <Button 
                    variant="contained" 
                    sx={{ width: '300px', height: '80px', fontSize: '1.5rem' }} 
                    disableElevation 
                    component={Link} 
                    to="/AddProject"
                >
                    להוספת פרויקט
                </Button>
            </Box>
        </>
    );
};

export default AllProject;



