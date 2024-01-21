import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import "../App.css"
import DisplayTable from './DisplayTable'
import { useDispatch, useSelector } from 'react-redux'
import { create } from '../redux/toDoSlice'
import { getToDo, postToDO } from '../redux/todo/toDo'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'
import { toast } from 'react-toastify'

let globalId = 1
const initialState = {
    todo: "",
    date: "",


}
const InputForm = () => {
    const [formData, setFormData] = useState(initialState)
    const [toDo, setToDO] = useState([])
    const {userInfo} = useSelector((state)=>state.user)

    const dispatch = useDispatch()
   

    const handleOnchange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })


    }
    const handleOnsubmit = async(e) => {
        e.preventDefault()
        
        const obj = {...formData, userId: userInfo.uid, createdAt: Date.now()}
        
        console.log(obj)
        const docRef = await addDoc(collection(db, "todos"), obj)

        if(docRef?.id){
            setFormData(initialState)
            dispatch(getToDo(userInfo.uid))
            toast.success("The todo has been created!!!")
        }
        
       
       
        

    }
   
        dispatch(create(toDo))
    
    
   

    return (
        <div className=" ">
            <Form onSubmit={handleOnsubmit} className='wrapper p-4 text-center d-flex align-items-center justify-content-center' >
                <Row  >
                    <Col md={6} >
                        <Form.Control required name='todo' value={formData.todo} placeholder="Enter Your ToDo here ..." onChange={handleOnchange} />
                    </Col>
                    <Col md={4} >
                        <Form.Control required type='date' name='date' value={formData.date} placeholder="Date" onChange={handleOnchange} />
                    </Col>
                    <Col md={2}>
                        <Button type='submit' variant='success'>Create</Button>
                    </Col>

                </Row>
            </Form>
            <span className="d-block p-1 bg-info "></span>
            <div className="display">
                <DisplayTable   />
            </div>
        </div>

    )
}

export default InputForm
