import React from "react";
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
            path="/:vehicleType/:brandId/modelos/:modelId"
            component={YearModels}
          />
          <Route path="/:vehicleType/:brandId/modelos" component={Models} />
          <Route exact={true} path="/:vehicleType" component={Brands} />
        </Switch>
      </div>
    </Router>
  );
}

function WithProvider() {
  return (
    <ApolloProvider client={client}>
      <Rehydrated>
        <App />
      </Rehydrated>
    </ApolloProvider>
  );
}

export default WithProvider;
