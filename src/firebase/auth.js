import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const firebaseSignUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const firebaseSignIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const firebaseSignOut = () => {
  return signOut(auth);
};
