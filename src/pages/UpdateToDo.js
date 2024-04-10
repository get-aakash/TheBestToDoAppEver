import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import DefaultLayout from '../components/DefaultLayout'
import { useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase-config/firebaseConfig'
import { toast } from 'react-toastify'
import CustomInput from '../components/CustomInput'
import { useNavigate } from 'react-router-dom'
const UpdateToDo = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        todo: "",
        date: "",
    })

    const inputs = [{
        label: "ToDO",
        name: 'todo',
        type: 'text',
        required: true,
        placeholder: "Edit your todo here"

    },
    {
        label: "Date",
        name: 'date',
        type: 'date',
        required: true,


    }]
    const fetchTodoById = async (id) => {

        try {
            const docRef = doc(db, "todos", id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const todoData = { id: docSnap.id, ...docSnap.data() }
                setFormData({ ...formData, id: todoData.id, todo: todoData.todo, date: todoData.date })
            }
        } catch (error) {
            console.error("Error fetching document:", error)
        }
    }

    useEffect(() => {
        fetchTodoById(id)
    }, [])

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()

        try {
            const docRef = doc(db, 'todos', id)
            const updateTodo = await updateDoc(docRef, {
                todo: formData.todo,
                date: formData.date
            })
            toast.success("ToDo updated")
            navigate('/dashboard')
        } catch (error) {
            return (error.message)
        }




    }

    return (

        <DefaultLayout>

            <div className="container w-50 m-auto">
                <Form onSubmit={handleOnSubmit} className=' p-3 py-5 rounded shadow-lg' >
                    <h2 >Update Your Data Here!!!</h2>
                    <hr />
                    <Button href='/dashboard' className='mb-1'>Back to Dashboard</Button>
                    {inputs.map((item, i) => <CustomInput key={i} {...item} defaultValue={formData[item.name]} onChange= {handleOnChange} />)}
                    <div className="d-grid mt-5">
                        <Button type='submit' variant='success'>Update</Button>
                    </div>
                </Form>

            </div>




        </DefaultLayout>
    )
}

export default UpdateToDo
