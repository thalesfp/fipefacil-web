import React from "react";
import AWSAppSyncClient from "aws-appsync";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import Brands from "./views/Brands";
import Models from "./views/Models";
import YearModels from "./views/YearModels";

const client = new AWSAppSyncClient({
  url: process.env.REACT_APP_APPSYNC_ENDPOINT,
  region: process.env.REACT_APP_APPSYNC_REGION,
  auth: {
    type: process.env.REACT_APP_APPSYNC_AUTHENTICATION_TYPE,
    apiKey: process.env.REACT_APP_APPSYNC_API_KEY,
  },
});

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route
            path="/:vehicleType/marcas/:brandId/modelos/:modelId"
            component={YearModels}
          />
          <Route
            path="/:vehicleType/marcas/:brandId/modelos"
            component={Models}
          />
          <Route path="/:vehicleType/marcas" component={Brands} />
          <Route exact={true} path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

function WithProvider() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default WithProvider;
