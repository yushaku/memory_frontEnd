import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64';

import {createPost, updatePost} from '../../redux/apiRequest.js'
import useStyle from './style.js'

function Form({currentID, setCurrentID}) {

   const classes = useStyle();
   const dispatch = useDispatch();
   
   const post = useSelector(state => 
      currentID ? state.galleryPosts.allPosts.posts.find((p)=> p._id === currentID) : null
   )

   const user = JSON.parse(localStorage.getItem('profile'))

   const [postsData, setPostsData] = useState({ title: '', message: '', tags: '', selectedFile: null})

   useEffect(()=>{
      if(post) {
         setPostsData(post)
      }
   },[post])
   
   const handleSubmit = (e) => {
      e.preventDefault();
      
      if(currentID){
         console.log('start to update post');
         updatePost(currentID, {...postsData, name: user?.result?.name}, dispatch)
      }else{
         console.log('start to create post');
         createPost({...postsData, name: user?.result?.name}, dispatch);
      }
      clearForm()
   }

   const clearForm = ()=>{
      setCurrentID(null)
      setPostsData({title: '', message: '', tags: '', selectedFile: null })
   }

   if(!user?.result?.name){
      return(
         <Paper className={classes.paper}>
            <Typography variant='h6' align='center'>
               Please sign in to create new post and Interact with post
            </Typography>
         </Paper>
      )
   }
   return (
      <Paper className={classes.paper} elevation={6}>
         <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>

            <Typography variant='h5'> { currentID ? 'Editing' : 'Creating'} a Memory</Typography>

            <TextField name='title' variant='outlined' label='title' fullWidth value={postsData.title}
               onChange={(e) => setPostsData({ ...postsData, title: e.target.value })} />

            <TextField name='message' variant='outlined' label='message' fullWidth value={postsData.message}
               onChange={(e) => setPostsData({ ...postsData, message: e.target.value })} />

            <TextField name='tags' variant='outlined' label='tags' fullWidth value={postsData.tags}
               onChange={(e) => setPostsData({ ...postsData, tags: e.target.value.split(',') })} />
            
            <div className={classes.fileInput}>
               <FileBase type = 'file' multiple = {false} onDone = {({base64})=>setPostsData({...postsData, selectedFile: base64})} />
            </div>

            <Button variant='contained' size='large' color= 'primary' className={classes.buttonSubmit} type='submit' fullWidth>Submit</Button>
            <Button variant='contained' size='small' color= 'secondary' fullWidth onClick={clearForm}>clear</Button>
         </form>
      </Paper>);
}

export default Form;
