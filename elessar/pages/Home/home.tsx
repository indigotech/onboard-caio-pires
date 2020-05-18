import React, { Component, useState, useEffect, Props } from 'react';
import { View, Keyboard, Image, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { getToken,  getUsers} from '../Login/requests'
import { retrieveData } from 'pages/Login/store';


interface HomeState {
    email: string,
    message: string,
    password: string,
}
export default class Home extends Component<{}, HomeState>{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: '',
            password: '',
        }
    }

        
    private showUsers = async () => {
        const token = await retrieveData('token');
        if(token){
            const result = await getUsers(token);
            console.log(result);
        }
        
            
    }

    render() {
        return (
            <View style={styles.OuterView}>
                <View style={styles.HeaderView} >
                    <Text style={styles.header}>Bem-vindo(a) à Home!</Text>
                </View >
            </View>
    );
    }

}


const styles = StyleSheet.create({
    OuterView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    HeaderView: {
        borderBottomWidth: 30,
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        paddingTop: 45,
        backgroundColor: '#F5FCFF',
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    Button: {
        borderWidth: 1,
        borderColor: '#3968b3',
        backgroundColor: '#144ca6',
        padding: 15,
        margin: 5
    },
    ButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    },
    msgText: {
        color: '#c22d2d',
        fontSize: 20,
        textAlign: 'center'
    },
    inputContainer: {
        paddingTop: 15
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20,
        color: 'white',
    },
    field: {
        borderBottomWidth: 10,
        justifyContent: 'space-between'
    }
});