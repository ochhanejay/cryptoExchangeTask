require("dotenv").config({ path: "./config.env" });
const app = require("./index");
const mongoose = require("mongoose");
const responseTime = require('response-time');


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB connection successful!"))
    .catch((error) => console.log(error));


app.use(responseTime());
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`server is runnning at port ${port}!`));


