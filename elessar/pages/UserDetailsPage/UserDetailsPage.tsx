import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {getUser} from '../../requests/requests';

interface UserType {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  role: string;
}

interface UserDetailsPageState {
  user: any;
  loading: boolean;
}

interface UserDetailsProps {
  navigation: any;
}

export default class UserDetailsPage extends Component<
  UserDetailsProps,
  UserDetailsPageState
> {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: false,
    };
  }

  loadUserData = async () => {
    if (this.state.loading) return;

    const id = this.props.route.params.id;
    this.setState({loading: true});
    try {
      const response = await getUser(id);
      this.setState({user: {...response.data.user}});
    } catch (e) {
      console.log(e);
    }

    this.setState({loading: false});
  };

  componentDidMount() {
    this.loadUserData();
  }

  render() {
    return (
      <View style={styles.OuterView}>
        <Text style={styles.header}>Detalhes do Usuário:</Text>
        {this.state.loading ? (
          <ActivityIndicator size="large"></ActivityIndicator>
        ) : (
          <Text style={styles.textStyle}>
            Nome: {this.state.user.name}
            {'\n'}
            E-mail: {this.state.user.email}
            {'\n'}
            Telefone: {this.state.user.phone}
            {'\n'}
            Data de nascimento: {this.state.user.birthDate}
            {'\n'}
            Função: {this.state.user.role}
            {'\n'}
          </Text>
        )}
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
    backgroundColor: 'black',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
