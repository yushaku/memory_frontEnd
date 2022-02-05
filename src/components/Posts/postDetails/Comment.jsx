import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { commentPost } from '../../../redux/apiRequest.js'

import useStyle from './style.js'

function Comment({ postDetail }) {

  const classes = useStyle()
  const dispatch = useDispatch();
  const [comments, setComments] = useState(postDetail?.comments)
  const [comment, setComment] = useState('')
  const user = JSON.parse(localStorage.getItem('profile'))


  console.log(user);
  const handleAddComment = async () => {
    const finalComment = `${user.result.name}: ${comment}`
    const newComments = await commentPost(finalComment, postDetail._id, dispatch)
    setComments(newComments)
    setComment('')
  }

  return (
    <div>
      <div className={classes.commentOuterContainer}>

      <div className={classes.commentTitle}>
        <Typography gutterBottom variant='h5'>Comments</Typography>
      </div>

        {user?.result?.name && (
          <div style={{ width: '95%' }} >
            <TextField
              fullWidth
              variant='outlined'
              label='comment'
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <Button style={{ marginTop: '10px' }} color='primary' fullWidth disabled={!comment} variant='contained' onClick={handleAddComment}>
              Add comment
            </Button>
          </div>
        )}

        {comments?.length ? (
          comments.map((comment, index) => (
            <Typography key={index} gutterBottom variant='h6' style={{paddingTop:'16px'}}>
              <strong>{comment.split(':')[0]}</strong>:
              {comment.split(':')[1]}
            </Typography>
          ))
        ):(
          <Typography 
            gutterBottom 
            variant='h6'
            style={{paddingTop:'16px'}}
          
          >Don't have any comment yet !!</Typography>
        )}
      </div>

    </div>);
}

export default Comment;
