import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { allUsersRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import Userlist  from '../components/Userlist';
import Noneselected from '../components/Noneselected'
import Chatlog from '../components/Chatlog';
import Input from '../components/Input';

const Home = () => {
    const nav = useNavigate()
    const socket = useRef();

    const [userList, setUserList] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState({});
    const [currentChat, setCurrentChat] = useState(undefined);
    const [showMenu, setShowMenu] = useState(false);
    const [msg, setMsg] = useState('');

    let navMenu;
    let heading; 
    let chatContainer;


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
        if (loggedInUser) {
            socket.current = io('http://localhost:5000');

            socket.current.emit('add-user', loggedInUser._id);
        }
    }, [loggedInUser])

    useEffect(() => {
            const fetchUsers = async () => {

                const data = await axios.get(`${allUsersRoute}/${loggedInUser._id}`);
                setUserList(data.data);
            }
    
            fetchUsers().catch(console.error);
    }, [loggedInUser._id])


    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    const handleMsgChange = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            
        }
    }
    
    if(showMenu) {
        navMenu= <Userlist users={userList} switchChat={handleChatChange}/>
    }

    if (currentChat === undefined) {
        heading = <h1>Select someome to speak to!</h1>
        chatContainer = <Noneselected />

    } else if (currentChat !== undefined) {
        heading=<h1>You are speaking with {currentChat.username}</h1>
        chatContainer = <Chatlog currentChat={currentChat} socket={socket} />
    }


    return (
        <div id='container'>

            <div id='sidebar'>
                <div>
                    <Userlist users={userList} switchChat={handleChatChange} />
                </div>
            </div>

            {navMenu}

            <div id="message-board">
                <header id="message-header">
                    <span id="nav-logo">
                        <FontAwesomeIcon icon={ faBars } onClick={() => setShowMenu(!showMenu)} />
                    </span>
                    {heading}
                </header>

                {chatContainer}

            </div>
        </div>
    )
};

export default Home;
