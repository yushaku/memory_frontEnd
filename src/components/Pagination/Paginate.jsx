import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Pagination, PaginationItem } from '@material-ui/lab'
import useStyle from './style.js';
import { getAllPost } from '../../redux/apiRequest.js'

function Paginate({page}) {

   const classes = useStyle();
   const dispatch = useDispatch()
   const {numberOfPage} = useSelector(state => state.galleryPosts.allPosts)

   useEffect(()=>{
      if(page){
         getAllPost(page, dispatch)
      }
   },[page, dispatch])
   return (
      <Pagination
         classes= {{ul: classes.ul}}
         count={numberOfPage}
         page={Number(page) || 1}
         variant='outlined'
         color = 'primary'
         renderItem={(item)=>(
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
         )}
      />
   );
}

export default Paginate;
