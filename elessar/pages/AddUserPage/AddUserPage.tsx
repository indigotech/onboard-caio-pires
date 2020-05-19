import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validateRole,
} from '../Login/validation';
import DatePicker from '@react-native-community/datetimepicker';
import {addUser} from '../../requests/requests';
import Header from '../../components/h1.component';
import Button from '../../components/button.component';
import Form from '../../components/form.component';

interface AddUserPageState {
  name: string;
  phone: string;
  birth: Date;
  role: string;
  email: string;
  message: string;
  password: string;
  passwordMessage: string;
  emailMessage: string;
  phoneMessage: string;
  nameMessage: string;
  roleMessage: string;
  loading: boolean;
  showDatePicker: boolean;
  dateMessage: string;
  showRolePicker: boolean;
}

interface Props {
  navigation: any;
}

export default class AddUserPage extends Component<Props, AddUserPageState> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      birth: new Date(),
      role: '',
      email: '',
      message: '',
      passwordMessage: '',
      emailMessage: '',
      phoneMessage: '',
      nameMessage: '',
      roleMessage: '',
      dateMessage: '',
      password: '',
      loading: false,
      showDatePicker: false,
      showRolePicker: false,
    };
  }

  private handleButton = async () => {
    const isEmailValid = validateEmail(this.state.email);
    const isPasswordValid = validatePassword(this.state.password);
    const isPhoneValid = validatePhone(this.state.phone);
    const isNameValid = validateName(this.state.name);
    const isRoleValid = validateRole(this.state.role);

    this.setState({
      emailMessage: isEmailValid ? '' : 'E-mail inválido',
      passwordMessage: isPasswordValid
        ? ''
        : 'Senha deve ter ao menos 7 caracteres e 1 caracter numérico e 1 alfabético',
      nameMessage: isNameValid ? '' : 'Nome inválido',
      phoneMessage: isPhoneValid ? '' : 'Telefone inválido',
      roleMessage: isRoleValid
        ? ''
        : "Função inválida. Deve ser 'admin' ou 'user'",
    });

    const allValid =
      isEmailValid &&
      isPasswordValid &&
      isNameValid &&
      isPhoneValid &&
      isRoleValid;
  
    if (allValid) {
      const userInfo = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        date: this.state.birth.toISOString().split('T')[0],
        phone: this.state.phone,
      };
      try {
        await addUser(userInfo);
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
      <ScrollView style={styles.OuterView}>
        <Header>Adicione um usuário:</Header>
        <Form
          label="Nome"
          placeholder="Nome Completo"
          onChangeText={(name) => this.setState({name: name.trim()})}
          secureTextEntry={false}
          message={this.state.nameMessage}
        />
        <View style={styles.field}>
          <Text style={styles.labelText}>Data de Nascimento</Text>
          <TouchableOpacity
            onPress={() => this.setState({showDatePicker: true})}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="grey"
              placeholder={'Data de Nascimento'}
              editable={false}
              value={this.state.birth.toLocaleDateString()}
            />
            <Text style={styles.msgText}>{this.state.dateMessage}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker && (
            <DatePicker
              value={this.state.birth}
              maximumDate={new Date()}
              minimumDate={new Date('1900-01-01')}
              onClose={(d) => {
                this.setState({showDatePicker: false});
              }}
              onChange={(d) => {
                if (typeof d.nativeEvent?.timestamp != 'undefined') {
                  this.setState({
                    birth: new Date(d.nativeEvent?.timestamp),
                    showDatePicker: false,
                  });
                }
              }}
            />
          )}
        </View>
        <Form
          label="E-mail"
          placeholder="E-mail"
          onChangeText={(email) => this.setState({email: email.trim()})}
          secureTextEntry={false}
          message={this.state.emailMessage}
        />
        <Form
          label="Senha"
          placeholder="Senha"
          onChangeText={(password) => this.setState({password: password})}
          secureTextEntry={true}
          message={''}
        />
        <Form
          label="Telefone"
          placeholder="Telefone"
          onChangeText={(phone) => this.setState({phone: phone.trim()})}
          secureTextEntry={false}
          keyboardType={'phone-pad'}
          message={this.state.phoneMessage}
        />
        <Form
          label="Função"
          placeholder="user ou admin"
          onChangeText={(role) => this.setState({role: role.trim()})}
          secureTextEntry={false}
          message={this.state.roleMessage}
        />
        <Button
          loading={this.state.loading}
          text="Adicionar Usuário"
          onPress={this.handleButton}
        />
        <Text style={styles.msgText}>{this.state.message}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  OuterView: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'black',
  },
  HeaderView: {
    borderBottomWidth: 30,
    justifyContent: 'space-between',
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
    color: 'white',
  },
  Button: {
    borderWidth: 1,
    borderColor: '#3968b3',
    backgroundColor: '#144ca6',
    padding: 15,
    margin: 5,
  },
  ButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
  msgText: {
    color: '#c22d2d',
    fontSize: 15,
    textAlign: 'center',
  },
  inputContainer: {
    paddingTop: 15,
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
  labelText: {
    color: 'grey',
    fontSize: 20,
    textAlign: 'left',
  },
  field: {
    borderBottomWidth: 10,
    justifyContent: 'space-between',
  },
});
