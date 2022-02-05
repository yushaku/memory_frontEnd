import React from 'react';
import Post from './post/Post.jsx';
import meUseStyle from './style.js'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux';

function PostGallery({ setCurrentID }) {

   const classes = meUseStyle();
   console.log('get posts from store');
   const storePost = useSelector(state => state.galleryPosts.allPosts.posts)
   const {isLoading} = useSelector(state => state.galleryPosts)

   if(!storePost.length && !isLoading){
      return 'no post'
   }
   return (
      isLoading ? <CircularProgress /> : (
         <Grid className={classes.mainContainer} container alignItems='stretch' spacing={2}>
            {
               storePost.map((post) => {
                  return (
                     <Grid key={post._id} item xs={12} sm={4} lg={3}>
                        <Post post={post} setCurrentID={setCurrentID}  />
                     </Grid>
                  )
               })
            }
         </Grid>
      )
   );
}

export default PostGallery;
