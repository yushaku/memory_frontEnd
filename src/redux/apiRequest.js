import axios from "axios";
import {
   START_LOADING,
   END_LOADING,
   GET_ALL,
   GET_POST_DETAIL,
   GET_BY_SEARCH,
   CREATE,
   UPDATE,
   DELETE,
   LIKEPOST,
   COMMENT_POST,
} from "./postGallerySlice.js";
import { auth } from "./userSlice.js";

//const url = "http://localhost:4200";
const url = 'https://memory5011.herokuapp.com'
const API = axios.create({ baseURL: url });
API.interceptors.request.use((req) => {
   if (localStorage.getItem("profile")) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
   }
   return req;
});

export const getAllPost = async (page, dispatch) => {
   try {
      dispatch(START_LOADING());
      console.log("get data from database");
      const resData = await API.get(`/posts?page=${page}`);
      console.log(resData.data);
      dispatch(GET_ALL(resData.data));
      dispatch(END_LOADING());
   } catch (error) {
      console.log(error);
   }
};
export const getPostDetail = async (id, dispatch) => {
   try {

      dispatch(START_LOADING());
      const resData = await API.get(`/posts/${id}`);
      console.log('get post detail frm database');
      console.log(resData.data);
      dispatch(GET_POST_DETAIL(resData.data));

      dispatch(END_LOADING());
   } catch (error) {
      console.log(error);
   }
};

export const getPostsBySearch = async (searchQuery, dispatch) => {
   try {
      dispatch(START_LOADING());
      const resData = await API.get(
         `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`
      );
      console.log("searching post from database");
      console.log(resData.data);
      dispatch(GET_BY_SEARCH(resData.data.data));
      dispatch(END_LOADING());
   } catch (error) {
      console.log(error);
   }
};

export const createPost = async (postForm, dispatch) => {
   try {
      dispatch(START_LOADING());
      const postData = await API.post("/posts/createPost", postForm);
      dispatch(CREATE(postData.data));
      dispatch(END_LOADING());
   } catch (error) {
      console.log(error);
   }
};

export const updatePost = async (currentId, postForm, dispatch) => {
   try {
      const { data } = API.patch(`/posts/${currentId}`, postForm);
      dispatch(UPDATE(data));
   } catch (error) {
      console.log(error);
   }
};

export const deletePost = async (currentId, dispatch) => {
   console.log("send command delete post to server");
   try {
      await API.delete(`/posts/${currentId}`);
      console.log("delete post in store");
      dispatch(DELETE(currentId));
   } catch (error) {
      console.log(error);
   }
};

export const likePost = async (currentId, dispatch) => {
   console.log("like post and update it to server");
   try {
      const { data } = await API.patch(`/posts/${currentId}/like`);
      console.log("update like couting to store");
      dispatch(LIKEPOST(data));
   } catch (error) {
      console.log(error);
   }
};

export const commentPost = async (comment, id, dispatch) => {
   try {
      const { data } = await API.post(`/posts/${id}/comment`, { comment });
      console.log(data);
      dispatch(COMMENT_POST(comment));
      return data.comments;
   } catch (error) {}
};

export const signIn = async (FormData, dispatch, navigate) => {
   console.log("sign in in process");
   try {
      const { data } = await API.post(`/user/signin`, FormData);
      console.log(data);
      dispatch(auth(data));
      navigate("/");
   } catch (error) {
      console.log(error);
   }
};

export const signUp = async (FormData, dispatch, navigate) => {
   console.log("sign up in process");
   try {
      const { data } = await API.post("/user/signup", FormData);
      console.log(data);
      dispatch(auth(data));
      navigate("/");
   } catch (error) {
      console.log(error);
   }
};
