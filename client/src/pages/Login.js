// Imports all dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { registerRoute, loginRoute } from '../utils/APIRoutes';

const Login = () => {
    // Nav redirects page
    const nav = useNavigate();

    // If logged in user exists, page redirects to home
    useEffect(() => {if (localStorage.getItem('loggedInUser')) {
        nav('/home');
    }}, []);

    // Creates useStates
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    // Creates handle for values in useStates
    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    };

    // Registers a new user with username and password
    const registerSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = values


        const { data } = await axios.post(registerRoute, {
            username,
            password
        })

        if (data.status === false) {
            alert('Usesrname is taken');
        } else if (data.status === true) {
            localStorage.setItem('loggedInUser', JSON.stringify(data.user));

            // Redirects to home if registration works
            nav('/home');
        }
    }


    // Logs in a user
    const loginSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = values;

        const { data } = await axios.post(loginRoute, {
            username,
            password
        });

        if (data.status === false) {
            alert(`${data.msg}`);
        } else if (data.status === true) {
            localStorage.setItem('loggedInUser', JSON.stringify(data.user));

            // Redirects to home if log-in works
            nav('/home');
        }


    }

    // Returns HTML
    return (
        <main id="login-main">
            <header>
                <h1>Welcome to DevsHelp</h1>
            </header>

            <section id="login-section">

                <div id="login-tagline">
                    <h3>A Chat Site Where <span className='login-orange-text'>Developers</span> Help <span className='login-orange-text'>Developers</span></h3>
                </div>

                <div id="login-form-div">
                    <form action='' onSubmit={(event) => loginSubmit(event)}>
                        <h3 className='login-title'>Log In</h3>

                        <p className='login-username'>Username</p>
                        <input className='login-input' name='username' onChange={(e) => handleChange(e)}></input>

                        <p className='login-password'>Password</p>
                        <input className='login-input' type="password" name='password' onChange={(e) => handleChange(e)}></input>

                        <button className='login-button'>Log In</button>
                    </form>

                    <form action='' onSubmit={(event) => registerSubmit(event)}>
                        <h3 className='login-title'>Sign Up</h3>

                        <p className='login-username'>Username</p>
                        <input className='login-input' name='username' onChange={(e) => handleChange(e)}></input>

                        <p className='login-password'>Password</p>
                        <input className='login-input' type="password" name='password' onChange={(e) => handleChange(e)}></input>

                        <button className='login-button'>Sign Up</button>
                    </form>
                </div>
            </section>
        </main>
    )
};

export default Login;