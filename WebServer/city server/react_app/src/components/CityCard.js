import React, { Component } from "react";
import {
	Card,
	CardContent,
	Typography,
	CardActionArea
} from "@material-ui/core";
import axios from "axios";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCityInfos } from "../actions/citiesActions";
import CityDetail from "./CityDetail";

const style = {
	root: {
		minWidth: 250,
		maxWidth: 300,
		margin: 20,
		backgroundColor: "#2e2e2e"
	},
	title: {
		fontSize: 24
	}
};

class CityCard extends Component {
	state = {
		temp: undefined,
		humidity: undefined,
		id: undefined,
		detailOpen: false
	};
	componentDidMount() {
		const { city } = this.props;
		if (city.openWeather) {
			axios
				.get(
					"http://api.openweathermap.org/data/2.5/weather?q=" +
						city.cityName +
						"&units=metric&lang=fr&appid=a28aa797e78814860d441a08242c554b"
				)
				.then(res => {
					//console.log(res);
					this.setState({
						temp: res.data.main.temp,
						humidity: res.data.main.humidity,
						id: res.data.id
					});
				});
		} else {
			axios
				.get(
					"http://api.thingspeak.com/channels/997472/feeds.json?api_key=CBO5J9VCE5IQ5EA3&results=1"
				)
				.then(res => {
					this.setState({
						temp: res.data.feeds[0].field1,
						humidity: res.data.feeds[0].field2
					});
				});
		}
	}
	handleClick = () => {
		this.setState({ detailOpen: !this.state.detailOpen });
	};

	render() {
		const { classes, city } = this.props;
		const { temp, humidity, detailOpen } = this.state;

		return (
			<div>
				<Card className={classes.root} variant="outlined">
					<CardActionArea onClick={this.handleClick}>
						<CardContent>
							<Typography
								className={classes.title}
								color="textSecondary"
								gutterBottom
							>
								{city.cityName}
							</Typography>
							<Typography variant="h5" component="h2">
								Température : {temp}°C
							</Typography>
							<Typography variant="body2" component="p">
								Humidité: {humidity}%
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
				<CityDetail
					open={detailOpen}
					handleClose={this.handleClick}
					cityName={city.cityName}
					openw={city.openWeather}
				/>
			</div>
		);
	}
}

export default withStyles(style)(CityCard);
