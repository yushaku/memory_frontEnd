import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'

import Comment from './Comment.jsx';
import { getPostDetail, getPostsBySearch } from '../../../redux/apiRequest.js'

import useStyle from './style.js'

function PostDetails() {

   const posts = useSelector(state => state.galleryPosts.allPosts.posts)
   const { isLoading, postDetail } = useSelector(state => state.galleryPosts)
   const dispatch = useDispatch()
   const classes = useStyle()
   const navigate = useNavigate()
   const { id } = useParams()



   useEffect(() => {
      getPostDetail(id, dispatch)
   }, [id, dispatch])

   useEffect(() => {
      getPostsBySearch({ search: '', tags: postDetail?.tags.join(',') }, dispatch)
   }, [dispatch])

   const recommentedPosts = posts.filter(({ _id }) => _id !== postDetail._id)
   console.log('postDetail');
   console.log(postDetail);
   console.log('posts');
   console.log(posts);
   console.log('recommentedPosts');
   console.log(recommentedPosts);

   const handleOpenPost = (id) => {
      navigate(`/posts/${id}`)
   }

   if (isLoading) {
      return (
         <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size={'7em'} />
         </Paper>
      )
   }
   else if (!postDetail) {
      return (
         <Paper elevation={6} className={classes.loadingPaper}>
            <Typography>404: post not found</Typography>
         </Paper>
      )
   }
   return (
      <Paper>
         <div className={classes.card}>
            <div className={classes.section}>

               <Typography variant="h3" component="h2">
                  {postDetail.title}
               </Typography>

               <div className={classes.creator}>
                  <Typography variant="h6">
                     Created by: {postDetail.name}
                  </Typography>

                  <Typography variant="h6" >
                     {moment(postDetail.createdAt).fromNow()}
                  </Typography>
               </div>

               <Typography gutterBottom variant="body2" color="textSecondary" component="h2">
                  {postDetail.tags.map((tag) => `#${tag} `)}
               </Typography>

               <Typography gutterBottom variant="body1" component="p">
                  {postDetail.message}
               </Typography>

            </div>

            <div className={classes.imageSection}>
               <img className={classes.media} src={postDetail.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={postDetail.title} />
            </div>
         </div>

         <div>
            <Divider style={{ margin: '20px 0' }} />
            <Comment postDetail={postDetail} />
            <Divider style={{ margin: '20px 0' }} />
         </div>

            <div className={classes.section}>
               <Typography gutterBottom variant='h5'> you might also like: </Typography>
               <Divider />
               {recommentedPosts?.length ? (
               <div className={classes.recommendedPosts}>
                  {recommentedPosts.map(({ _id, title, name, selectedFile }) => (
                     <div className={classes.recommendCard} key={_id} style={{ margin: '20px', cursor: 'pointer' }} onClick={() => handleOpenPost(_id)}>
                        <Typography gutterBottom variant='h6'>{title}</Typography>
                        <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                        <img src={selectedFile} width='200px' alt={name} />
                     </div>
                  ))}
               </div>
         ):(
            <Typography gutterBottom variant='h5'> don't have any recomment post </Typography>
         )}
         </div>

      </Paper>
   );
}

export default PostDetails;
