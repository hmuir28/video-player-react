import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';

import { FirebaseContext, generateUserDoc } from '../utils/firebase';
import Row from '../components/Row';
import Col from '../components/Col';
import CardPanel from '../components/CardPanel';
import TextInput from '../components/TextInput';

import StyledSignInAndSignUp from '../styles/StyledSignInAndSignUp';

const SignUp = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setUser({
        ...user,
        email: value,
      });
    } else if (name === 'userPassword') {
      setUser({
        ...user,
        password: value,
      });
    } else if (name === 'userDisplayName') {
      setUser({
        ...user,
        displayName: value,
      });
    }
  };

  const signUpWithEmailAndPasswordHandler = async () => {
    if (user.email && user.password) {
      try {
        const userCreated = await firebase.auth()
          .createUserWithEmailAndPassword(user.email, user.password);
        const {
          error,
          success,
        } = await generateUserDoc(userCreated, { ...user });

        if (success) {
          setSuccess('Successful user sign up.');
          setTimeout(() => history.push('signin'), 1000);
        } else {
          throw new Error({
            message: 'Error, please take a look at the form, again!',
          });
        }

        if (error) {
          throw new Error({ message: error });
        }
      } catch ({ message }) {
        setError(message);
      }
    } else {
      setError('Please, fill the corresponding fields.')
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
            {success !== null && <div className="toast toast-success">{success}</div>}
            {error !== null && <div className="toast toast-error">{error}</div>}
            <TextInput
              error={'Display name is required'}
              id={'input-displayname'}
              name="userDisplayName"
              noLayout={true}
              placeholder="Display Name"
              onChange={(event) => onChangeHandler(event)}
              required
              type={'text'}
              validate
            />
            <TextInput
              email
              error={'Email is required'}
              id={'input-email'}
              name="userEmail"
              noLayout={true}
              placeholder="Email"
              onChange={(event) => onChangeHandler(event)}
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
              onChange={(event) => onChangeHandler(event)}
              required
              type={'password'}
              validate
            />
            <button
              className={btnClasses.join(' ')}
              onClick={signUpWithEmailAndPasswordHandler}
            >
              SignUp
            </button>
            <p className="signin__signup">
              Already have an account?{" "}
              <Link to="signin">
                Sign in here
              </Link>
            </p>
          </CardPanel>
        </Col>
      </Row>
    </StyledSignInAndSignUp>
  );
};

export default SignUp;
