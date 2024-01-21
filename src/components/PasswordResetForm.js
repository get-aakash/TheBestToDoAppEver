import React, { useState } from 'react'
import CustomInput from './CustomInput'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

const PasswordResetForm = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState("")
    const handleOnChange = (e) =>{
        const {name, value} = e.target
        if(name === "password"){
            setError("")
            value.length <6 &&
            setError("Password should be atleast 6 characters long")

            !/[0-9]/.test(value) && setError("Atleast One number required")
            !/[a-z]/.test(value) && setError("Atleast One lowercase required")
            !/[A-Z]/.test(value) && setError("Atleast One uppercase required")
        }
        setFormData({...formData, [name]: value})
        
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault()
        const {cpassword, ...rest} = formData
        if(cpassword !== rest.password){
            toast.error("Password doesnot match!!!")

        }
    }
  return (
    <div className='bordder p-4 py-4 bg-light rounded shadow-lg'>
        <h3 className="text-center">Reset Your Password!!!</h3>
        <hr />

        <Form onSubmit={handleOnSubmit}>
            <CustomInput label="Email *" type="email" name="email" placeholder="sam@sam.com" required={true} onChange={handleOnChange}/>
            <CustomInput label="New Password *" type='password' name="password" placeholder="****" required={true} onChange={handleOnChange} />
            <CustomInput label="Confirm Password *" type='password' name="cpassword" placeholder="****" required={true} onChange={handleOnChange} />
            <Form.Text>
                Password should contain atleast 6 characters, one upper case lower case and number !!!
           {error && <ul>
            <li className='text-danger fw-bolder '>{error }</li>
           </ul>}
           
            </Form.Text>
            <div className="d-grid mt-3">
            <Button type='submit' variant="outline-danger">
                Reset Password
            </Button>
            </div>
            
        </Form>
      
    </div>
  )
}

export default PasswordResetForm
