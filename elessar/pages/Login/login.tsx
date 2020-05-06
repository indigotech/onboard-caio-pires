import React, { Component, useState, useEffect, Props }  from 'react';
import { View, Keyboard, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';



interface LoginState {
    email: string,
    message: string,
    password:string,
    status: boolean,
  }

export default class Login extends Component<Props,LoginState>{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: '',
            password: '',
            status: false,
        }
        this.validate_fields = this.validate_fields.bind(this)
    }
    


    validate_fields(){

        const validate_email = (email: string) => {
            const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        
            return expression.test(String(email).toLowerCase())
        }

        const validate_pwd = (pwd: string) => {
            const expression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;
            
            return expression.test(String(pwd))
        }


        if(validate_pwd(this.state.password) && validate_email(this.state.email)){
            this.setState({ status: true })
            return;
        };


        if((!validate_email(this.state.email)) && (!validate_pwd(this.state.password))){
            this.setState({ message: 'E-mail inválido\nSenha inválida, deve conter pelo menos 7 caracteres e conter 1 letra e 1 número.' })
            this.setState({ status: false })
            return;
        };

        if(!validate_email(this.state.email)){
            this.setState({ message: 'E-mail inválido' })
            this.setState({ status: false })
            return;
        };

        if(!validate_pwd(this.state.password)){
            this.setState({ message: 'Senha inválida, deve conter pelo menos 7 caracteres e conter 1 letra e 1 número.'})
            this.setState({ status: false })
            return;
        };

    }



    render(){
        return(
            
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                <View>
                    
                    <Text style={styles.header}>Bem-vindo à Taqtile!</Text>
                </View>
                <TextInput
                    onChangeText={(email) => this.setState({ email: email })} 
                    style={styles.textInput}
                    placeholder="E-mail"
                    placeholderTextColor = "grey"
                    maxLength={200}
                    onBlur={Keyboard.dismiss}
                />
                <TextInput
                    onChangeText={(password) => this.setState({ password: password })}
                    secureTextEntry={true}
                    style={styles.textInput}
                    placeholder="Senha"
                    placeholderTextColor = "grey"
                    maxLength={200}
                    onBlur={Keyboard.dismiss}
                />
                <TouchableOpacity
                    onPress={this.validate_fields}
                    style={styles.Button}>
                    <Text style={styles.ButtonText}>Submeter</Text>
                </TouchableOpacity>

                <Text style={styles.msgText}>
                    {this.state.message}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
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
    }
});

