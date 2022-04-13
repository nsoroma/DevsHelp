import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { allUsers } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';

import Userlist from '../components/Userlist';

const Home = () => {
    const nav = useNavigate()

    const [showMenu, setShowMenu] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {if (!localStorage.getItem('loggedInUser')) {
        nav('/');
    }}, []);

    useEffect(async () => {
        const {data} = await axios.get(`${allUsers}`);
        setUsers(data);
        // console.log(data);
    })

    console.log(users);

    let navMenu

    if(showMenu) {
        navMenu = <div><Userlist users={users}/></div>
    }    


    return (
        <div id='container'>
            {/* <div id='sidebar'>
                <div id='home-header'>
                    <h1>DevsHelp</h1>
                </div>

                <div id='userlist'>
                    <div class='user'>
                        <h3>User</h3>
                        <h4>Skilled in HTML, CSS</h4>
                    </div>
                    <div class='user'>
                        <h3>User 2</h3>
                        <h4>Skilled in React.js</h4>
                    </div>
                    <div class='user'>
                        <h3>User 3</h3>
                        <h4>Skilled in Node.js</h4>
                    </div>
                </div>
            </div> */}
            <div id='sidebar'>
                <Userlist />
            </div>


            {navMenu}

            

            <div id="message-board">
                <header id="message-header">
                    <span id="nav-logo">
                        <FontAwesomeIcon icon={ faBars } onClick={() => setShowMenu(!showMenu)} />
                    </span>
                    <h1>You are now talking to johnclimie</h1>
                </header>


                <div id='chatlog'>

                </div>

                <div id='message-input'>
                    <textarea id='text-box' rows="3"></textarea>
                    <button id='send-btn'>Send</button>
                </div>
            </div>
        </div>
    )
};

export default Home;