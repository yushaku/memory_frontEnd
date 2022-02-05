import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
   name: 'users',

   initialState:{
      authData:null,
   },

   reducers:{
      auth:(state, action)=>{
         localStorage.setItem('profile', JSON.stringify({...action.payload}))
      },
      logout:(state)=>{
         localStorage.removeItem('profile')
         state.authData = null
      },
   }
})

export default userSlice.reducer
export const {auth, logout} = userSlice.actions
