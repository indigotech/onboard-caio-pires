import React, {Component} from 'react';
import {StyledView, StyledText} from './h1.component.style'

interface HeaderProps{
  children: string,
}

export default class Header extends Component<HeaderProps,{}> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <StyledView>
        <StyledText>{this.props.children}</StyledText>
      </StyledView>
    );
  }
}
