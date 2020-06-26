import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

export default function Main({ route }) {
    const { navigate } = useNavigation();
    const { user } = route.params;

    useEffect(() => {

    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 25, backgroundColor: '#465efc' }} />
            <View style={{ borderRadius: 25, marginTop: -25, backgroundColor: '#fff', flex: 1 }}>
                <View style={{padding:15}}>
                    <Image style={{width:100, height:100}} source={{uri: user.photoUrl}} />
                    <Text>Bem vindo, {user.name}</Text>
                    <Text>Email: {user.email}</Text>
                </View>
            </View>
        </View>
    );
}

