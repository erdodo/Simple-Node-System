const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'NoCodeNode',
        description: 'v0.0.1',
    },
    host: 'localhost',
    schemes: ['http'],
};
const outputFile = './swagger_output.json'
const endpointsFiles = ['./router/index.js']

swaggerAutogen(outputFile, endpointsFiles,doc)

console.log("swagger updated")