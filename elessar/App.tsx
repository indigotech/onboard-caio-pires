import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import Login from './pages/Login/login'
import Home from './pages/Home/home'
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>    
    </NavigationContainer>
  );
}
AppRegistry.registerComponent("App", () => App);
