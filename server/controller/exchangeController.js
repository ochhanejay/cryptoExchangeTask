const express = require("express");
const cryptoModel = require("../models/cryptoModel");
const cryptoIconModel = require("../models/cryptoIcons");
const axios = require("axios");


app = express();
exports.getExchangeList = async (req, res, next) => {

    try {
        const page = req.query.page;
        const limit = req.query.size;
        const search = req.query.searchKey;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let files;
        if (search) {
            files = await cryptoModel.aggregate([


                {
                    $lookup: {
                        from: "exchangelisticons",
                        localField: "exchange_id",
                        foreignField: "exchange_id",
                        as: "icon",
                    },
                },
                {
                    $match: {
                        // "customer.CustomerName": { $regex: search,$options: "i" },
                        "name": { $regex: search, $options: "i" },
                    },
                },

            ]);
        }
        else {
            files = await cryptoModel.aggregate([


                {
                    $lookup: {
                        from: "exchangelisticons",
                        localField: "exchange_id",
                        foreignField: "exchange_id",
                        as: "icon",
                    },
                },

            ]);
        }


        const data = files.slice(startIndex, endIndex);
        let newData;
        if (page === "-1") {
            newData = files;
        } else {
            newData = data;
        }
        res.send({ data: newData, count: files.length, status: 200, message: "success" });



    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
}


exports.addExchangeData = async (req, res) => {


    let icons = await axios.get(`https://rest.coinapi.io/v1/exchanges/icons/32?apikey=452778FC-E703-446F-93C3-8678F769F303`);
    try {
        let data = await axios.get(`https://rest.coinapi.io/v1/exchanges?apikey=452778FC-E703-446F-93C3-8678F769F303`);

        const exchangeData = await cryptoModel.insertMany(data.data)
            .then(function (docs) {
                console.log('Exchange List Inserted');
            })
            .catch(function (err) {
                console.log(err);
            });



        const exchangeDataIcons = await cryptoIconModel.insertMany(icons.data)
            .then(function (docs) {
                console.log('Icon List Inserted');
            })
            .catch(function (err) {
                console.log(err);
            });
        res.status(200).json({ data: exchangeData, exchangeDataIcons });
    }
    catch (error) {
        console.log(error)

    }

};
// exports.getMonthlyExpensesByDate = async (req, res) => {
//   try {

//     const data = await MonthlyExpenseModel.find({ month: req.query.month });

//     res.send({ "data": data });
//   } catch (error) {
//     res.status(400).send(error.message);
//     console.log(error);
//   }

// };

