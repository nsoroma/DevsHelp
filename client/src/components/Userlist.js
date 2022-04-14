import React, { useEffect, useState } from 'react';




const Userlist = ({ users, switchChat }) => {

    const switchCurrentchat = (user) => {
        switchChat(user);
    }

    return (
            <div>
                <div id='home-header'>
                    <h1>DevsHelp</h1>
                </div>

                <div id='userlist'>

                    {users.map((user) => {
                        return (
                            <div key={user._id} className='user' onClick={() => switchCurrentchat(user)} >
                                <h3>{user.username}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>
    )
}

export default Userlist;