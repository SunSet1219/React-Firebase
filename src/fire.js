
import firebase from 'firebase';

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: 'AIzaSyB_M0EOwwNCixmM71tBmiVV5qzC3Bi8Un4',
  authDomain: 'reactfire-f410b.firebaseapp.com',
  databaseURL: 'https://reactfire-f410b.firebaseio.com',
  projectId: 'reactfire-f410b',
  storageBucket: '',
  messagingSenderId: '49567881014'
};
const fire = firebase.initializeApp(config);
export default fire;
