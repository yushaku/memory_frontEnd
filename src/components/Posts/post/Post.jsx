import React, {useState} from 'react';
import useStyle from './style.js'
import { Card, CardContent, CardMedia, Button, Typography, CardActions, ButtonBase } from '@material-ui/core'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deletePost, likePost } from '../../../redux/apiRequest.js'


function Post({ post, setCurrentID }) {

   const classes = useStyle();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [likes, setLikes] = useState(post?.likes)
   
   const user = JSON.parse(localStorage.getItem('profile'))
   const userId = user?.result?.googleId || user?.result?._id
   const haveLikePost = likes.find((like) => like === userId);

   const handleLikePost = () => {
      likePost(post._id, dispatch)
      if(haveLikePost){
         setLikes(likes.filter((id)=> id !== userId))

      }else{
         setLikes([...likes, userId])
      }
   }

   const handleDeletePost = () => {
      deletePost(post._id, dispatch)
   }

   const Likes = () => {
      if (likes.length > 0) {
         return haveLikePost ? 
            (
               <><ThumbUpIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
            ) : (
               <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
      }

      return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
   };

   const handleOpenPost = () => {
      navigate(`/posts/${post._id}`)
   }

   return (
      <Card className={classes.card} raised elevation={6}>
         <ButtonBase className={classes.cardAction} onClick={handleOpenPost}>
            <CardMedia component="img" alt="image memory" className={classes.CardMedia} image={post.selectedFile} title={post.title} />

            <div className={classes.overlay}>
               <Typography variant='h6'>{post.name}</Typography>
               <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>

            <div className={classes.details}>
               <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag}`)}</Typography>
            </div>
            
            <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
            <Typography className={classes.message} variant='body2' color='textSecondary' component="p">{post.message}</Typography>
            
         </ButtonBase>

         <CardActions>
         {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
               <div className={classes.overlay2}>
                  <Button
                     style={{ color: 'white' }}
                     onClick={() => {
                        setCurrentID(post._id)
                     }}>
                     <BorderColorIcon fontSize='small' />
                  </Button>
               </div>
            )}

            <Button size='small' color='primary'
               disabled={!user?.result}
               onClick={handleLikePost}>
               <Likes />
            </Button>

            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
               <Button size='small' color='primary'
                  onClick={handleDeletePost}>
                  <DeleteIcon fontSize='small' /> Delete
               </Button>
            )}
         </CardActions>
      </Card >
   )
}

export default Post;
