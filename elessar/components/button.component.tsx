import React, {Component} from 'react';
import { ActivityIndicator} from 'react-native';
import {StyledTouchableOpacity, StyledText} from './button.component.style';


interface ButtonProps {
  loading: boolean;
  text: string;
  onPress: () => void;
}

export default class Button extends Component<ButtonProps, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StyledTouchableOpacity onPress={this.props.onPress}>
        {this.props.loading ? (
          <ActivityIndicator size='large' />
        ) : (
          <StyledText>{this.props.text}</StyledText>
        )}
      </StyledTouchableOpacity>
    );
  }
}
