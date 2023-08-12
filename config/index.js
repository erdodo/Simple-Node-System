const config = require('express').Router();
const express = require("express");

//swagger ui çalışması için gerekli dosyalar
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
config.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const bodyParser = require('body-parser')
config.use(bodyParser.json());
config.use(bodyParser.urlencoded());
// in latest body-parser use like below.
config.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();

const path = require('path');

const dir = path.join(__dirname, 'public');
config.use(express.static("public"));




module.exports = config;
