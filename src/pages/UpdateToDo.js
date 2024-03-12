import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getToDo } from '../redux/todo/toDo'

const UpdateToDo = () => {
    const [formData, setFormData] = useState({})
    const { id } = useParams()
    const dispatch = useDispatch()
    const { todoInfo } = useSelector((state) => state.toDo)
    const data = todoInfo.find(obj => obj.globalId === parseInt(id, 10));
    

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })


    }
   
    return (

        <div>

            <Form className=' wrapper p-4 text-center d-grid align-items-center justify-content-center' >
                <Col  >
                    <Row  >
                        <Form.Control required name='todo' value={data.todo} placeholder="Enter Your ToDo here ..." onChange={handleOnChange} />
                    </Row>
                    <Row>
                        <Form.Control required type='date' name='date' value={data.date} placeholder="Date" onChange={handleOnChange} />
                    </Row>
                    <Row>
                        <Button type='submit' variant='success'>Create</Button>
                    </Row>

                </Col>
            </Form>



        </div>
    )
}

export default UpdateToDo
