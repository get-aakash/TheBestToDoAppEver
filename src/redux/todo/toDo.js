import { QuerySnapshot, addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebase-config"
import { toast } from "react-toastify"
import { create } from "../toDoSlice"


export const getToDo =  (userId) => async(dispatch)=>{
   
   try {
    const q = query(collection(db, "todos"),
    where('userId', "==", userId)
    )
    let value = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc)=>{
        const {id} = doc
        const data = {...doc.data(),id}
        value.push(data)
    })
    dispatch(create(value))
    
   } catch (error) {
    
   }
}