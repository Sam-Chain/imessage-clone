import React, { useEffect, useState } from 'react'
import './Chat.css'
import MicNoneIcon from '@material-ui/icons/MicNone';
import { IconButton } from '@material-ui/core';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectchatId, selectchatName } from './features/chatSlice';
import db from './firebase';

function Chat() {
    const [input, setInput] = useState('');

    const chatName = useSelector(selectchatName)
    const chatId   = useSelector(selectchatId)
    
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        if(chatId){
            db.collection('chats').doc(chatId).collection('messages')
            .orderby('tmestamp', 'desc').onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>({
                    id: doc.id,
                    data: doc.data
                })))
            ))
        }
    }, [chatId])
    const sendMessage = e => {
        e.preventDeafault();

        setInput('')
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <h4>To:  <span className="chat__name">{chatName}</span> </h4>
                <strong>Details</strong>
            </div>

            <div className="chat__messages">
                {messages.map(({id, data})=>(
                    <Message key={id} id={id} contents={data} />
                ))}
            </div>

            <div className="chat__input">
                <form >
                    <input 
                        type="text" 
                        placeholder="Imessage"  
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                    />
                    
                    <button onClick={sendMessage} >send</button>
                </form>
                <IconButton>
                    <MicNoneIcon className="chat__mic"/>      
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
