import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Button, Col, Form, Row } from 'react-bootstrap'
import CustomInput from '../components/CustomInput'


const Login = () => {
  const [formData, setFormData] = useState({})
  

  const inputs = [{
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

  }]




  const handleOnChange = (e) => {
    const { name, value } = e.target


  }


  const handleOnSubmit = async (e) => {
    e.preventDefault()




  }
  return (
    <DefaultLayout>
      <div className="container w-50 m-auto">
        <Form onSubmit={handleOnSubmit} className=' p-3 py-5 rounded shadow-lg '>
          <h3>Welcome back!!</h3>
          <hr />


          <CustomInput  onChange={handleOnChange} />

          <div className="d-grid mt-5">
            <Button type='submit' variant='success'>SigIn</Button>
          </div>

          <div className="text-end mt-2">
            Forgot Password? <a href='/password-reset'>Reset</a> now
          </div>





        </Form>

      </div>
    </DefaultLayout>
  )
}

export default Login
