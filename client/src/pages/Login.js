import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { registerRoute } from '../utils/APIRoutes';

const Login = () => {
    const nav = useNavigate();

    const [values, setValues] = useState({
        username: '',
        password: ''
    });


    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    };

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

            nav('/home');
        }
    }

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
                    <form>
                        <h3 className='login-title'>Log In</h3>

                        <p className='login-username'>Username</p>
                        <input className='login-input'></input>

                        <p className='login-password'>Password</p>
                        <input className='login-input' type="password"></input>

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