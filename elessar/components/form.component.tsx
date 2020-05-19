import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {StyledView, StyledText, StyledTextInput, StyledMessage} from './form.component.style';

interface FormProps {
  label: string;
  placeholder: string;
  onChangeText: () => void;
  secureTextEntry: boolean;
  message: string;
  keyboardType?: any;
}

export default class Form extends Component<FormProps, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StyledView>
        <StyledText>{this.props.label}</StyledText>
        <StyledTextInput
          onChangeText={this.props.onChangeText}
          placeholder={this.props.placeholder}
          placeholderTextColor="grey"
          maxLength={200}
          keyboardType={this.props.keyboardType? this.props.keyboardType : 'default'}
          onBlur={Keyboard.dismiss}
          secureTextEntry={this.props.secureTextEntry}
        />
        <StyledMessage>{this.props.message}</StyledMessage>
      </StyledView>
    );
  }
}
