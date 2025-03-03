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
import { getTodos } from '../redux/todos'

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
    
    const {userInfo} = useSelector(state=>state.user)


    useEffect(()=>{
        dispatch(createTodo(toDo))
        
    },[toDo,dispatch])

    
    
    const handleOnchange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const handleOnsubmit = async (e) => {
        e.preventDefault()
        
        const obj = { ...formData, createdAt: Date.now(), uid: userInfo.uid }
        setToDO([...toDo, obj])
       
    
        const docRef = await addDoc(collection(db, 'todos'), obj)
        if(docRef?.id){
            setFormData(initialState)
           dispatch(getTodos(userInfo.uid))
            return toast.success("The Todo is created!!")
        }     
    }

   
    
    





    return (
        <div className=" ">
            <Form onSubmit={handleOnsubmit} className='wrapper p-4 text-center d-flex align-items-center justify-content-center' >
                <Row className='gap-2' >
                    <Col md={4} >
                        <Form.Control required value={formData.todo} name='todo' placeholder="Enter Your ToDo..." onChange={handleOnchange} />
                    </Col>
                    <Col md={4} >
                        <Form.Control required type='date' placeholder="Select a date.." value={formData.date} name='date' placeholder="Date" onChange={handleOnchange} />
                    </Col>
                    <Col md={2}>
                        <Button type='submit' variant='success'>Create</Button>
                    </Col>

                </Row>
            </Form>
            <span className="d-block p-1 bg-info "></span>
            
            
        </div>

    )
}

export default InputForm
