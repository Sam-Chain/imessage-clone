import React, { useEffect, useState } from 'react'
import './Sidebar.css'

import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';

function Sidebar() {
    const user = useSelector(selectUser)
    const [ chats, setChats ] = useState([])

    useEffect(()=>{
        db.collection('chats').onSnapshot(snapshot=>
           setChats( snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
           }) ))
        )
    })

    const addChat = ()=>{
        const chatName = prompt('Enter a chat name')
        if(chatName){
            db.collection('chats').add({
                chatName: chatName,
            })
        }
    }
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar  
                    src={user.photo}  className="sidebar__avatar" 
                    onClick={()=>auth.signOut()}
                />
                
                <div className="sidebar__input">
                    <SearchIcon />
                    <input type="text"/>
                </div>

                <IconButton variant="outlined" className="sidebar__inputButton">
                    <RateReviewOutlinedIcon onClick={addChat}/>
                </IconButton>

            </div>

            <div className="sidebar__chats">
               { chats.map( ({id, data: {chatName, }})=> 
                    <SidebarChat key={id} id={id} chatName={chatName} />
                )}
            </div>
        </div>
    )
}

export default Sidebar
