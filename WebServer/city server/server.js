const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

// Init cors
app.use(cors());

// BodyParser MiddleWare
app.use(bodyParser.json());

// Serve static assets if production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("react_app/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "react_app", "build", "index.html"));
	});
}
// DB Config
const db = require("./config/keys").mongoURI;

// Mongo connect
mongoose
	.connect(db)
	.then(() => console.log("Database connected"))
	.catch(err => console.log(err));

// use routes
app.use("/api", items);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server start on port: ${port}`));
