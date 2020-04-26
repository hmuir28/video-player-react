import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import 'firebase/firestore';
import 'firebase/auth';

import { FirebaseContext, generateUserDoc } from '../utils/firebase';
import Row from '../components/Row';
import Col from '../components/Col';
import CardPanel from '../components/CardPanel';
import TextInput from '../components/TextInput';

import StyledSignInAndSignUp from '../styles/StyledSignInAndSignUp';

const SignIn = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const provider = new firebase.auth.GoogleAuthProvider();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = async () => {
    if (user.email && user.password) {
      try {
        const userAuth = await firebase.auth()
          .signInWithEmailAndPassword(user.email, user.password);
        if (userAuth) {
          history.push('video-player');
        } else {
          throw new Error({
            message: 'Failed to sign in.'
          });
        }
      } catch ({ message }) {
        setError(message);
      }
    } else {
      setError('Please, fill the email and password fields.')
    }
  };

  const signInWithGoogle = async () => {
    try {
      const userAuth = await firebase.auth()
        .signInWithPopup(provider);
      if (userAuth) {
        const { additionalUserInfo } = userAuth;
        const { isNewUser } = additionalUserInfo;
        if (isNewUser) await generateUserDoc(userAuth);
        history.push('video-player');
      } else {
        throw new Error({
          message: 'Failed to sign in with your google account.'
        });
      }
    } catch ({ message }) {
      setError(message);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if(name === 'userEmail') {
      setUser({
        ...user,
        email: value,
      });
    } else if(name === 'userPassword') {
      setUser({
        ...user,
        password: value,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) { history.push('video-player'); }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  const btnClasses = [
    'btn',
    'btn-default',
    'btn-flat',
  ];

  return (
    <StyledSignInAndSignUp>
      <Row>
        <Col offset={'m4'} m={4}>
          <CardPanel>
            {error !== null && <div className="toast toast-error">{error}</div>}
            <TextInput
              email
              error={'Email is required'}
              id={'input-email'}
              name="userEmail"
              noLayout={true}
              placeholder="Email"
              onChange = {(event) => onChangeHandler(event)}
              required
              type={'email'}
              validate
            />
            <TextInput
              error={'Password is required'}
              id={'input-password'}
              name="userPassword"
              noLayout={true}
              placeholder="Password"
              onChange = {(event) => onChangeHandler(event)}
              required
              type={'password'}
              validate
            />
            <button
              className={btnClasses.join(' ')}
              onClick={signInWithEmailAndPasswordHandler}
            >
              SignIn
            </button>
            <div className="signin__google-btn" role="button" onClick={signInWithGoogle}>
              <div className="signin__google-icon-wrapper">
                <img className="signin__google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="sigin with google" />
              </div>
              <p className="signin__google-btn-text"><b>Sign in with google</b></p>
            </div>
            <p className="signin__signup">
              Don't have an account?{" "}
              <Link to={'signup'}>
                Sign up here
              </Link>{" "}
            </p>
          </CardPanel>
        </Col>
      </Row>
    </StyledSignInAndSignUp>
  );
};

export default SignIn;
