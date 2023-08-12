/**
 * app.get ile başlayan route methodu içerisinde bulunan parametreleri ve response'ları parse eder.
 * @param {object} (routes) - route methodları içerisinde bulunan parametre ve response'ları içeren obje
 * @returns {string} - string haline getirilmiş route methodları
 * Swagger UI üzerinde gösterilecek olan parametre ve response'ları parse eder.
 * Mongo DB methodları çağrılır.
 */
module.exports = function (routes){

    let parseRoutes = "";
    if(routes){
        for (const item of Object.values(routes)) {
            /* route parametreleri burada parse edilecek*/
            let parseParameters = "";
            if(!!item.parameters){
                for (const prm of Object.values(item.parameters)) {
                    parseParameters += `/* 
            #swagger.parameters['${prm.name}'] = {
               in: '${prm.in}',
               description: '${prm.description}',
               type: '${prm.type}',
               required: ${(prm.required === "on")}
                } 
            */
                `;
                }
            }

            // route response'ları burada parse edilecek
            let parseResponses = "";
            if(item.responses){
                parseResponses = "";
                for (const resp of Object.values(item.responses)) {
                    parseResponses += `/* 
                #swagger.responses[${resp.code}] = {
                   description: '${resp.description}',
                   ${resp.schema ? "schema:"+resp.schema : ""}
                }
                */
                `;
                }
            }

            // db sorguları burada parse edilecek
            let dbquery="";
            if(item.method === 'get'){
                parseParameters += `/*
                #swagger.parameters['query'] = {
                   in: 'query',
                   description: 'For search.',
                    type: "object"
                };
                #swagger.parameters['sort'] = {
                   in: 'query',
                   description: 'For sort.',
                    "type": "object"
                };
                */`;
                dbquery = `
                    const findQuery = JSON.parse(req.query.query || "{}");
                    const mySort = JSON.parse(req.query.sort || "{}");
                    const tableName =  '${item.url}';
                    const dbData = await findDatas(tableName,findQuery,mySort,100);
                `;
            }
            else if(item.method === 'post'){
                dbquery = `
                    /* 
                        #swagger.parameters['body'] = {
                           in: 'body',
                           description: '',
                           type: '',
                           required: false
                        } 
                    */
                    const params = req.body;
                    const tableName =  '${item.url}';
                    const dbData = await insertDatas(tableName,params);
                `;
            }
            else if(item.method === 'put'){
                dbquery = "const dbData = await updateDatas();";
            }
            else if(item.method === 'delete'){
                dbquery = "const dbData = await deleteDatas();";
            }

            //son olarak tüm parse edilenler birleştirilip string haline getirilir.
            parseRoutes += `
                app.${item.method}('${item.url}',  async (req, res) => {
                    /* #swagger.tags = ['${item.tags}'] */
                    /* #swagger.summary = '${item.summary}' */
                    /* #swagger.description = '${item.description}' */
                    ${parseParameters}
                    ${parseResponses}
                    ${dbquery}
                    res.json({data:dbData});
                
                });
            `;
        }
    }
    return parseRoutes;
}