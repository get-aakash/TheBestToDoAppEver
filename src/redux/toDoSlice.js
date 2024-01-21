import { createSlice } from "@reduxjs/toolkit";

export const toDoSlice = createSlice({
    name:'toDo',
    initialState:{
        todoInfo:[]
    },
    reducers:{
        create: (state,{payload})=>{
            state.todoInfo = payload


        }
    }

})

const {reducer, actions} = toDoSlice
export const {create} = actions
export default reducer