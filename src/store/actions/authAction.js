import firebase from "firebase/app";
// import { httpRequst } from "../../config";
import { types } from "../types";
import { auth } from '../../config';
import { toast } from "../../shared";

export const signout = () => async (dispatch) => {
  // start type for spining on ui
  await auth.signOut();
  dispatch({ type: types.SING_OUT });
};

export const signin = (payload) => (dispatch) => {
  // start type for spining on ui
  dispatch({ type: types.AUTH_START });
  // payload = {
  //   email,
  //   password
  // }
  auth.signInWithEmailAndPassword(payload.email, payload.password)
    .then((user) => {
      dispatch({ type: types.AUTH_SUCCESS, user });
    }).catch(error => {
      dispatch({ type: types.AUTH_FAILD });
      toast("error", error.message);
      console.error("Error signing in with password and email", error);
    });
};

export const signup = (payload) => async (dispatch) => {
  // start type for spining on ui
  dispatch({ type: types.AUTH_START });
  // payload = {
  //   email,
  //   password
  // }
  try {
    const { user } = await auth.createUserWithEmailAndPassword(payload.email, payload.password);
    if (!user.emailVerified) {
      try {
        // https://firebase.google.com/docs/auth/web/email-link-auth
        const actionCodeSettings = {
          url: 'http://localhost:3000/?email=' + firebase.auth().currentUser.email,
        };
        await firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
      } catch (error) {
        toast("error", "Error durring send verification email" + error.message);
      }
    }
    dispatch({ type: types.AUTH_SUCCESS, user });
    toast("success", "Account create successfully");
  } catch (error) {
    dispatch({ type: types.AUTH_FAILD });
    toast("error", error.message);
  }
};

export const resetSigninUserState = (user) => (dispatch) => {
  dispatch({ type: types.AUTH_SUCCESS, user });
};

export const authWithGoogle = () => async (dispatch) => {
  // start type for spining on ui
  dispatch({ type: types.AUTH_START });
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    dispatch({ type: types.AUTH_SUCCESS, user });
  } catch (error) {
    dispatch({ type: types.AUTH_FAILD });
    toast("error", error.message);
  }
};

export const authWithFacebook = () => async (dispatch) => {
  // start type for spining on ui
  dispatch({ type: types.AUTH_START });
  try {
    const provider = new firebase.auth.FacebookAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    dispatch({ type: types.AUTH_SUCCESS, user });
  } catch (error) {
    dispatch({ type: types.AUTH_FAILD });
    toast("error", error.message);
  }
};