import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import "../App.css"
import DisplayTable from './DisplayTable'

let globalId = 0
const initialState = {
    todo: "",
    date: "",


}
const InputForm = () => {
    const [formData, setFormData] = useState(initialState)
    const [toDo, setToDO] = useState([])
   
    const handleOnchange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })


    }
    const handleOnsubmit = async(e) => {
        e.preventDefault()   
        const obj = {...formData, id: globalId++}
       setToDO([...toDo, obj])
       
       setFormData(initialState)
       
        

    }
    console.log(toDo)
        
    
    
   

    return (
        <div className=" ">
            <Form onSubmit={handleOnsubmit} className='wrapper p-4 text-center d-flex align-items-center justify-content-center' >
                <Row  >
                    <Col md={6} >
                        <Form.Control required value={formData.todo} name='todo'  placeholder="Enter Your ToDo here ..." onChange={handleOnchange} />
                    </Col>
                    <Col md={4} >
                        <Form.Control required type='date' value={formData.date} name='date'  placeholder="Date" onChange={handleOnchange} />
                    </Col>
                    <Col md={2}>
                        <Button type='submit' variant='success'>Create</Button>
                    </Col>

                </Row>
            </Form>
            <span className="d-block p-1 bg-info "></span>
            <div className="display">
               
<DisplayTable todo = {toDo}  />
                    
                
            </div>
        </div>

    )
}

export default InputForm
