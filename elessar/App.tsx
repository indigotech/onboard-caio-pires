import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import Login from './pages/Login/login'
import Home from './pages/Home/home'
import AddUserPage from './pages/AddUserPage/AddUserPage'
import UserDetailsPage from './pages/UserDetailsPage/UserDetailsPage'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Add User" component={AddUserPage}/>
        <Stack.Screen name="User Details" component={UserDetailsPage}/>
      </Stack.Navigator>    
    </NavigationContainer>
  );
}
AppRegistry.registerComponent("App", () => App);
