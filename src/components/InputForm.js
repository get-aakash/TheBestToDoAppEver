import React, { useEffect, useId, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import "../App.css"
import DisplayTable from './DisplayTable'
import { toast } from 'react-toastify'
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc } from 'firebase/firestore'
import { db } from '../firebase-config/firebaseConfig'
import { randomStrGenerator } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { createTodo } from '../redux/todoSlice'

let globalId = 0
const initialState = {
    todo: "",
    date: "",


}
const InputForm = () => {
    const [formData, setFormData] = useState(initialState)
    const [toDo, setToDO] = useState([])
    const [value, setValue] = useState([])
    const dispatch = useDispatch()
    const {todoData} = useSelector(state=>state.todo)
   

    useEffect(()=>{
        dispatch(createTodo(toDo))
    },[toDo,dispatch])

    const handleOnDelete = (id)=>{
        if(window.confirm("Are you sure to delete this todo?")){
          const filteredTodo = toDo.filter((item,i)=>i !== id)
          setToDO(filteredTodo)
          console.log(filteredTodo)
          dispatch(createTodo(filteredTodo))
        }
    }
    // const fetchData = async()=>{
    
    //     const q = query(collection(db, 'todos'))
    //     const querySnapshot = await getDocs(q)
    //     const todosData = []
    //     querySnapshot.forEach((doc)=>{
    //         todosData.push({id: doc.id,...doc.data()})
           
           
           
    //     })
    //     setValue(todosData)
        
    // }
    
    // const handleOnDelete = async (id) => {
       
    //     if (window.confirm("Are you sure you want to delete this?")) {
    //             //  try {
    //             //     await deleteDoc(doc(db, 'todos', id));
    //             //      toast.success("Todo has been deleted");
    //             //     fetchData();
    //             //  } catch (error) {
    //             //      console.error("Error deleting document:", error);
    //             //     toast.error("Failed to delete todo: " + error.message); // Display error message
    //             //  }
    //          }
        
       
    // }

 
    
    const handleOnchange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const handleOnsubmit = async (e) => {
        e.preventDefault()
    
        const obj = { ...formData, createdAt: Date.now() }
        setToDO([...toDo, obj])
        setFormData(initialState)
        //const docRef = await addDoc(collection(db, 'todos'), obj)
        // if(docRef?.id){
        //     setFormData(initialState)
           
        //     return toast.success("The Todo is created!!")
        // }     
    }

   
    console.log(toDo)

   
    console.log(toDo)





    return (
        <div className=" ">
            <Form onSubmit={handleOnsubmit} className='wrapper p-4 text-center d-flex align-items-center justify-content-center' >
                <Row className='gap-2' >
                    <Col md={4} >
                        <Form.Control required value={formData.todo} name='todo' placeholder="Enter Your ToDo..." onChange={handleOnchange} />
                    </Col>
                    <Col md={4} >
                        <Form.Control required type='date' value={formData.date} name='date' placeholder="Date" onChange={handleOnchange} />
                    </Col>
                    <Col md={2}>
                        <Button type='submit' variant='success'>Create</Button>
                    </Col>

                </Row>
            </Form>
            <span className="d-block p-1 bg-info "></span>
            <div className="display">
        <DisplayTable handleOnDelete = {handleOnDelete} todoData={todoData} />
      </div>
            
        </div>

    )
}

export default InputForm
