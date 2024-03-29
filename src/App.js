import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { selectUser, login, logout } from './features/userSlice';
import { auth } from './firebase';
import Imessage from './Imessage';
import Login from './Login';

function App() {
   const user = useSelector(selectUser)
   const dispatch = useDispatch()

   useEffect(() => {
     auth.onAuthStateChanged(authUser=>{
       if(authUser) {
         //the user is logged in
          dispatch(login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName
          }))
       }else{
         //the user is logged out
         dispatch(logout())
       }
     })
   })
  return (
    <div className="app">
      {user?(
        <Imessage/>
      ):(
        <Login/>
      )}
      </div>
  );
}

export default App;
