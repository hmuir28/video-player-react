import React, { createContext } from 'react';
import firebase from 'firebase';

const FirebaseContext = createContext(null);
export { FirebaseContext };

export const generateUserDoc = async ({ user }, additionalData = {}) => {
  if (!user) return Promise.resolve({});

  const userRef = firebase.firestore().doc(`users/${user.uid}`);
  let eventHandler = {};
  try {
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { displayName, email } = user;
      await userRef.set({
        displayName,
        email,
        ...additionalData,
      });
      eventHandler = { success: user };
    }
  } catch (error) {
    const { message } = error;
    eventHandler = { error: message };
  }

  return Promise.resolve(eventHandler);
};

export default ({ children }) => {
  if (!firebase.apps.length) {
    // TODO: replace firebase configuration with env variables
    firebase.initializeApp({
      apiKey: "AIzaSyBKMAH1noFIcwO9cqvYUuTn70Q5GCPFCKE",
      authDomain: "videoplayer-b4764.firebaseapp.com",
      databaseURL: "https://videoplayer-b4764.firebaseio.com",
      projectId: "videoplayer-b4764",
      storageBucket: "videoplayer-b4764.appspot.com",
      messagingSenderId: "700374314276",
      appId: "1:700374314276:web:21ccc80a0ec4f761f3d7b1",
      measurementId: "G-9E4DKWV1RZ"
    });
  }

  return (
    <FirebaseContext.Provider value={ firebase }>
      { children }
    </FirebaseContext.Provider>
  );
};
