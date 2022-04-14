import React, { useEffect, useState, } from 'react';
import Input from './Input';
import axios from 'axios';
import { sendMsgRoute, getMsgRoute } from '../utils/APIRoutes';

const Chatlog = ({ currentChat }) => {
    const [msgs, setMsgs] = useState([]);

    console.log(currentChat);

    // useEffect(async () => {
    //     const data = await JSON.parse(
    //         localStorage.getItem('loggedInUser')
    //     );

    //     const response = await axios.post(getMsgRoute, {
    //         sender: data._id,
    //         receiver: currentChat._id,
    //     })

    //     setMsgs(response.data);


    // }, [currentChat]);

    useEffect(() => {
        async function fetchData() {
            const data = await JSON.parse(
                localStorage.getItem('loggedInUser')
            );
    
            const response = await axios.post(getMsgRoute, {
                sender: data._id,
                receiver: currentChat._id,
            })
    
            setMsgs(response.data);
        }

        fetchData();
    }, [currentChat])

    console.log(msgs);
    return (
        <>
            <div>
                <div>
                    <h1>Chatlog</h1>
                </div>
            </div>

            
            <Input />
        </>
    )
}


export default Chatlog