const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const cryptoSchema = new Schema({

    date: {
        type: String,
    }

}, { strict: false, timestamps: true });
var cryptoIconModel = mongoose.model('exchangeListIcons', cryptoSchema);
module.exports = cryptoIconModel;