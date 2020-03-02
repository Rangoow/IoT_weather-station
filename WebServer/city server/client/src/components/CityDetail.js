import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Dialog, Slide, DialogTitle, DialogContent } from "@material-ui/core";

import axios from "axios";
import uuid from "uuid";
import { Line } from "react-chartjs-2";

const data = (labels, temps, humidities) => {
	return {
		labels: labels,
		datasets: [
			{
				label: "Températures",
				borderColor: "#f96332",
				pointBorderColor: "#FFF",
				pointBackgroundColor: "#f96332",
				pointBorderWidth: 2,
				pointHoverRadius: 4,
				pointHoverBorderWidth: 1,
				pointRadius: 4,
				fill: true,
				borderWidth: 2,
				data: temps
			},
			{
				label: "Humidité",
				borderColor: "#14ad2b",
				pointBorderColor: "#FFF",
				pointBackgroundColor: "#14ad2b",
				pointBorderWidth: 2,
				pointHoverRadius: 4,
				pointHoverBorderWidth: 1,
				pointRadius: 4,
				fill: true,
				borderWidth: 2,
				data: humidities
			}
		]
	};
};
const options = {
	maintainAspectRatio: false,
	legend: {
		display: false
	},
	tooltips: {
		bodySpacing: 4,
		mode: "nearest",
		intersect: 0,
		position: "nearest",
		xPadding: 10,
		yPadding: 10,
		caretPadding: 10
	},
	responsive: 1,
	scales: {
		yAxes: [
			{
				ticks: {
					display: true,
					padding: 15
				},
				gridLines: {
					zeroLineColor: "transparent",
					drawTicks: false,
					display: false,
					drawBorder: false
				}
			}
		],
		xAxes: [
			{
				display: 1,
				ticks: {
					display: true,
					padding: 15
				},
				gridLines: {
					zeroLineColor: "transparent",
					drawTicks: false,
					display: false,
					drawBorder: false
				}
			}
		]
	},
	layout: {
		padding: { left: 10, right: 10, top: 15, bottom: 15 }
	}
};

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
	},
	graph: {
		height: 400
	}
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

class CityDetail extends Component {
	state = { name: undefined, temps: [] };

	componentDidMount() {
		const { openw } = this.props;
		if (!openw)
			axios
				.get(
					"http://api.thingspeak.com/channels/997472/feeds.json?&results=100&api_key=CBO5J9VCE5IQ5EA3"
				)
				.then(res => {
					this.setState({
						dates: res.data.feeds.map(x => x.created_at),
						temps: res.data.feeds.map(x => x.field1),
						humidities: res.data.feeds.map(x => x.field2)
					});
				});
	}

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
			id: uuid(),
			city: this.state.name,
			temp: 15,
			humidity: 12
		};
		this.props.addCity(newCity);
		this.handleCancel();
	};
	render() {
		const { classes, open, handleClose, cityName, openw } = this.props;
		const { dates, temps, humidities } = this.state;
		return (
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
				maxWidth="xl"
				fullWidth={!openw}
			>
				<DialogTitle id="alert-dialog-slide-title">{cityName}</DialogTitle>
				<DialogContent className={classes.modal}>
					{!openw ? (
						<Line
							data={data(dates, temps, humidities)}
							options={options}
							className={classes.graph}
						></Line>
					) : (
						"Affichage de l'historique impossible car la fonctionnalité est payante sur l'api openweather"
					)}
				</DialogContent>
			</Dialog>
		);
	}
}

export default withStyles(style)(CityDetail);
