const express = require("express");
const app = express();


const config = require('./config');
app.use(config);
console.log("config ok")

const middleware = require('./middleware');
app.use(middleware.cors);
console.log("middleware ok")

const router = require('./router');
const path = require("path");
app.use(router);
console.log("router ok")





app.listen(80, () => {
    console.log(`Example app listening on port 80`);
});
