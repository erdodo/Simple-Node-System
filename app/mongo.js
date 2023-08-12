/**
 * MongoDb bağlantı ve işlemlerini gerçekleştiren fonksiyonları içeren dosya
 * @param {Object} db
 * @param {string} db.username
 * @param {string} db.password
 * @param {string} db.host
 * @param {string} db.name
 * @param {string} db.collection
 */
module.exports= function (db){
    const imports = `
        const { MongoClient, ServerApiVersion } = require('mongodb');
    `;
    const uri = `
        const uri = "mongodb+srv://${db.username}:${db.password}@${db.host}";
    `;
    const client = `
        const client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
        });
    `;
    const methods=`
        async function insertDatas(collectionName,datas) {
            await client.connect();
            const db =  client.db("${db.name}");
            const collection = db.collection(collectionName);
            return await collection.insertOne(datas);
        }
        async function findDatas(collectionName,query={},sort={},limit=100) {
            await client.connect();
            const db =  client.db("${db.name}");
            const collection = db.collection(collectionName);
            return await collection.find(query).sort(sort).limit(limit).toArray();
        }
        async function updateDatas(collectionName,query,datas) {
            await client.connect();
            const db =  client.db("${db.name}");
            const collection = db.collection(collectionName);
            return await collection.updateMany(query, {$set:datas});
        }
        async function deleteDatas(collectionName,query) {
            await client.connect();
            const db =  client.db("${db.name}");
            const collection = db.collection(collectionName);
            return await collection.deleteMany(query);
        }
    `

    return `
        ${imports}
        ${uri}
        ${client}
        ${methods}
    `;
}