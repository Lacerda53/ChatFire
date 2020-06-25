import React from 'react';
import Fire from './Fire';
import { GiftedChat } from 'react-native-gifted-chat';
import { KeyboardAvoidingView, Text, TextInput, View, SafeAreaView } from 'react-native';

export default class App extends React.Component {
  state = {
    messages: [],
    nickName: '',
    digitando: false
  }

  get user() {
    return {
      _id: Fire.uid,
      name: this.state.nickName
    }
  }

  componentDidMount() {
    Fire.get(message => this.setState(previous => ({
      messages: GiftedChat.append(previous.messages, message)
    })));
  }

  componentWillMount() {
    Fire.off();
  }

  render() {
    const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user} placeholder="Digite sua menssagem" />;
    return (
      <View style={{ flex: 1 }}>
        <TextInput style={{
          marginTop: 100, 
          backgroundColor: '#333',
          color: '#fff',
          padding: 15}} onChangeText={text => this.setState({nickName: text})} placeholder="Digite seu nick" value={this.state.nickName} 
          />
          {this.state.digitando?<Text>Digitando</Text>:null}
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={30} enabled >
          {chat}
        </KeyboardAvoidingView>
      </View>
    );
  }
}