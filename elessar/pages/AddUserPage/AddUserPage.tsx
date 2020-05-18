import React, {Fragment, Component} from 'react';
import {
  View,
  Keyboard,
  ScrollView,
  ActivityIndicator,
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
import {storeData} from '../Login/store';
import {getToken, addUser} from '../Login/requests';
import * as yup from 'yup';
import {Formik} from 'formik';
import moment from 'moment';
import DatePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
import {Input} from 'react-native-elements';

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
    console.log(allValid);

    if (allValid) {
      const userInfo = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        date: this.state.birth.toISOString().split('T')[0],
        phone: this.state.phone,
      };
      this.setState({loading: true});
      const requestResult = await addUser(userInfo);
      if (typeof requestResult.data == 'undefined') {
        this.setState({
          message:
            requestResult.graphQLErrors?.[0]?.message ||
            'Erro na rede. Verique a conexão',
        });
      } else {
        this.props.navigation.navigate('Home');
      }
    }
    this.setState({loading: false});
  };

  render() {
    return (
      <ScrollView style={styles.OuterView}>
        <View style={styles.HeaderView}>
          <Text style={styles.header}>Crie um novo usuário:</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.labelText}>Nome</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(name) => this.setState({name: name.trim()})}
            placeholder="Nome"
            placeholderTextColor="grey"
            maxLength={200}
            onBlur={Keyboard.dismiss}
          />
          <Text style={styles.msgText}>{this.state.nameMessage}</Text>
        </View>
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
        <View style={styles.field}>
          <Text style={styles.labelText}>E-mail</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(email) => this.setState({email: email.trim()})}
            placeholder="E-mail"
            placeholderTextColor="grey"
            maxLength={200}
            onBlur={Keyboard.dismiss}
          />
          <Text style={styles.msgText}>{this.state.emailMessage}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.labelText}>Telefone</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(phone) => this.setState({phone: phone.trim()})}
            placeholder="Telefone"
            keyboardType={'phone-pad'}
            placeholderTextColor="grey"
            maxLength={200}
            onBlur={Keyboard.dismiss}
          />
          <Text style={styles.msgText}>{this.state.phoneMessage}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.labelText}>Senha</Text>
          <TextInput
            onChangeText={(password) => this.setState({password: password})}
            secureTextEntry={true}
            style={styles.textInput}
            placeholder="Senha"
            placeholderTextColor="grey"
            maxLength={200}
            onBlur={Keyboard.dismiss}
          />
          <Text style={styles.msgText}>{this.state.passwordMessage}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.labelText}>Função</Text>
          <TextInput
            onChangeText={(role) => this.setState({role: role.trim()})}
            style={styles.textInput}
            placeholder="admin ou user"
            placeholderTextColor="grey"
          />
          <Text style={styles.msgText}>{this.state.roleMessage}</Text>
        </View>
        <TouchableOpacity style={styles.Button} onPress={this.handleButton}>
          {this.state.loading ? (
            <ActivityIndicator size="large"></ActivityIndicator>
          ) : (
            <Text style={styles.ButtonText}>Adicionar Usuário</Text>
          )}
        </TouchableOpacity>
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
