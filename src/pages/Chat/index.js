import React, { useState, useEffect } from 'react';
import Fire from '../../../Fire';
import { GiftedChat } from 'react-native-gifted-chat';
import { KeyboardAvoidingView, Button, View } from 'react-native';
import {renderBubble} from './buddle';

export default function Chat({route}) {
  const [messages, setMessages] = useState([]);
  const { user } = route.params;

  useEffect(() => {
    Fire.get((message) => setMessages(previous => 
      GiftedChat.append(previous, message)
    ));
    return () => {
      Fire.off();
    }
  }, []);

  function getUser() {
    return {
      _id: Fire.uid,
      name: user.displayName,
      avatar: user.photoURL
    }
  }
  const chat = <GiftedChat key={user.id} renderUsernameOnMessage={true} messages={messages} renderBubble={renderBubble} onSend={Fire.send} user={getUser()} placeholder="Digite sua menssagem" />;
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Button title="Sair" onPress={()=> Fire.logout()} />
      <KeyboardAvoidingView style={{ flex: 1 }} enabled >
        {chat}
      </KeyboardAvoidingView>
    </View>
  );
}