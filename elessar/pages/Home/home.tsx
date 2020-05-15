import React, { Component} from 'react';
import { View, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Text} from 'react-native';
import { getUsers} from '../Login/requests'


interface HomeState {
    users: any,
    loading: boolean,
    limit: number,
    page: number,
    offset: number,
    finished: boolean,
}

interface Props {
    navigation: any
  }

export default class Home extends Component<Props, HomeState>{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false,
            limit: 20,
            page: 1,
            offset: 0,
            finished: false,
        }
    }


    loadUsers = async () => {
        if (this.state.loading) return;

        if (!this.state.finished) {
            const { page } = this.state;
            this.setState({ loading: true });
            const response = (await getUsers(this.state.limit * (this.state.page - 1), this.state.limit))
            const usersToConcat = response.data?.users?.nodes;
            this.setState({ finished: response.data?.users?.pageInfo?.hasNextPage === false })
            this.setState({
                users: [...this.state.users, ...usersToConcat],
                page: page + 1,
            });
        }
        this.setState({ loading: false });
    }

    
        
    }

    componentDidMount = async () =>{
        this.loadUsers();        
    }

    renderFooter = () => {
        return this.state.loading && (
            <View >
              <ActivityIndicator size='large' />
            </View>
          );
    };


    renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text style={styles.userCard}  >
                Name: {item.name}{"\n"}
                E-mail: {item.email}
            </Text>
        </View>
    );

    private handleButton = async () => {
        this.props.navigation.navigate("Add User");            
    }

    render() {
        return (
            <View style={styles.OuterView}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={this.handleButton}>
                    {this.state.loading? <ActivityIndicator size='large'>    
                        </ActivityIndicator> : 
                        <Text style={styles.ButtonText}>Adicionar Usuário</Text>
                    }
                </TouchableOpacity>
                <Text style={styles.header}>Usuários:</Text>
                <FlatList
                    style={{ marginTop: 30 }}
                    contentContainerStyle={styles.list}
                    data={this.state.users}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    onEndReached={this.loadUsers}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this.renderFooter}
                />
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
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    userCard: {
        justifyContent: 'space-between',
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        color: 'white',
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
});