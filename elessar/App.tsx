import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import Login from './pages/Login/login'

export default function App(){
  return (
    <NativeRouter>
      <Route exact path="/" component={Login} />
  </NativeRouter>
  );
}

AppRegistry.registerComponent("App", () => App);
