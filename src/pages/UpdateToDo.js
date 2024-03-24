import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import DefaultLayout from '../components/DefaultLayout'

const UpdateToDo = () => {
    const initialState = {
        todo: "",
        date: "",
    
    
    }

 

    const handleOnChange = (e) => {
       
    }
    const handleOnSubmit = async(e)=>{
        e.preventDefault()
        

        
       
    }
   
    return (

        <DefaultLayout>
            <h2 >Update Your Data Here!!!</h2>
            <Form onSubmit={handleOnSubmit} className=' wrapper p-4 text-center d-grid align-items-center justify-content-center' >
                <Col  >
                    <Row  >
                        <Form.Control required name='todo'  placeholder="Enter Your ToDo here ..." onChange={handleOnChange} />
                    </Row>
                    <Row>
                        <Form.Control required type='date'  name='date'  placeholder="Date" onChange={handleOnChange} />
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
