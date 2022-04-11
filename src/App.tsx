import React from 'react';
import {Header} from "./components/NavBar/Header";
import {MainPage} from "./components/Main/MainPage";
import {CssBaseline, Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    content: {
        flex: '1 1 auto',
        padding: '64px 15px 15px',
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
    },
}));

function App() {
    const classes = useStyles()
    return (
        <Grid container>
            <CssBaseline />
            <Header />
            <main className={classes.content}>
                <MainPage />
            </main>
        </Grid>
    );
}

export default App;
