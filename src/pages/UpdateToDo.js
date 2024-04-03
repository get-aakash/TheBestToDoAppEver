import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import DefaultLayout from '../components/DefaultLayout'
import { useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase-config/firebaseConfig'
import { toast } from 'react-toastify'

const UpdateToDo = () => {
    const {id} = useParams()
    const [formData, setFormData] = useState({todo: "",
    date: "",})
    
    const fetchTodoById = async(id)=>{
      
        try {
            const docRef= doc(db, "todos", id)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
               const todoData = {id: docSnap.id, ...docSnap.data()}
               setFormData({...formData, id:todoData.id, todo: todoData.todo, date: todoData.date})
            }
        } catch (error) {
            console.error("Error fetching document:" ,error)
        }
    }

 useEffect(()=>{
    fetchTodoById(id)
 },[])

    const handleOnChange = (e) => {
       const {name, value} = e.target
       setFormData({...formData, [name]: value})
       console.log(formData)
    }
    const handleOnSubmit = async(e)=>{
        e.preventDefault()
        try {
            const docRef = doc(db, 'todos', id)
            console.log(formData)
            const updateTodo = await updateDoc(docRef, formData)
            console.log(updateTodo)
            toast.success("ToDo updated")
        } catch (error) {
            return(error.message)
        }
        

        
       
    }
   
    return (

        <DefaultLayout>
            <h2 >Update Your Data Here!!!</h2>
            <Form onSubmit={handleOnSubmit} className=' wrapper p-4 text-center d-grid align-items-center justify-content-center' >
                <Col  >
                    <Row  >
                        <Form.Control required name='todo'  defaultValue={formData.todo}  placeholder="Enter Your ToDo here ..." onChange={handleOnChange} />
                    </Row>
                    <Row>
                        <Form.Control required type='date' defaultValue={formData.date} name='date'  placeholder="Date" onChange={handleOnChange} />
                    </Row>
                    <Row>
                        <Button type='submit' variant='success'>Update</Button>
                    </Row>

                </Col>
            </Form>



        </DefaultLayout>
    )
}

export default UpdateToDo
