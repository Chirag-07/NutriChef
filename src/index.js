import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from "redux"
import {rootReducer} from './store/reducers/root';
import {Provider} from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import firebase from 'firebase/app'
import firestore from 'redux-firestore'
import {createFirestoreInstance, getFirestore, reduxFirestore} from "redux-firestore";
import {ReactReduxFirebaseProvider, getFirebase} from "react-redux-firebase";
import fbConfig from "./Firebase/fbConfig"

const createStoreWithFirebase = compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig)
    )(createStore);

const store = createStoreWithFirebase(rootReducer,  composeWithDevTools(applyMiddleware(thunk),

));
const rrfPropsConfig = {
 
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
}
const rrfProps = {
    firebase,
    firestore,
    config: rrfPropsConfig,
    dispatch: store.dispatch,
}

//ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
 ReactDOM.render(<Provider store={store}><ReactReduxFirebaseProvider {...rrfProps}><App /></ReactReduxFirebaseProvider></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
