import React, { useEffect, useState, } from 'react';
import Input from './Input';
import axios from 'axios';
import { sendMsgRoute, getMsgRoute } from '../utils/APIRoutes';

const Chatlog = ({ currentChat, socket }) => {
    const [msgs, setMsgs] = useState([]);
    const [incomingMsg, setIncomingMsg] = useState(null);

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
    
    // Posts messages to API - WORKS
    const handleMsgSender = async (msg) => {
        const data = await JSON.parse(
            localStorage.getItem('loggedInUser')
        );
        await axios.post(sendMsgRoute, {
            sender: data._id,
            receiver: currentChat.username,
            msg: msg,
        });

        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: data._id,
            message: msg,
        })

        const msgArr = [...msgs];
        msgArr.push({ fromSelf: true, message: msg});
        setMsgs(msgArr);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-recieve', (msg) => {
                setIncomingMsg({fromSelf: false, message: 'test'})
            })
        }
    }, []);

    console.log(incomingMsg);

    useEffect(() => {
        incomingMsg && setMsgs((prev) => [...prev, incomingMsg]);
    }, [incomingMsg]);

    console.log(msgs);


    return (
        <>

                    <h1>Chatlog</h1>
                    {msgs.map((msg) => {
                        
                        return (
                            <div key={"key"+msg.message+Math.random()}><p>{msg.message}</p></div>
                        )
                    })}


            
            <Input handleMsgSender={handleMsgSender}/>
        </>
    )
}


export default Chatlog