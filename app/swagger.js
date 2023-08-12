/*
* Swagger dosyasını otomatik oluşturmak için kullanılan fonksiyon
* @param {string} title - swagger dosyasının başlığı
* @param {string} description - swagger dosyasının açıklaması
* @param {string} host - swagger dosyasının host adresi
* */
module.exports = function (title, description, host){
    return`
        /* swagger dosyasını otomatik oluştur */
        const swaggerAutogen = require('swagger-autogen')();
        const doc = {
            info: {
                title: '${title}',
                description: '${description}',
            },
            host: '${host}',
            schemes: ['http'],
        };
        const outputFile = './swagger_output.json';
        const endpointsFiles = ['./app.js'];
    
       swaggerAutogen(outputFile, endpointsFiles, doc).then(r =>{
            /* swagger dosyasını oku */
            const swaggerUi = require('swagger-ui-express');
            const swaggerFile = require('./swagger_output.json');
            app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
        });
    `;
}