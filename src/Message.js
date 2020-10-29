import React from 'react'
import './Message.css'
import { Avatar } from '@material-ui/core'

function Message({id, contents}) {
    return (
        <div className='message'>
            <Avatar/>
            <p>message one</p>
            <small>timestamp</small>
        </div>
    )
}

export default Message
