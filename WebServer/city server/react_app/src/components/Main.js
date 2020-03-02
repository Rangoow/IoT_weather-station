import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import CityCard from "./CityCard";

import { Grid } from "@material-ui/core";
import NavBar from "./NavBar";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCities } from "../actions/citiesActions";

const styles = theme => ({
	root: {
		display: "flex"
	},
	cards: {
		paddingTop: 70
	}
});

class MainPage extends Component {
	state = { open: false };

	toggleDrawer = () => {
		this.setState({ open: !this.state.open });
	};

	componentDidMount() {
		this.props.getCities();
	}

	render() {
		const { classes } = this.props;
		const { cities } = this.props.city;
		return (
			<div>
				<NavBar />
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					className={classes.cards}
				>
					{cities.map(city => (
						<CityCard city={city} key={city._id}></CityCard>
					))}
				</Grid>
			</div>
		);
	}
}

MainPage.propTypes = {
	getCities: PropTypes.func.isRequired,
	cities: PropTypes.object
};

const mapStateToProps = state => ({
	city: state.city
});

export default connect(mapStateToProps, { getCities })(
	withStyles(styles)(MainPage)
);
