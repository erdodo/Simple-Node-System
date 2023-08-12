const { join, basename } = require("path");
const router = require("express").Router();
const fs = require("fs");
const createFile = require("../app/index");

/**
 * in: 'path', 'header', 'query', 'body', 'formData', etc. // by default is 'query'
 * description: The parameter description
 * required: true or false
 * type: 'string', 'number', 'boolean', 'integer' or 'array'. // by default is 'string' when 'schema' is missing
 * format: 'int64', etc.
 */

// üzerini çiz // #swagger.deprecated = true
router.post("/config", (req, res) => {
  const config = require("../output/config.json");
  res.json(config);
});
router.post("/api/add", (req, res) => {
  const outputFileName = "output/app.js";
  fs.open(outputFileName, "w", function (err, file) {
    if (err) throw err;
    fs.writeFile(outputFileName, createFile(req.body), function (err) {
      if (err) throw err;
      console.log("File update!");
      res.send("File update!");
      const filePath = __dirname + "/../" + outputFileName;
      /*res.download(
                      filePath,
                      "app.js", // Remember to include file extension
                      (err) => {
                          if (err) {
                              res.send({
                                  error : err,
                                  msg   : "Problem downloading the file"
                              })
                          }else{
                              console.log("File downloaded successfully");
      
                          }
                      });*/
    });
  });
});

module.exports = router;
