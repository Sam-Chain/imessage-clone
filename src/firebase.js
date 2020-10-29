import firebase from 'firebase'

const firebaseApp= firebase.initializeApp({
  apiKey: "AIzaSyDyM6j8qK4w3XmKx-43OzpIS83lV1vyvzk",
  authDomain: "imessage-clone-deb34.firebaseapp.com",
  databaseURL: "https://imessage-clone-deb34.firebaseio.com",
  projectId: "imessage-clone-deb34",
  storageBucket: "imessage-clone-deb34.appspot.com",
  messagingSenderId: "689206333739",
  appId: "1:689206333739:web:0c6ed830d04e99df0e356e",
  measurementId: "G-K9HHTQ4132"
});
  
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;