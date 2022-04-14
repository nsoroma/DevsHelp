import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { allUsersRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';

import Userlist from '../components/Userlist';

const Home = () => {
    const nav = useNavigate()

    const [userList, setUserList] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState({});
    const [showMenu, setShowMenu] = useState(false);

    let navMenu

    // if(showMenu) {
    //     navMenu = <div><Userlist/></div>
    // }    

    useEffect(() => {
        const setLoggedIn = async() => {
            if (!localStorage.getItem('loggedInUser')) {
                nav('/');
            } else {
                setLoggedInUser(await JSON.parse(localStorage.getItem('loggedInUser')))
            }
        }

        setLoggedIn().catch(console.error);
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await axios.get(`${allUsersRoute}/${loggedInUser._id}`);
            setUserList(data.data);
        }

        fetchUsers().catch(console.error);
    }, [loggedInUser._id])


    const testArr = userList;
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
            {/* {console.log(userList)}; */}
            {console.log(testArr)}

            {testArr.map((user) => {
                console.log(user.username);
            })}


            <div id='sidebar'>
                <div>
                <div id='home-header'>
                    <h1>DevsHelp</h1>
                </div>

                <div id='userlist'>
                    {testArr.map((user) => {
                        return (
                            <div className='user'>
                                <h3>{user.username}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>
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