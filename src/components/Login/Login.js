import React, { useContext, useRef, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../App';
import './Login.css';




const Login = () => {

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    let isSignedUp = true;
    let isLoggedIn = false;
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };



    //google log in 
    const handleLogin = () => {

        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {

                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email, isLoggedIn: true };
                setLoggedInUser(signedInUser);
                history.replace(from);

            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                const newData = {
                    hasError: errorMessage,
                }
                setLoggedInUser(newData);
            });

    }


    //Login using email & password

    const { register, handleSubmit, watch, errors } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = data => {


        const userEmail = data.email;
        const userPassword = data.password;


        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
            .then(res => {

                const user = res.user;
                const { displayName, email } = res.user;
                const signedInUser = { name: displayName, email, isLoggedIn: true };

                setLoggedInUser(signedInUser);
                history.replace(from);


            })
            .catch(error => {

                const errorCode = error.code;
                const errorMessage = error.message;
                const newData = {
                    hasError: errorMessage,
                }
                setLoggedInUser(newData);
            })



    };

    // sign up code
    const updateUserInfo = name => {

        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {

        }).catch(function (error) {

        });


    }


    const onSubmitRegister = data => {


        const userName = data.name;
        const userEmail = data.email;
        const userPassword = data.password;


        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
            .then(res => {
                const user = res.user;
                updateUserInfo(userName);
                const newRegistered = {
                    isRegistered: 'User Signed Up Successfully',
                }
                setLoggedInUser(newRegistered);

            })
            .catch(error => {

                const errorCode = error.code;
                const errorMessage = error.message;

                const newRegistered = {
                    hasError: errorMessage,
                }
                setLoggedInUser(newRegistered);
            })

    };



    //Login and Create account form toggle and handle status and error
    const [toggle, setToggle] = useState();
    const handleToggle = data => {

        if (data === "login") {

            setToggle(true);
            const newRegistered = {
                isRegistered: '',
                hasError: '',
            }
            setLoggedInUser(newRegistered);
        }

        if (data === "signup") {

            setToggle(false);
            const newRegistered = {
                isRegistered: '',
                hasError: '',
            }
            setLoggedInUser(newRegistered);

        }


    }

    return (
        //Login and Create account form showing conditionally
        <div style={{ textAlign: 'center' }}>

            {

                toggle ?

                    <div className="form-wrapper" >


                        <div className="form-body">
                            <div>
                                <h3>Login</h3>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <br></br>

                                    <input placeholder="Email" className="input-style" type="email" name="email" ref={register({
                                        required: "Required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    })} />
                                    {errors.email && <span style={{ color: 'red' }}><br></br>{errors.email.message}</span>}

                                    <br /><br />

                                    <input placeholder="password" className="input-style" type="password" name="password" ref={register({ required: true })} />
                                    {errors.password && <span style={{ color: 'red' }}><br></br>Password is required</span>}

                                    <br /><br />
                                    <input className="auth-btn" type="submit" value="Sign in" />
                                </form>
                                <br></br>
                                <div style={{ textAlign: 'center' }}>
                                    <p>Don't have an account ? <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'tomato' }} onClick={() => handleToggle('signup')}>Create an account</span></p>
                                    {loggedInUser.hasError && <p style={{ color: 'red' }}>{loggedInUser.hasError}</p>}
                                </div>

                                <br /><br />

                            </div>


                        </div>

                    </div>
                    :

                    <div className="form-wrapper">

                        <div className="form-body">


                            <div>
                                <h3>Create an account</h3>
                                <form onSubmit={handleSubmit(onSubmitRegister)}>


                                    <input placeholder="Name" className="input-style" name="name" ref={register({ required: true })} />
                                    {errors.name && <span style={{ color: 'red' }}><br></br>Name is required</span>}
                                    <br /><br />

                                    <input placeholder="Email" className="input-style" type="email" name="email" ref={register({
                                        required: "Required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    })} />
                                    {errors.email && <span style={{ color: 'red' }}><br></br>{errors.email.message}</span>}

                                    <br /><br />

                                    <input placeholder="Password" className="input-style" type="password" name="password" ref={register({
                                        required: "You must specify a password",
                                        minLength: {
                                            value: 6,
                                            message: "Password must have at least 6 characters"
                                        }
                                    })} />
                                    {errors.password && <span style={{ color: 'red' }}><br></br>{errors.password.message}</span>}

                                    <br /><br />
                                    <input placeholder="Confirm Password" className="input-style" type="password" name="confirmPassword" ref={register({
                                        validate: value =>
                                            value === password.current || "The passwords do not match"
                                    })} />
                                    {errors.confirmPassword && <span style={{ color: 'red' }}><br></br>{errors.confirmPassword.message}</span>}

                                    <br /><br />
                                    <input className="auth-btn" type="submit" value="Sign up" />
                                </form>
                                <br />
                                <div style={{ textAlign: 'center' }}>
                                    <p>Already have an account ? <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'tomato' }} onClick={() => handleToggle('login')}>Login</span></p>
                                    {loggedInUser.isRegistered && <p style={{ color: 'green' }}>{loggedInUser.isRegistered}</p>}
                                    {loggedInUser.hasError && <p style={{ color: 'red' }}>{loggedInUser.hasError}</p>}
                                </div>

                            </div>
                        </div>



                    </div>


            }

            {/* google Sign in button */}
            <div>
                &mdash;&mdash;&mdash;&mdash; Or &mdash;&mdash;&mdash;&mdash;
                <br /><br />
                <Button onClick={handleLogin}><FontAwesomeIcon icon={faGoogle} />    &nbsp;&nbsp;Continue with google</Button>
                <br /><br />
            </div>

        </div>
    );
};

export default Login;