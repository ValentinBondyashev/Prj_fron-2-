import axios from 'axios';
import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyDVu1y_aQRqWwVtPrWG3pja-KwO2F18Ahg",
    authDomain: "my-skills-b62f7.firebaseapp.com",
    databaseURL: "https://my-skills-b62f7.firebaseio.com",
    projectId: "my-skills-b62f7",
    storageBucket: "my-skills-b62f7.appspot.com",
    messagingSenderId: "398652311383"
  };

export const registerAction = (email, password) => dispatch => {
  firebase.initializeApp(config);
  
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(data) {
      localStorage.setItem('token', firebase.auth().currentUser.qa);
      dispatch({ type: 'REGISTER_SUCCESS'});
      window.location.reload()
    }).catch(function(error) {
      dispatch({ type: 'REGISTER_ERROR' });
        console.log(error.code, " : " ,error.message);
    });
}