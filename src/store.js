import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./redux/todoSlice"
import userReducer from "./redux/userSlice"

export const store = configureStore({
    reducer:{
        todo: todoReducer,
        user: userReducer
    }
})

