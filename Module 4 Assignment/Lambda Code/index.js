export const handler = async (event) => {
  var name = 'unknown';
  if (event.queryStringParameters && event.queryStringParameters.name) {
    console.log("Received name: " + event.queryStringParameters.name);
    name = event.queryStringParameters.name;
  }

  const response = {
    statusCode: 200,
    body: "Hello " + name,
  };
  
  // log the event to the logger
  console.log("Event: \n" + JSON.stringify(event));
  // log the response to the logger
  console.log("Response: \n" + JSON.stringify(response));
  
  return response;
};