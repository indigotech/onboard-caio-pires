import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {validateEmail, validatePassword} from './validation';
import {storeData} from './store';
import {getToken} from '../../requests/requests';
import Header from '../../components/h1.component';
import Button from '../../components/button.component';
import Form from '../../components/form.component';

interface LoginState {
  email: string;
  message: string;
  password: string;
  loading: boolean;
}

interface LoginProps {
  navigation: any;
}

export default class Login extends Component<LoginProps, LoginState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: '',
      password: '',
      loading: false,
    };
  }

  private handleButton = async () => {
    const isEmailValid = validateEmail(this.state.email);
    const isPasswordValid = validatePassword(this.state.password);
    this.setState({loading: true});

    const emailMessage = isEmailValid ? '' : 'E-mail inválido';
    let passwordMessage = isPasswordValid
      ? ''
      : 'Senha inválida, deve conter pelo menos 7 caracteres e conter 1 letra e 1 número.';
    passwordMessage =
      !isEmailValid && !isPasswordValid
        ? '\n' + passwordMessage
        : passwordMessage;

    this.setState({message: emailMessage + passwordMessage});

    if (isEmailValid && isPasswordValid) {
      try {
        const requestResult = await getToken(
          this.state.email,
          this.state.password,
        );
        await storeData('token', requestResult.data?.login?.token);
        this.props.navigation.navigate('Home');
      } catch (e) {
        this.setState({
          message:
            e.graphQLErrors?.[0]?.message || 'Erro na rede. Verique a conexão',
        });
      }
    }
    this.setState({loading: false});
  };

  render() {
    return (
      <View style={styles.OuterView}>
        <Header>Bem-vindo(a) à Taqtile!</Header>
        <Form
          label="E-mail"
          placeholder="example@email.com"
          onChangeText={(email) => this.setState({email: email.trim()})}
          secureTextEntry={false}
          message={''}
        />
        <Form
          label="Senha"
          placeholder="Senha"
          onChangeText={(password) => this.setState({password: password})}
          secureTextEntry={true}
          message={''}
        />
        <Button
          loading={this.state.loading}
          text="Entrar"
          onPress={this.handleButton}
        />
        <Text style={styles.msgText}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  OuterView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  msgText: {
    color: '#c22d2d',
    fontSize: 20,
    textAlign: 'center',
  },
});
