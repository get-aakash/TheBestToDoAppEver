import { createSlice } from "@reduxjs/toolkit";

export const toDoSlice = createSlice({
    name:'toDo',
    initialState:{
        todoInfo:[]
    },
    reducers:{
        createTodo: (state,{payload})=>{
            state.todoInfo = payload


        }
    }

})

const {reducer, actions} = toDoSlice
export const {createTodo} = actions
export default reducer