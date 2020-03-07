import React from 'react';
import {createMuiTheme, Paper} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core";
import "./styles/sass/App.sass"

import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";


import './styles/App.css';
import SignUp from "./components/signup";
import Login from "./components/login";

import {
    Container
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme({
    palette: {
        primary: {main: '#7c035c'},
        secondary: {main: '#ff7e33', contrastText: '#ffffff'}
    }
});

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>

                <Container fixed>
                    <Grid
                        className={"contain"}
                        container
                        direction={"row"}
                        justify={"center"}
                        alignItems={"center"}
                    >

                        <Route path={"/signup"} component={SignUp}/>
                        <Route path={"/login"} component={Login}/>



                    </Grid>

                </Container>
            </ThemeProvider>

        </Router>
    );
}

export default App;
