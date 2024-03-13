import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getToDo } from '../redux/todo/toDo'
import { addDoc, collection, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'
import { toast } from 'react-toastify'
import DefaultLayout from '../components/DefaultLayout'

const UpdateToDo = () => {
    const initialState = {
        todo: "",
        date: "",
    
    
    }
    const [formData, setFormData] = useState({})
    const { id } = useParams()
    const dispatch = useDispatch()
    const { todoInfo } = useSelector((state) => state.toDo)
    const data = todoInfo.find(obj => obj.globalId === parseInt(id, 10));
    

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const handleOnSubmit = async(e)=>{
        e.preventDefault()
        console.log(formData)
        const obj = {...formData}
        const docRef = await updateDoc(collection(db, "todos"), obj)

        if(docRef?.id){
            setFormData(initialState)
            dispatch(getToDo(data.userId))
            toast.success("The todo has been updated!!!")
        }
    }
   
    return (

        <DefaultLayout>
            <h2 >Update Your Data Here!!!</h2>
            <Form onSubmit={handleOnSubmit} className=' wrapper p-4 text-center d-grid align-items-center justify-content-center' >
                <Col  >
                    <Row  >
                        <Form.Control required name='todo' value={formData.todo} defaultValue={data.todo} placeholder="Enter Your ToDo here ..." onChange={handleOnChange} />
                    </Row>
                    <Row>
                        <Form.Control required type='date' value={formData.date} name='date' defaultValue={data.date} placeholder="Date" onChange={handleOnChange} />
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
