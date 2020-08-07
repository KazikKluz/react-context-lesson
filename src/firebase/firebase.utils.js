import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDhd5yVY0TLWP1Nx-qoddLuJdRcn-roAAg",
  authDomain: "crwn-db-85c28.firebaseapp.com",
  databaseURL: "https://crwn-db-85c28.firebaseio.com",
  projectId: "crwn-db-85c28",
  storageBucket: "crwn-db-85c28.appspot.com",
  messagingSenderId: "282784730576",
  appId: "1:282784730576:web:998a518a1f8be5a48cfdd5",
  measurementId: "G-418QEL0Y5K",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
