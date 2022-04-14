import React, { useState } from 'react';

const Input = ({ handleSendMsg }) => {
    const [msg, setMsg] = useState("");

    const sendMsg = (event) => {
        event.preventDefault();
        if (msg.length >= 0) {
            handleSendMsg(msg);
            console.log(msg);
            setMsg("");
        }
    };

    return (
        <form id='message-input' onSubmit={(event) => sendMsg(event)}>
                <textarea id='text-box' rows="3" onChange={(e) => setMsg(e.target.value)} value={msg}></textarea>
                <button id='send-btn' type="submit">Send</button>
        </form>
    )
}

export default Input;