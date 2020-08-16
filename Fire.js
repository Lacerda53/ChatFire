import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        // CONFIG FIREBASE
      });
    }
  };

  // checkAuth = () => {
  //     firebase.auth().onAuthStateChanged(user => {
  //         if (user) {
  //             firebase.auth().signInAnonymously();
  //         }
  //     });
  // };

  send = messages => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      }
      this.db.push(message)
    });
  };

  parse = message => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user
    };
  };

  logout = () => {
    firebase.auth().signOut();
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get = callback => {
    this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid
  }
}

export default new Fire();
