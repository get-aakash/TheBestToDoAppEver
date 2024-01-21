import { configureStore } from "@reduxjs/toolkit";
import toDoReducer  from "./redux/toDoSlice";
import userReducer from "./redux/userSlice"

export default configureStore({
    reducer:{
        toDo:toDoReducer,
        user: userReducer

    }

})