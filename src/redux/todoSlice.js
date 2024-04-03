import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    todoData : []
}

export const todoSlice = createSlice({
    name: "data",
    initialState,
    reducers:{
        createTodo: (state,{payload})=>{
            state.todoData = payload
        }

    }
})

const {reducer, actions} = todoSlice

export const {createTodo} = actions

export default reducer