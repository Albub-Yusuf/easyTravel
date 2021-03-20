import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';

import { Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext} from '../../App';

import  './Login.css';




const Login = () => {

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    let isSignedUp = true;
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

  


    const handleLogin = () => {

        const provider = new firebase.auth.GoogleAuthProvider();



        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {

                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email };
                console.log(signedInUser);
                console.log(displayName, email);
                setLoggedInUser(signedInUser);
                history.replace(from);

            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                const newData = {
                    hasError: errorMessage,
                }
                setLoggedInUser(newData);
                // ...
            });

    }


    //Login using email & password

    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {


        const userEmail = data.email;
        const userPassword = data.password;

        console.log(userEmail, userPassword);

        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
            .then(res => {

                const user = res.user;
                const { displayName, email } = res.user;
                const signedInUser = { name: displayName, email };

                console.log(user.displayName, 'is logged in');
                setLoggedInUser(signedInUser);
                history.replace(from);


            })
            .catch(error => {

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
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
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function () {
          // Update successful.
          console.log('user name updated successfully');
          console.log(user.displayName);
        }).catch(function (error) {
          // An error happened.
          console.log(error);
        });
    
    
      }


    const onSubmitRegister = data => {
        

       const userName = data.name;
       const userEmail = data.email;
       const userPassword = data.password;

        console.log(userName, userEmail, userPassword);

        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
        .then(res => {
            const user = res.user;
            console.log(user, 'created successfully');
            updateUserInfo(userName);
            const newRegistered = {
                isRegistered: 'User Signed Up Successfully',
            }
            setLoggedInUser(newRegistered);
           
        })
        .catch(error => {

            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode, errorMessage);
            const newRegistered = {
                hasError: errorMessage,
            }
            setLoggedInUser(newRegistered);
        })

    };

    const [toggle, setToggle] = useState();
    const handleToggle = data =>{

        if(data === "login"){

            setToggle(true);
            const newRegistered = {
                isRegistered: '',
                hasError:'',
            }
            setLoggedInUser(newRegistered);
        }

        if(data === "signup"){

            setToggle(false);
            const newRegistered = {
                isRegistered: '',
                hasError:'',
            }
            setLoggedInUser(newRegistered);
            
        }


    }

 



    return (
        <div style={{textAlign:'center'}}>

            {

                
                toggle ?

            <div className="form-wrapper" >
            

            <div className="form-body">
                <div>
                <h3>Login</h3>
                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <br></br>
                        
                        <input placeholder="Email" className="input-style" type="email" name="email" ref={register({ required: true })} />
                        {errors.email && <span style={{ color: 'red' }}><br></br>Email is required</span>}

                        <br /><br />
                        
                        <input placeholder="Password" className="input-style" type="password" name="password" ref={register({ required: true })} />
                        {errors.password && <span style={{ color: 'red' }}><br></br>password is required</span>}

                        <br /><br />
                        <input className="auth-btn" type="submit" value="Sign in" />
                    </form>
                    <br></br>
                    <div style={{textAlign:'center'}}>
                    <p>Don't have an account ? <span style={{textDecoration:'underline',cursor:'pointer', color:'tomato'}} onClick={ () => handleToggle('signup')}>Create an account</span></p>
                    {loggedInUser.hasError && <p style={{color:'red'}}>{loggedInUser.hasError}</p>}
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
              <form  onSubmit={handleSubmit(onSubmitRegister)}>
                

                  <input placeholder="Name" className="input-style" name="name" ref={register({ required: true })} />
                  {errors.name && <span style={{ color: 'red' }}><br></br>Name is required</span>}
                  <br /><br />

                  <input  placeholder="Email" className="input-style" type="email" name="email" ref={register({ required: true })} />
                  {errors.email && <span style={{ color: 'red' }}><br></br>Email is required</span>}

                  <br /><br />
                
                  <input placeholder="Password" className="input-style" type="password" name="password" ref={register({ required: true })} />
                  {errors.password && <span style={{ color: 'red' }}><br></br>password is required</span>}

                  <br /><br />
                  <input placeholder="Confirm Password" className="input-style" type="password" name="confirmPassword" ref={register({ required: true })} />
                  {errors.confirmPassword && <span style={{ color: 'red' }}><br></br>Confirm Password is required</span>}

                  <br /><br />
                  <input className="auth-btn" type="submit" value="Sign up" />
              </form>
              <br/>
             <div style={{textAlign:'center'}}>
             <p>Already have an account ? <span style={{textDecoration:'underline',cursor:'pointer', color:'tomato'}} onClick={ () => handleToggle('login')}>Login</span></p>
               {loggedInUser.isRegistered && <p style={{color:'green'}}>{loggedInUser.isRegistered}</p>}
               {loggedInUser.hasError && <p style={{color:'red'}}>{loggedInUser.hasError}</p>}
             </div>

          </div>
      </div>

      

      </div>


            }
            
            <div>
            &mdash;&mdash;&mdash;&mdash; Or &mdash;&mdash;&mdash;&mdash;
                <br/><br/>
                <Button onClick={handleLogin}><FontAwesomeIcon icon={faGoogle} />    ... continue with google</Button>
                <br/><br/>
            </div>















        </div>
    );
};

export default Login;