import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login'

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import GoogleIcon from '@mui/icons-material/Google';

import Input from './Input'
import { auth } from '../../redux/userSlice';
import {signIn, signUp} from '../../redux/apiRequest'
import useStyle from './style'

function Auth() {

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const classes = useStyle()
   const [showPassword, setShowPassword] = useState(false)
   const [passwordConfirmed, setPasswordConfirmed] = useState(true)
   const [isSignUp, setSignUp] = useState(false)
   const [formData, setFormData] = useState({
      firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
   })

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log(formData);

      if(formData.password !== formData.confirmPassword){
         setPasswordConfirmed(false)
      }else{
         setPasswordConfirmed(true)
      }

      if(!isSignUp){
         signIn(formData, dispatch, navigate)
      }

      if(isSignUp && passwordConfirmed){
         signUp(formData, dispatch, navigate)
      }
      
   }

   const handlechange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
   }
   const handleShowPassword = () => {
      setShowPassword(!showPassword)
   }

   const SwitchMode = () => {
      setSignUp(prev => !prev)
   }

   const googleSuccess = async (res) => {
      const result = res?.profileObj
      const token = res?.tokenId

      try {
         dispatch(auth({ result, token }))
         navigate('/')
      } catch (err) {
         console.log(err);
      }
   }
   const googleFailure = (error) => {
      console.log(error);
      console.log('fuck you, u cant sign up with gg, get back later');
   }

   return (
      <Container component='main' maxWidth='xs'>
         <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
               <AssignmentIndIcon />
            </Avatar>
            <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  {
                     isSignUp && (
                        <>
                           <Input value={formData.firstName} name='firstName' label='first name' handlechange={handlechange} half autoFocus />
                           <Input value={formData.lastName} name='lastName' label='last name' handlechange={handlechange} half />
                        </>
                     )
                  }
                  <Input value={formData.email} name='email' label='email address' type='email' handlechange={handlechange} />
                  <Input value={formData.password} name='password' label='password' type={showPassword ? 'text' : 'password'} handlechange={handlechange} handleShowPassword={handleShowPassword} />

                  {isSignUp && 
                  <Input value={formData.confirmPassword} name='confirmPassword' type={showPassword ? 'text' : 'password'} label='repeat password' handlechange={handlechange} handleShowPassword={handleShowPassword}/>}
                  {isSignUp && !passwordConfirmed && <span style={{color: 'red', paddingLeft:'8px'}}>confirm password doesn't match</span>}

               </Grid>

               <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                  {isSignUp ? 'Sign Up' : 'Sign In'}
               </Button>

               <GoogleLogin
                  clientId='614697368533-gir6tkka7i9gval5n29n79orvv7gfc6b.apps.googleusercontent.com'
                  render={(renderProps) => (
                     <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant='contained' startIcon={<GoogleIcon />} >
                        Google sign in
                     </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy='single_host_origin'
               />

               <Grid container >
                  <Grid item>
                     <Button onClick={SwitchMode}>{isSignUp ? 'Already have an accout? Sign in' : 'Do not have an accout? Sign up'}</Button>
                  </Grid>
               </Grid>
            </form>
         </Paper>

      </Container>

   );
}

export default Auth;
