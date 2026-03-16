import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
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

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const firebaseSignInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const firebaseSignInWithGithub = () => {
  return signInWithPopup(auth, githubProvider);
};
