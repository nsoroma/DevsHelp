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
    
    // Posts messages to API - WORKS
    const handleMsgSender = async (msg) => {
        const data = await JSON.parse(
            localStorage.getItem('loggedInUser')
        );

        const response = await axios.post(sendMsgRoute, {
            sender: data._id,
            receiver: currentChat.username,
            msg: msg,
        });

        const msgArr = [...msgs];
        msgArr.push({message: msg});
        setMsgs(msgArr);

    }


    return (
        <>

                    <h1>Chatlog</h1>
                    {/* {msgs.map((msg) => {
                        
                        return (
                            <div key={"key"+msg.message+Math.random()}><p>{msg.message}</p></div>
                        )
                    })} */}

                    {msgs.map((msg) => {
                        return (
                            <div>
                                <div className={`message ${msg.fromSelf ? "sent":"recieved"}`}>
                                    <div className='msg-frame'>
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}


            
            <Input handleMsgSender={handleMsgSender}/>
        </>
    )
}


export default Chatlog