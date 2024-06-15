exports.handler = async (event, context) => {
    
    const routeForSignup = process.env.ROUTE_FOR_SIGNUP;
    const routeForAuth = process.env.ROUTE_FOR_AUTH;

    context.res.setHeader('ROUTE_FOR_SIGNUP', routeForSignup);
    context.res.setHeader('ROUTE_FOR_AUTH', routeForAuth);
  
    return {
      statusCode: 204, 
    };
  };
  