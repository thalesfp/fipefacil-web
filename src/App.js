import React from "react";
import AWSAppSyncClient from "aws-appsync";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

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
          <Route exact={true} path="/:vehicleType/marcas" component={Brands} />
          <Redirect to="/carros/marcas" />
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
