/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Bubble } from 'react-native-gifted-chat';

export const renderBubble = (props) => (
  <Bubble
    {...props}
    containerStyle={{
      left: { },
      right: {},
    }}
    wrapperStyle={{
      left: {},
      right: { backgroundColor: '#fd4a12'},
    }}
    bottomContainerStyle={{
      left: {},
      right: {},
    }}
    tickStyle={{}}
    usernameStyle={{}}
    containerToNextStyle={{
      left: {},
      right: {},
    }}
    containerToPreviousStyle={{
      left: {},
      right: {},
    }}
  />
);