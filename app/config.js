module.exports=function (){
    return`
        const bodyParser = require('body-parser')
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded());
        app.use(bodyParser.urlencoded({ extended: true }));
    `
}