import React from 'react';

const Userlist = (users) => {

    return (
            <div>
                <div id='home-header'>
                    <h1>DevsHelp</h1>
                </div>

                <div id='userlist'>
                    <div className='user'>
                        <h3>User</h3>
                        <h4>Skilled in HTML, CSS</h4>
                    </div>
                    <div className='user'>
                        <h3>User 2</h3>
                        <h4>Skilled in React.js</h4>
                    </div>
                    <div className='user'>
                        <h3>User 3</h3>
                        <h4>Skilled in Node.js</h4>
                    </div>
                </div>
            </div>
    )
}

export default Userlist;