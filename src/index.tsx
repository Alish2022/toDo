import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createTheme, ThemeProvider} from "@mui/material";
import {blue, green, grey, lightBlue, lightGreen, red, yellow} from "@mui/material/colors";
import {dark, light} from "@mui/material/styles/createPalette";
import CssBaseline from '@mui/material/CssBaseline';

const theme=createTheme({
    palette:{
        primary:blue,
        secondary:green,
        mode:"dark"
    }
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App />
    </ThemeProvider>

    ,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();