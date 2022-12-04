import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

let firebaseStorage;

const clientCredentials = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET
};

if (!firebase.apps.length) {
  firebase?.initializeApp(clientCredentials);
  firebaseStorage = firebase.storage();
}

export { firebase, clientCredentials, firebaseStorage };
