import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Main from './pages/Main';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Loading from './pages/Loading';

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Loading" component={Loading} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown: false,headerLeft:null}}/>
      <Stack.Screen name="Main" component={Main} options={{
        title: 'Chats',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#465efc',
          elevation: 0,
          height: 90
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
          marginTop: 15,
          marginLeft: 3
        }
      }} />
      <Stack.Screen name="Chat" component={Chat}/>
    </Stack.Navigator>
  );
}
