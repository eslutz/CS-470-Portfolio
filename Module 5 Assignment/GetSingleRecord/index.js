/**********************************************************************
 *  Get single record from table
 **********************************************************************/

// we need access to the AWS SDK
var AWS = require("aws-sdk");

//  we need access to DynamoDB and choose the DocumentClient model
var docClient = new AWS.DynamoDB.DocumentClient();

const responseHeaders = {
  // HTTP headers to pass back to the client
  "Content-Type": "application/json",
  // the next headers support CORS
  "X-Requested-With": "*",
  "Access-Control-Allow-Headers":
    "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,*",
  // for proxies
  Vary: "Origin",
  // the "has-cors" library used by the Angular application wants this set
  "Access-Control-Allow-Credentials": "true",
};

exports.handler = async (event) => {
  // lets get just the root resource name with the plural ending
  let resource = event.resource.slice(
    event.resource.indexOf("/") + 1,
    event.resource.lastIndexOf("/") - 1
  );

  // lets get the path parameters
  let pathParameters = event.pathParameters;

  if (pathParameters && pathParameters.id && pathParameters.id.trim()) {
    // we have a path parameter and an id
    var id = pathParameters.id;
  }

  const paramQuery = async () => {
    // define our query
    let params = {
      TableName: resource,
      Key: {
        id: id,
      },
    };

    return new Promise((resolve, reject) => {
      var queryParams = docClient.get(params).promise();
      queryParams
        .then(function (data) {
          resolve({
            statusCode: 200,
            body: JSON.stringify(data),
            // HTTP headers to pass back to the client
            headers: responseHeaders,
          });
        })
        .catch(function (err) {
          reject(err);
        });
    });
  };

  return await paramQuery();
};
