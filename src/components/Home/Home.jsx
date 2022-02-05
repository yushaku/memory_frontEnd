import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Grid, Grow, Paper, AppBar, TextField, Button, Chip } from '@material-ui/core'
import {getPostsBySearch } from '../../redux/apiRequest.js'

import PostGallery from '../Posts/PostGallery';
import Form from '../Form/Form.jsx';
import Paginate from '../Pagination/Paginate.jsx';
import useStyle from './style.js'

function useQuery() {
   return new URLSearchParams(useLocation().search)
}
function Home() {

   const classes = useStyle();
   const dispatch = useDispatch()
   const query = useQuery()
   const navigate = useNavigate()
   const page = query.get('page') || 1
   //const searchQuery = query.get('searchQuery')
   const [currentID, setCurrentID] = useState(null);
   const [search, setSearch] = useState('')
   const [tags, setTags] = useState([])

   const handleKeyPress = (e) => {
      if (e.keyCode === 13) {
         searchPost()
      }
   }

   const handleAddsearchTags = (tag) => {
      setTags([...tags, tag])
   }

   const handleDeletesearchTags = (deleteTag) => {
      setTags(tags.filter((tag) =>
         tag !== deleteTag
      ))
   }

   const searchPost = () => {
      if (search.trim()) {
         getPostsBySearch({ search,  tags: tags.join(',')}, dispatch)
         navigate(`/posts/search?searchQuery=${search || 'none'}&tag=${tags.join(',')}`)
      } else {
         navigate('/')
      }
   }

   return (
      <Grow in>
         <Container maxWidth='xl'>
            <Grid container className={classes.gridContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>

               <Grid item xs={12} xm={6} md={9}>
                  <PostGallery setCurrentID={setCurrentID} />
               </Grid>

               <Grid item xs={12} xm={6} md={3}>

                  <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                     <TextField
                        name='search' variant='outlined' label='search memory'
                        fullWidth
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                        onKeyPress={handleKeyPress}
                     />
                     <Button onClick={searchPost} variant='contained' color='primary' className={classes.searchButton}>search posts</Button>
                  </AppBar>

                  {tags.map((tag, index) => {
                     return (
                        <Chip
                           key={index}
                           style={{ margin: '10px 0' }} value={tags} label={tag}
                           variant='outlined'
                           // onAdd={handleAddsearchTags}
                           onDelete={handleDeletesearchTags}
                        />
                     )
                  })}



                  <Form currentID={currentID} setCurrentID={setCurrentID} />

                  <Paper className={classes.pagination} elevation={6}>
                     <Paginate page={page}/>
                  </Paper>

               </Grid>

            </Grid>
         </Container>
      </Grow>
   );
}

export default Home;
