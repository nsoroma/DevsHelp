import React, { useEffect, useState, } from 'react';
import Input from './Input';
import axios from 'axios';
import { sendMsgRoute, getMsgRoute } from '../utils/APIRoutes';
import {v4 as uuid} from 'uuid';

const Chatlog = ({ currentChat, socket }) => {
    const [msgs, setMsgs] = useState([]);
    const [incomingMsg, setIncomingMsg] = useState(null);

    // Fetches messages from user signed in and user selected - WORKS
    useEffect(() => {
        async function fetchData() {
            if (currentChat) {
                const data = await JSON.parse(
                    localStorage.getItem('loggedInUser')
                );
    
                const response = await axios.post(getMsgRoute, {
    
                    sender: data._id,
                    receiver: currentChat.username,
    
                })
                setMsgs(response.data);
            }
        }

        fetchData();
    }, [currentChat])
    
    // Posts messages to API - WORKS
    const handleMsgSender = async (msg) => {
        const data = await JSON.parse(
            localStorage.getItem('loggedInUser')
        );

        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: data._id,
            message: msg,
        })

        await axios.post(sendMsgRoute, {
            sender: data._id,
            receiver: currentChat.username,
            msg: msg,
        });

        const msgArr = [...msgs];
        msgArr.push({ fromSelf: true, message: msg});
        setMsgs(msgArr);

    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-recieve', (message) => {
                // console.log(msg);
                setIncomingMsg({fromSelf: false, message: message})
            })
        }
    }, []);


    useEffect(() => {
        incomingMsg && setMsgs((prev) => [...prev, incomingMsg]);
    }, [incomingMsg]);

    console.log(msgs);


    // let statement;



    return (
        <>
                    {msgs.map((msg) => {
                        if (msg.fromSelf) {
                            return (<div key={uuid()} className="fromSelf"><p><u>You:</u> {msg.message}</p></div>)
                        } else {
                            return (<div key={uuid()} className='fromOther'><p><u>{currentChat.username}</u>: {msg.message}</p></div>)
                        }
                    })}


            
            <Input handleMsgSender={handleMsgSender}/>
        </>
    )
}


export default Chatlog