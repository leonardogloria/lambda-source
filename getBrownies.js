const doc = require('dynamodb-doc')
const dynamo = new doc.DynamoDB();
exports.handler = (event,context,callback) =>{
   const done = (err, res) => callback(null, {
       statusCode: err ? '400' : '200',
       body: err ? err.message : JSON.stringify(res),
       headers: {
          'Access-Control-Allow-Origin' : '*'
       }
       
   });
   const params = {
       TableName: 'produtos'
   }
   if(event.httpMethod === 'GET'){
      
      console.log(event.pathParameters !== null)
      if(event.pathParameters !== null){
         const id = event.pathParameters.id

            params.KeyConditionExpression = "#uuid = :id"
            params.ExpressionAttributeNames = { 
               "#uuid" : 'uuid'
            }
            params.ExpressionAttributeValues = { 
               ":id" : id
               
            }
            dynamo.query(params,done)
         } else {
            dynamo.scan(params,done); 

         // Se vier alguem na URL
      }
   }else {
         done(new Error('Metodo Nao Suportado'))
   }
   
}