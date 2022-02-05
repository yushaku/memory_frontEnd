import { createSlice } from "@reduxjs/toolkit";

export const postGallerySlice = createSlice({
   name: "postGallery",

   initialState: {
      isLoading: true,
      postDetail:{
         title:'',
         message:'',
         tags:[],
         name:'',
         createdAt:'',
         selectedFile:'',
      },
      allPosts: {
         posts:[],
         currentPage:0,
         numberOfPage:0,
      },
   },

   reducers: {

      START_LOADING:(state)=>{
         state.isLoading = true;
      },

      END_LOADING:(state)=>{
         state.isLoading = false;
      },

      GET_ALL: (state, action) => ({
         ...state,
         allPosts: {
            posts: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPage: action.payload.numberOfPages
         }
      }),

      GET_POST_DETAIL: (state, action) => ({
            ...state,
            postDetail: action.payload,
      }),

      GET_BY_SEARCH:(state, action)=>({
         ...state,
         allPosts: {
            ...state.allPosts,
            posts: action.payload,
         }
      }),
      
      CREATE: (state, action) => {
         state.allPosts.posts.push(action.payload);
      },

      UPDATE: (state, action) => {
         const newState = state.allPosts.posts.map((post) => 
            (post._id === action.payload._id ? action.payload : post));
         state.allPosts.posts = newState;
      },
      DELETE: (state, action) => {
         const newState = state.allPosts.posts.filter((post) => {
            return post._id !== action.payload
         });
         state.allPosts.posts = newState;
      },
      LIKEPOST: (state, action) => {
         const newState =  state.allPosts.posts.map((post) => {

            if(post._id === action.payload._id){
               return post =  action.payload
            }else{
               return post
            }
         });
         state.allPosts.posts = newState;
      },

      COMMENT_POST: (state, action)=>{
         const newState =  state.allPosts.posts.map((post) => {

            if(post._id === action.payload._id){
               return post =  action.payload
            }else{
               return post
            }
         });
         state.allPosts.posts = newState;
      }, 
   },
});
export const {START_LOADING, END_LOADING, GET_ALL,GET_BY_SEARCH, CREATE, UPDATE, DELETE, LIKEPOST, GET_POST_DETAIL, COMMENT_POST } = postGallerySlice.actions;
export default postGallerySlice.reducer;
