import React, { useEffect, useState, } from 'react';
import Input from './Input';
import axios from 'axios';
import { sendMsgRoute, getMsgRoute } from '../utils/APIRoutes';

const Chatlog = ({ currentChat }) => {
    const [msgs, setMsgs] = useState([]);

    // Fetches messages from user signed in and user selected - WORKS
    useEffect(() => {
        async function fetchData() {
            const data = await JSON.parse(
                localStorage.getItem('loggedInUser')
            );

            const response = await axios.post(getMsgRoute, {

                sender: data._id,
                receiver: currentChat.username,

            })
            setMsgs(response.data);
        }

        fetchData();
    }, [currentChat])
    
    const handleMsgSender = async (msg) => {
        const data = await JSON.parse(
            localStorage.getItem('loggedInUser')
        );

        console.log(msg);

        await axios.post(sendMsgRoute, {
            sender: data._id,
            receiver: currentChat._id,
            msg: msg,
        });

        const msgArr = [...msgs];
        msgArr.push({ fromSelf: true, message: msg});
        setMsgs(msgArr);
    }

    console.log(msgs);
    return (
        <>
            <div>
                <div>
                    <h1>Chatlog</h1>
                </div>
            </div>

            
            <Input handleMsgSender={handleMsgSender}/>
        </>
    )
}


export default Chatlog