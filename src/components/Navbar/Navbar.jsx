import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {AppBar, Typography,Toolbar, Avatar, Button} from '@material-ui/core'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'

import {logout} from '../../redux/userSlice'
import memories from '../../image/memories.jpg'
import useStyle from './style.js'


function Navbar() {
   
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const classes = useStyle();
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

   useEffect(()=>{
      const token = user?.token

      if(token){
         const decodedToken = decode(token)
         if(decodedToken.exp * 1000  < new Date().getTime())
            logout()
      }
      setUser(JSON.parse(localStorage.getItem('profile')))
   },[location])

   const handleLogout =()=>{
      dispatch(logout())
      navigate('/')
      setUser(null)
   }

   return (

      <AppBar className={classes.appBar} position="static" color= "inherit">
         <div className={classes.brandContainer}>
            <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>Memories</Typography>
            <img className={classes.img} src={memories} alt='memories' height='80'/>
         </div>

         <Toolbar className={classes.toolbar}>
            {user ? (
               <div className={classes.profile}>
                  <div className={classes.avatar}>
                     <Avatar className={classes.purple} clt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                     <Typography className = {classes.userName} variant='h6'>{user.result.name}</Typography>
                  </div>
                  <Button variant='contained' className={classes.logout} color='secondary' onClick={handleLogout}>Log out</Button>
               </div>
            ):(
               <div>
                  <Button component={Link} to='/auth' variant='contained' color='primary'>Sign in</Button>
               </div>
            )}
         </Toolbar>
      </AppBar>
   )
}

export default Navbar;
