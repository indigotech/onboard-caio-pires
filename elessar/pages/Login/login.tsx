import React, { Component, createRef } from 'react';
import { View, Keyboard, StyleSheet, TouchableOpacity, Button, Text, TextInput} from 'react-native';


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

export default class Login extends Component{
   render(){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
            <View>
                <Text style={styles.header}>Bem vindo à Taqtile!</Text>
            </View>
            <View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor = "grey"
                    maxLength={200}
                    onBlur={Keyboard.dismiss}
                />
            </View>
            <View>
                <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                    placeholder="Senha"
                    placeholderTextColor = "grey"
                    maxLength={200}
                    onBlur={Keyboard.dismiss}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.Button}>
                    <Text style={styles.ButtonText}>Submeter</Text>
                </TouchableOpacity>
            </View>
      </View>
    );
    }
}

