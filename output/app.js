
        const express = require("express");
        const app = express();
        
        const bodyParser = require('body-parser')
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded());
        app.use(bodyParser.urlencoded({ extended: true }));
    
        
        
        const { MongoClient, ServerApiVersion } = require('mongodb');
    
        
        const uri = "mongodb+srv://erdodo:Erdo112233.@nocodedb.sgb5kwt.mongodb.net";
    
        
        const client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
        });
    
        
        async function insertDatas(collectionName,datas) {
            await client.connect();
            const db =  client.db("nocodetest");
            const collection = db.collection(collectionName);
            return await collection.insertOne(datas);
        }
        async function findDatas(collectionName,query={},sort={},limit=100) {
            await client.connect();
            const db =  client.db("nocodetest");
            const collection = db.collection(collectionName);
            return await collection.find(query).sort(sort).limit(limit).toArray();
        }
        async function updateDatas(collectionName,query,datas) {
            await client.connect();
            const db =  client.db("nocodetest");
            const collection = db.collection(collectionName);
            return await collection.updateMany(query, {$set:datas});
        }
        async function deleteDatas(collectionName,query) {
            await client.connect();
            const db =  client.db("nocodetest");
            const collection = db.collection(collectionName);
            return await collection.deleteMany(query);
        }
    
    
        
                app.post('/test',  async (req, res) => {
                    /* #swagger.tags = ['test'] */
                    /* #swagger.summary = '' */
                    /* #swagger.description = '' */
                    
                    
                    
                    /* 
                        #swagger.parameters['body'] = {
                           in: 'body',
                           description: '',
                           type: '',
                           required: false
                        } 
                    */
                    const params = req.body;
                    const tableName =  '/test';
                    const dbData = await insertDatas(tableName,params);
                
                    res.json({data:dbData});
                
                });
            
        
        /* swagger dosyasını otomatik oluştur */
        const swaggerAutogen = require('swagger-autogen')();
        const doc = {
            info: {
                title: 'TestPage',
                description: 'TestDescription',
            },
            host: 'localhost:81',
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
    
        
    function success(data){
        return {
            message:"success",
            data:data
        }   ;
    }
    function error(data,code,msg){
        return {
            message:msg,
            code:code,
            data:data
        };
    }
    
        app.listen(81, () => {
            console.log(`Example app listening on port 81`);
        });
    