import React from 'react';

const Login = () => {
    return (
        <main id="login-main">
            <header>
                <h1>Welcome to DevsHelp</h1>
            </header>

            <secition id="login-section">

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

                    <form>
                        <h3 className='login-title'>Sign Up</h3>

                        <p className='login-username'>Username</p>
                        <input className='login-input'></input>

                        <p className='login-password'>Password</p>
                        <input className='login-input' type="password"></input>

                        <button className='login-button'>Sign Up</button>
                    </form>
                </div>
            </secition>
        </main>
    )
};

export default Login;