const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const cryptoSchema = new Schema({

    date: {
        type: String,
    }

}, { strict: false, timestamps: true });
var cryptoModel = mongoose.model('exchangeList', cryptoSchema);
module.exports = cryptoModel;