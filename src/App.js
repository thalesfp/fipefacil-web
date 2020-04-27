import React from "react";
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Brands from "./Brands";
import Models from "./Models";
import YearModels from "./YearModels";

import appSyncConfig from "../aws-exports";

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
  },
});

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact={true} path="/" component={Brands} />
          <Route path="/:brandId/models/:modelId" component={YearModels} />
          <Route path="/:brandId/models" component={Models} />
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
