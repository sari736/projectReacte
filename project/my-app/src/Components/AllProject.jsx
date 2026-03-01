import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CardActionArea, Grid, Button, CardMedia, CardActions } from '@mui/material';

const AllProject = () => {
    // הפרויקטים נכנסים למערך פרטי פרויקטים
    const projects = [
        { id: 'ריאקט', name: 'פרויקט לדוגמה' ,date:'01/01/2020'},
        { id: 'c#', name: 'פרויקט לדוגמה',date:'01/01/2020' },
        { id: 'node.js', name: 'פרויקט לדוגמה',date:'01/01/2020'},
        { id: 'pyton', name: 'פרויקט לדוגמה' ,date:'01/01/2020'}

    ];
    return (
        <>
            AllProject
            <Grid container spacing={3} sx={{ padding: 3, justifyContent: 'center' }}>
                {projects.map((project) => (
                    <Grid item key={project.id}>
                        <Card sx={{ width: 300, textAlign: 'center' }}>
                            {/* ה-CardActionArea הופך את כל השטח ללחיץ */}
                            {/* ה-component={Link} הופך אותו לקישור של React Router */}
                            <CardActionArea component={Link} to={`/AllProject/${project.id}`}>
                                <CardContent sx={{ height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                       שם הפרויקט: {project.id}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {/* כאן נכנס שם הפרויקט או התיאור שלו */}
                                        תאור הפרויקט: {project.name || "ללא שם"}
                                    </Typography>
                                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.disabled', fontStyle: 'italic' }}>
                                       תאריך יצירה: {project.date}
                                     </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" sx={{width: '300px',height: '80px',fontSize: '2rem' }} 
                    disableElevation  component={Link} to="/AddProject"> להוספת פרויקט</Button>

        </>
    )
}
export default AllProject;
