const express = require("express");
const weatherApi = require("../../WeatherAPI/weather");
const weatherEsp = require("../../WeatherAPI/ESPWeather");
const router = express.Router();

//Item model

const Item = require("../../models/Item");

// @routes GET api/items
// @desc  get all items
// @access  Public

router.get("/", (req, res) => {
	Item.find({}).then(items => res.json(items));
});

// @routes POST api/items
// @desc  creat an item
// @access  Public

router.post("/", (req, res) => {
	const newItem = new Item({
		cityName: req.body.cityName,
		openWeather: req.body.openWeather
	});
	newItem.save().then(item => res.json(item));
});

// @routes DELETE api/items
// @desc  delete an item
// @access  Public

router.delete("/:id", (req, res) => {
	Item.findById(req.params.id)
		.then(item => item.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
