import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import {
	Dialog,
	Slide,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField
} from "@material-ui/core";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCity } from "../actions/citiesActions";
import uuid from "uuid";

const style = theme => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

class AddCity extends Component {
	state = { name: undefined };

	handleNamechange = e => {
		this.setState({ name: e.target.value });
	};

	handleCancel = () => {
		this.setState({ name: undefined });
		this.props.handleClose();
	};
	handleAddCity = e => {
		e.preventDefault();

		const newCity = {
			name: this.state.name,
			openweather: true
		};
		this.props.addCity(newCity);
		this.handleCancel();
	};
	render() {
		const { classes, open, handleClose } = this.props;
		const { name } = this.state;
		return (
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					{"Ajouter une ville"}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						id="name"
						label="Ville"
						className={classes.formItems}
						defaultValue={name}
						onChange={this.handleNamechange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleCancel} color="secondary">
						Annuler
					</Button>
					<Button onClick={this.handleAddCity} color="primary">
						Ajouter
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

AddCity.propTypes = {
	addCity: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ city: state.city });

export default connect(mapStateToProps, { addCity })(
	withStyles(style)(AddCity)
);
