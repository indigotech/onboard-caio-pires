import React, { Component} from 'react';
import { View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import { getUser} from '../../requests/requests'

interface UserType{
    name: string,
    email: string,
    phone: string,
    birthDate: string,
    role: string,
}

interface UserDetailsPageState {
    user: any,
    loading: boolean,
    limit: number,
    page: number,
    offset: number,
    finished: boolean,
    modalVisible: boolean,
}

interface Props {
    navigation: any
  }

export default class UserDetailsPage extends Component<Props, UserDetailsPageState>{
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            loading: false,
            limit: 20,
            page: 1,
            offset: 0,
            finished: false,
            modalVisible: false,
        }
    }


    loadUserData = async () => {
        if (this.state.loading) return;

        const id = this.props.route.params.id
        console.log(JSON.stringify(this.props.route.params.id))
        console.log('ID resgatado: '+id)
        this.setState({ loading: true });
        const response = (await getUser(id))
        console.log(response)
        this.setState({
            user: {...response.data.user},
        });   
    
        this.setState({ loading: false });
       
    }
 
    componentDidMount = async () => {
        await this.loadUserData();
    }

    render() {
        return (
            <View style={styles.OuterView}>
                <Text style={styles.header}>Detalhes do Usuário:</Text>
                {this.state.loading? <ActivityIndicator size='large'>    
                    </ActivityIndicator> : 
                        <Text style={styles.textStyle}>
                            Nome: {this.state.user.name}{'\n'}
                            E-mail: {this.state.user.email}{'\n'}
                            Telefone: {this.state.user.phone}{'\n'}
                            Data de nascimento: {this.state.user.birthDate}{'\n'}
                            Função: {this.state.user.role}{'\n'}
                        </Text>
                }
            </View>
    );
    }

}


const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 20,
    },
    listItem: {
    marginTop: 20,
    padding: 30,
    backgroundColor: '#525252',
    },
    OuterView: {
        flex: 1,
        backgroundColor: 'black'
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "left"
      }
});