import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDarQkl0_mWg27JLWtmOJfDZZHsSjCmfr0",
  authDomain: "shop-together-v1.firebaseapp.com",
  databaseURL: "https://shop-together-v1.firebaseio.com",
  projectId: "shop-together-v1",
  storageBucket: "shop-together-v1.appspot.com",
  messagingSenderId: "429916709908",
  appId: "1:429916709908:web:cfd3c0d379e0b469fef301",
  measurementId: "G-YMP36JGCT5",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

// it will open google Select account page where we can select our google account as well as sign in..
provider.setCustomParameters({ prompt: "select_account" });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
