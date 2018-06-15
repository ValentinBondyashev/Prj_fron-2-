import axios from 'axios';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDVu1y_aQRqWwVtPrWG3pja-KwO2F18Ahg",
  authDomain: "my-skills-b62f7.firebaseapp.com",
  databaseURL: "https://my-skills-b62f7.firebaseio.com",
  projectId: "my-skills-b62f7",
  storageBucket: "my-skills-b62f7.appspot.com",
  messagingSenderId: "398652311383"
};


export const getCheckAdminAction = () => dispatch => {
  axios.get('http://localhost:3010/skills/check_admin', {})
  .then(function (response) {
    dispatch({ type: 'CHECK_ADMIN', payload: response.data.message.isAdmin });
  })
  .catch(function (error) {  
  });
    
}

export const loginAction = (email, password) => dispatch => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(data) {
   localStorage.setItem('token', firebase.auth().currentUser.qa);

   let payload =  {
    token: firebase.auth().currentUser.qa,
  };
    dispatch({ type: 'LOGIN_SUCCESS', payload: payload });
    
  }).catch(function(error) {
    dispatch({ type: 'LOGIN_ERROR' });
  });

}


export const loginGoogleAction = () => dispatch => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    localStorage.setItem('token', firebase.auth().currentUser.qa);
    console.log(result);
   let payload =  {
    token: firebase.auth().currentUser.qa,
    photo: result.user.photoURL
  };
    dispatch({ type: 'LOGIN_GOOGLE_SUCCESS', payload: payload });
    
  
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });

}

export function checkAuthAction() {
    let token = localStorage.getItem('token');
    return { 
      type: 'CHECK_AUTH', 
      payload: {
        token: token === null ? "" : token
      }
    }  
}
