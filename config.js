import * as firebase from 'firebase'
require('firebase/firestore')


  var firebaseConfig = {
    apiKey: "AIzaSyA9qu-ERvDpWTndbFUrhylRR4haufHGMCg",
    authDomain: "wi-ly-76191.firebaseapp.com",
    projectId: "wi-ly-76191",
    storageBucket: "wi-ly-76191.appspot.com",
    messagingSenderId: "371951425850",
    appId: "1:371951425850:web:21c7121d800f6be3919803"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();