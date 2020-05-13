import React, { Component, useState, useEffect, Props }  from 'react';
import { View, Keyboard, Image, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';
import './validation.tsx'
import { validateEmail, validatePassword } from './validation';
import { storeData, retrieveData } from './store';

import { AsyncStorage } from 'react-native';
import gql from 'graphql-tag';
import { client } from '../../App';
import { getToken } from './requests';




interface LoginState {
    email: string,
    message: string,
    password:string,
  }

export default class Login extends Component<{},LoginState>{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: '',
            password: '',
        }
    }

    handleButton = async () => {

        const isEmailValid = validateEmail(this.state.email);
        const isPasswordValid = validatePassword(this.state.password);
        
        const emailMessage = isEmailValid ? '' : 'E-mail inválido';
        let passwordMessage = isPasswordValid ? '' : 'Senha inválida, deve conter pelo menos 7 caracteres e conter 1 letra e 1 número.';
        passwordMessage = !isEmailValid && !isPasswordValid ? '\n' + passwordMessage;
        
        this.setState({ message: emailMessage + passwordMessage });

        if(isEmailValid && isPasswordValid){
            const requestResult = await getToken(this.state.email, this.state.password);
            if(!requestResult.data?.login?.token){
                await storeData('token', requestResult.data?.login?.token);
                this.setState({ message: requestResult.graphQLError?.[0]?.message || 'Erro na rede. Verique a conexão'})           
            }
        }
            
    }


    render() {
        return (
            <View style={styles.OuterView}>
                <View style={styles.HeaderView} >
                    <Text style={styles.header}>Bem-vindo(a) à Taqtile!</Text>
                </View >
                <View style={styles.field}>
                    <TextInput
                        onChangeText={(email) => this.setState({ email: email.trim() })}
                        style={styles.textInput}
                        placeholder="E-mail"
                        placeholderTextColor="grey"
                        maxLength={200}
                        onBlur={Keyboard.dismiss}
                    />
                </View >
                <View style={styles.field}>
                    <TextInput
                        onChangeText={(password) => this.setState({ password: password })}
                        secureTextEntry={true}
                        style={styles.textInput}
                        placeholder="Senha"
                        placeholderTextColor="grey"
                        maxLength={200}
                        onBlur={Keyboard.dismiss}
                    />
                </View >
                <TouchableOpacity
                    style={styles.Button}
                    onPress={this.handleButton}>
                    <Text style={styles.ButtonText}>Entrar</Text>
                </TouchableOpacity>
                <Text style={styles.msgText}>
                    {this.state.message}
                </Text>
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
        color:'white',
    },
    field: {
        borderBottomWidth: 10, 
        justifyContent: 'space-between'}
});

