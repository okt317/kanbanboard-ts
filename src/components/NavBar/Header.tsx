import React from "react";
import AppBar from '@mui/material/AppBar'
import {Toolbar, Typography} from "@mui/material";

export const Header = () => {
    return(
        <AppBar position='fixed'>
            <Toolbar>
                <Typography variant="h6">
                    Kanban board
                </Typography>
            </Toolbar>
        </AppBar>
    )
}