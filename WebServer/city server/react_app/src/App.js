import React, { Component } from "react";
import MainPage from "./components/Main";
import "./App.css";

import { createMuiTheme, MuiThemeProvider, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3"
    }
  }
});

const style = {
  paper: {
    top: 0,
    height: "100vh"
  }
};
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.paper}>
          <MainPage />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(style)(App);
