// Imports Dependencies
import React, { useState } from 'react';

const Input = ({ handleMsgSender }) => {
    // Sets up msg as a useState
    const [msg, setMsg] = useState("");

    // Sets msg as input
    const sendMsg = (event) => {
        event.preventDefault();
        if (msg.length >= 0) {
            handleMsgSender(msg);
            setMsg("");
        }
    };

    // Returns HTML
    return (
        <form id='message-input' onSubmit={(event) => sendMsg(event)}>
                <textarea id='text-box' rows="3" onChange={(e) => setMsg(e.target.value)} value={msg}></textarea>
                <button id='send-btn' type="submit">Send</button>
        </form>
    )
}

// Exports component
export default Input;