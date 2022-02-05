import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {Container} from '@material-ui/core'

import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import PostDetails from './components/Posts/postDetails/PostDetails.jsx';
import Auth from './components/Auth/Auth.jsx';

function App() {

   const user = JSON.parse(localStorage.getItem('profile'))

   return (
      <BrowserRouter>
         <Container maxWidth = "lg">

            <Navbar/>

            <Routes>
               <Route path='/' exact element={<Navigate to='/posts'/>} />
               <Route path='/posts' exact element={<Home/>} />
               <Route path='/posts/:id' exact element={<PostDetails/>} />
               <Route path='/posts/search' exact element={<Home/>} />
               <Route path='/auth' exact element={!user ? <Auth/> : <Navigate to='/posts'/>} />
            </Routes>

         </Container>
      </BrowserRouter>
   );
}

export default App;
