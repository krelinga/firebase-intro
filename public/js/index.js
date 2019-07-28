function addDummyEntryToFirestore() {
    const db = firebase.firestore()

    db.collection("test").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    }).then(docRef => {
        console.log("put docref ", docRef.id)
    }).catch(error => {
        console.error("error: ", error)
    })
}

document.addEventListener('DOMContentLoaded', function() {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
      let app = firebase.app();
      let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
      document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
    } catch (e) {
      console.error(e);
      document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('signed in as ' + user.displayName)
        document.getElementById('log_in').style.visibility = 'hidden'
        document.getElementById('log_out').style.visibility = 'visible'

        addDummyEntryToFirestore()
      } else {
        // User is signed out.
        console.log('user signed out')
        document.getElementById('log_out').style.visibility = 'hidden'
        document.getElementById('log_in').style.visibility = 'visible'
      }
    });

    document.getElementById('log_in').addEventListener('click', () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
    })
    document.getElementById('log_out').addEventListener('click', () => {
        firebase.auth().signOut()
    })

    // dog template experiment.
    dog_template = Handlebars.compile(document.getElementById('dog_table_template').innerHTML)
    document.getElementById('dog_area').innerHTML = dog_template({
        dogs: [
            {
                name: 'Fido',
                kind: 'friendly',
                hungry: true
            },
            {
                name: 'Mystery',
                kind: 'Suzy\'s Favorite!',
                hungry: false
            },
            {
                name: 'Bismarck',
                kind: 'former german diplomat',
                hungry: true
            }
        ]
    })
});