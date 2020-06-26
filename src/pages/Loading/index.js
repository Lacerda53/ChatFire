import React, {useEffect} from 'react';
import { ActivityIndicator, View } from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native'

// import { Container } from './styles';

export default function Loading() {
    const { navigate } = useNavigation();
    function checkIfLoggedIn() {
        firebase.auth().onAuthStateChanged(
            function (user) {
                console.log('AUTH STATE CHANGED CALLED');
                if (user) {
                    navigate('Chat',{user: user});
                } else {
                    navigate('Login');
                }
            }
        );
    }

    useEffect(()=>{
        checkIfLoggedIn();
    },[]);
    return (
        <View style={{flex:1}}>
            <ActivityIndicator style={{flex:1}} color="#fd4a12" size="large"/>
        </View>
    );
}

