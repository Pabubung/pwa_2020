import * as firebase from "firebase/app";
import "firebase/messaging";
import {isIOSDevice} from 'ios-detector';

let messaging;

if (isIOSDevice()) {
  console.log('The browser is running on Apple iOS.');
  messaging = null;

}else{

  const initializedFirebaseApp = firebase.initializeApp({
    // Project Settings => Add Firebase to your web app
    messagingSenderId: "617653590147"
  });
  messaging = initializedFirebaseApp.messaging();
  messaging.usePublicVapidKey(
    // Project Settings => Cloud Messaging => Web Push certificates
    "BG_0E3osFEid1XBb0N_tR2YzjqtHCIV8O6F0bNE-DM6lGxTieaxqaHzzCRDQNCNe0APy_3sKgNpYi2ODG5jfsaQ"
  );

}

export { messaging };