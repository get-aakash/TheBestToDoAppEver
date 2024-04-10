import { collection, getDoc, getDocs, query, where } from "firebase/firestore"
import { createTodo } from "./todoSlice"
import { useDispatch } from "react-redux";
import { db } from "../firebase-config/firebaseConfig";

export const getTodos = (uid) => async (dispatch) => {

    try {
        const q = query(collection(db, "todos"),
            where("uid", "==", uid))

        let todos = []

        const querySnapshot = await getDocs(q)
        
        querySnapshot.forEach((doc) => {
            const { id } = doc
            const data = { ...doc.data(), id }
            console.log(data)
            todos.push(data)
        })
        
        dispatch(createTodo(todos))
    } catch (error) {
        console.log(error)
    }

}
