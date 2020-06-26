import React from 'react';
import * as Google from 'expo-google-app-auth';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';
import logo from '../../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';

export default function login() {
  const { navigate } = useNavigation();

  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken);
        // Sign in with credential from the Google user.
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
          .then((result) => {
            console.log('user signed in');
            if (result.additionalUserInfo.isNewUser) {
              firebase.database().ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.Now()
                }).then((snapshot) => {
                  console.log('Snapshot', snapshot);
                });
            } else {
              firebase.database().ref('/users/' + result.user.uid).update({
                last_logged_in: Date.now()
              })
            }
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '1025253408819-57rvtrbj2fd2omjmkrh3hphj4eijnsgb.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        onSignIn(result);
        navigate('Chat', { user: result.user });
        // return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={logo} />
        <View style={{ padding: 50, backgroundColor: '#fff2ed'}}>
          <Text style={{color:'#757575',fontSize: 15}}>Seu mais novo app de chat com transferencia de arquivos pesados, sem redução de qualidade de imagem e muito mais.</Text>
        </View>
      </View>
      <View style={{ height: 60, width: '80%', marginBottom: 60 }}>
        <TouchableOpacity style={{
          backgroundColor: "#fd4a12",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10
        }} onPress={() => signInWithGoogleAsync()}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

