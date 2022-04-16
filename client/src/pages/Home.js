// Imoprts all dependencies 
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { allUsersRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

// Imports all components 
import Userlist  from '../components/Userlist';
import Noneselected from '../components/Noneselected'
import Chatlog from '../components/Chatlog';

const Home = () => {
    // Nav redirects page
    const nav = useNavigate()
    // Sets up socket.io on client side
    const socket = useRef();

    // Creates useStates 
    const [userList, setUserList] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState({});
    const [currentChat, setCurrentChat] = useState(undefined);
    const [showMenu, setShowMenu] = useState(false);

    // Pre-declares variables
    let navMenu;
    let heading; 
    let chatContainer;


    // Stores current logged in user
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

    // If a user is logged in, the user is added into the online user array
    useEffect(() => {
        if (loggedInUser) {
            socket.current = io('http://localhost:3000');

            socket.current.emit('add-user', loggedInUser._id);
        }
    }, [loggedInUser])

    // Retrieves all users for a contacts list
    useEffect(() => {
            const fetchUsers = async () => {

                const data = await axios.get(`${allUsersRoute}/${loggedInUser._id}`);
                setUserList(data.data);
            }
    
            fetchUsers().catch(console.error);
    }, [loggedInUser._id])

    // Changes chat
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }
    
    // Allows access to sidebar for mobile media queries
    if(showMenu) {
        navMenu= <Userlist users={userList} switchChat={handleChatChange}/>
    }

    // Chat container displays "No user has been selected" if currentChat is not defined
    if (currentChat === undefined) {
        heading = <h1>Select someome to speak to!</h1>
        chatContainer = <Noneselected />

    // Shows current chat for user
    } else if (currentChat !== undefined) {
        heading=<h1>You are speaking with {currentChat.username}</h1>
        chatContainer = <Chatlog currentChat={currentChat} socket={socket} />
    }


    // Returns HTML
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

// Exports home page
export default Home;
