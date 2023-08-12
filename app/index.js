const routes = require('./routes');
const mongo = require('./mongo');
const status = require('./status');
const swagger = require('./swagger');
const config = require('./config');
const fs = require("fs");
module.exports=function createFile(query){
    const {title,description,host,db} = query;
    const routeVar = query.routes;
    const fileText =  `
        const express = require("express");
        const app = express();
        ${config()}
        ${mongo(db)}
        ${routes(routeVar)}
        ${swagger(title,description,host)}
        ${status()}
        app.listen(81, () => {
            console.log(\`Example app listening on port 81\`);
        });
    `;
    const outputFileName = "output/config.json";
    fs.open(outputFileName, 'w' , function (err, file) {
        if (err) throw err;
        fs.writeFile(outputFileName, JSON.stringify(query), function (err) {
            if (err) throw err;
            console.log('File update!');
        });
    });
    const dev = true;
    return dev ? fileText : minify(fileText);
}
function minify(text){
    return text.replaceAll('\n','').replaceAll('\t','').replaceAll('  ','');
}