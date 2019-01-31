const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

exports.handler =  (event, context, callback) => {
  const done = (err, res) => callback(null, {
     statusCode: err ? '400' : '200',
     body: err ? err.message : JSON.stringify(res),
     headers: {
          'Access-Control-Allow-Origin' : '*'
       }
       
  });
  let params = {
          TableName: 'pedidos'
      }
  switch(event.httpMethod){
        
        case 'GET':
            const user = event.queryStringParameters.user
            params.KeyConditionExpression = 'usuario = :user';
            params.ExpressionAttributeValues = {':user': user}
            dynamo.query(params,done);
            const teste = event.requestContext.authorizer.claims['cognito:username']
            

            break;
        case 'POST':
            //Realizar uma insercao no banco
            params.Item = JSON.parse(event.body)
            dynamo.putItem(params,done)
            
            break;
        default:
            done(new Error('Metodo nao suportado'))
  }
};
