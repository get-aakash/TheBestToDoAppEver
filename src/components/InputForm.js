import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import "../App.css"
import DisplayTable from './DisplayTable'
import { toast } from 'react-toastify'
import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore'
import { db } from '../firebase-config/firebaseConfig'

let globalId = 0
const initialState = {
    todo: "",
    date: "",


}
const InputForm = () => {
    const [formData, setFormData] = useState(initialState)
    const [toDo, setToDO] = useState([])
 
    
    // useEffect(async()=>{
    //     const fetchData = async()=>{
    //         try {
    //             const q = query(collection(db, 'todos'))
    //             const querySnapshot = await getDocs(q)
    //             console.log(querySnapshot)
    //             querySnapshot.forEach((doc)=>{
    //                 const {id} = doc
    //             const data = {...doc.data(),id}
    //             console.log(data)
               
    //            })
    //         } catch (error) {
    //             console.log(error.message)
                
    //         }
    //     }
    //     fetchData()

    // },[])
   

 
    
    const handleOnchange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const handleOnsubmit = async (e) => {
        e.preventDefault()
        const obj = { ...formData, id: globalId++, createdAt: Date.now() }
        setToDO([...toDo, obj])
        const docRef = await addDoc(collection(db, 'todos'), obj)
        if(docRef?.id){
            setFormData(initialState)
            return toast.success("The Todo is created!!")
        }     
    }
    

    const handleOnDelete = async (id)=>{
        if(window.confirm("Are you sure you want to delete this todo??")){
           try {
            await deleteDoc(doc(db, 'todos', id))
            toast.success("The todo is deleted!!")
           } catch (error) {
            toast.error(error.message)
           }
        }
    }
    console.log(toDo)





    return (
        <div className=" ">
            <Form onSubmit={handleOnsubmit} className='wrapper p-4 text-center d-flex align-items-center justify-content-center' >
                <Row  >
                    <Col md={6} >
                        <Form.Control required value={formData.todo} name='todo' placeholder="Enter Your ToDo here ..." onChange={handleOnchange} />
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

                <DisplayTable  handleOnDelete={handleOnDelete} />


            </div>
        </div>

    )
}

export default InputForm
