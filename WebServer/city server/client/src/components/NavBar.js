import React, { Component } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import AddIcon from "@material-ui/icons/Add";
import AddCity from "./AddCity";

const style = {
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  addButton: {
    right: 0
  }
};

class NavBar extends Component {
  state = {
    addOpen: false
  };

  handleAddButton = () => {
    this.setState({ addOpen: !this.state.addOpen });
  };
  render() {
    const { classes } = this.props;
    const { addOpen } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap style={{ flex: 1 }}>
              La Météo
            </Typography>
            <Button
              className={classes.addButton}
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={this.handleAddButton}
            >
              Ajouter
            </Button>
          </Toolbar>
        </AppBar>
        <AddCity open={addOpen} handleClose={this.handleAddButton} />
      </div>
    );
  }
}

export default withStyles(style)(NavBar);
