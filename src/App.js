import React from "react";
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Brands from "./Brands";
import Models from "./Models";
import YearModels from "./YearModels";

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
          <Route path="/:brandId/models/:modelId" component={YearModels} />
          <Route path="/:brandId/models" component={Models} />
          <Route exact={true} path="/" component={Brands} />
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
