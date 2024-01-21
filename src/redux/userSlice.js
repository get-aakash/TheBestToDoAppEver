import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        userInfo:[]
    },
    reducers:{
        createUser: (state,{payload})=>{
            state.userInfo = payload


        }
    }

})

const {reducer, actions} = userSlice
export const {createUser} = actions
export default reducer