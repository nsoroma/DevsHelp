// Exports all api routes for users and messages
const host = process.env.PORT

export const registerRoute = `${host}/api/users/register`;
export const loginRoute = `${host}/api/users/login`;
export const allUsersRoute = `${host}/api/users/getusers`;
export const sendMsgRoute = `${host}/api/msgs/sendmsg`;
export const getMsgRoute = `${host}/api/msgs/getmsg`;