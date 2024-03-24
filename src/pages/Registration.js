import React, { useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Button, Form } from 'react-bootstrap'
import CustomInput from '../components/CustomInput'


const Registration = () => {
  
 
  const inputs =[
    {
      label: "First Name",
      name: 'fName',
      type: 'text',
      required: true,
      placeholder: "First Name"
    },
    {
      label: "Last Name",
      name: 'lName',
      type: 'text',
      required: true,
      placeholder: "First Name"
    },
    {
      label: "Email",
      name: 'email',
      type: 'email',
      required: true,
      placeholder: "sam@sam.com"
    },
    {
      label: "Password",
      name: 'password',
      type: 'password',
      required: true,
      placeholder: "******"

    },
    {
      label: "Confirm Password",
      name: 'cpassword',
      type: 'password',
      required: true,
      placeholder: "******"

    }
  ]

  const handleOnChange = (e)=>{
    
  }
  const handleOnSubmit = async(e)=>{
    e.preventDefault()

    

    
  }
  return (
    <DefaultLayout>
      <div className="container w-50 m-auto">
        <Form onSubmit={handleOnSubmit} className=' p-3 py-5 rounded shadow-lg '>
          <h3>Join our system now!!!</h3>
          <hr />

         
            <CustomInput  onChange={handleOnChange} />
        
          <Form.Group>
            <Form.Text className='text-area' >
              Your Password must contain at least 6 characters including upper case and lower case
            </Form.Text>
            
              <ul>
                <li className='text-danger fw-bolder mt-3'></li>
              </ul>
          
          </Form.Group>
          <div className="d-grid mt-5">
            <Button  type='submit' variant='success'>SignUp</Button>
          </div>





        </Form>

      </div>
    </DefaultLayout>
  )
}

export default Registration
