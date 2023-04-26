import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyAfqVAsSlCua8qAWgr0flWrcUsTQ6T8dNw",
    authDomain: "crud-7bc41.firebaseapp.com",
    databaseURL: "https://crud-7bc41-default-rtdb.firebaseio.com",
    projectId: "crud-7bc41",
    storageBucket: "crud-7bc41.appspot.com",
    messagingSenderId: "712950987089",
    appId: "1:712950987089:web:44f0220f84203322c6bb70"
  };

  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();
  