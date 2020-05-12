import React, { Component, useState, useEffect, Props } from 'react';
import { View, ScrollView, Keyboard, Image, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { getToken,  getUsers} from '../Login/requests'
import  userCard  from '../components/userCard';



interface HomeState {
    users: any,
}
export default class Home extends Component<{}, HomeState>{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentWillMount = async () =>{
        this.setState({users : (await getUsers()).data?.users?.nodes});
        console.log(this.state.users);
    }

    render() {
        return (
            <View style={styles.OuterView}>
                    <Text style={styles.header}>Usuários:</Text>
                <ScrollView>
                    {this.state.users.map((user) => {
                        return (
                            <ScrollView style={styles.inputContainer} key={user.id}>
                                <Text style={styles.userCard}  >
                                    Name: {user.name}{"\n"}          
                                    E-mail: {user.email}              
                                </Text>
                            </ScrollView>
                        );
                    })}
                </ScrollView>

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
    },
    userCard: {
        borderBottomWidth: 10,
        justifyContent: 'space-between',
        fontSize: 18,
        textAlign: 'left',
        margin: 10,
        color: 'grey',
    }
});