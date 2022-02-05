import { configureStore } from "@reduxjs/toolkit";
import posts from "./postGallerySlice.js";
import users from "./userSlice.js";

const store = configureStore({
   reducer:{
      galleryPosts: posts,
      users,
   }
});
export default store;
