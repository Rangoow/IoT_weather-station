const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const ItemSchema =  new Schema ({
    cityName:{
        type: String,
        required:true,
    },
    openWeather:{
        type:Boolean,
        default:false,
    }
});

module.exports =  Item = mongoose.model('item',ItemSchema);
