import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import Login from './pages/Login/login'
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const cache = new InMemoryCache();


export const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: cache,
});

export default function App(){
  return (
    <NativeRouter>
      <Route exact path="/" component={Login} />
    </NativeRouter>
  );
}

// module.exports = client;
AppRegistry.registerComponent("App", () => App);
