import React, { useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Button, Form } from 'react-bootstrap'
import CustomInput from '../components/CustomInput'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase-config/firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'

const Registration = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState("")
  const navigate = useNavigate()


  const inputs = [
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

  const handleOnChange = (e) => {
    const {name,value} = e.target
    if(name==="password"){
      setError("")
      value.length < 6 && setError("password must be 6 characters long")
            !/[0-9]/.test(value)&& setError("Number is required")
            !/[A-Z]/.test(value)&& setError("Upper Case is required")
            !/[a-z]/.test(value)&& setError("Lower Case is required")

    }
    setFormData({...formData, [name]:value})

  }
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const {cpassword, ...rest} = formData

    if(cpassword !== rest.password){
      return toast.error("Password do not match!!")
    }

    const responsePromise = createUserWithEmailAndPassword(auth, formData.email, formData.password)
    toast.promise(responsePromise,{
      pending:"Please Wait..."
    })
    try {
      const {user} = await responsePromise
      if(user?.uid){
        updateProfile(user,{
          displayName: formData.fName
        })
      }

      const userObj = {
        fName: formData.fName,
        lName: formData.lName,
        email: formData.email,
      }
      await setDoc(doc(db,"users", user.uid),userObj)
      toast.success("Your account is created and redirecting to the dashboard")
      navigate("/dashboard")
    } catch (error) {
      let msg = error.message
      if(msg.includes("auth/email-already-in-use")){
        msg = 'Email already in use'
      }
      toast.error(msg)
      
    }




  }
  return (
    <DefaultLayout>
      <div className="container w-50 m-auto">
        <Form onSubmit={handleOnSubmit} className=' p-3 py-5 rounded shadow-lg '>
          <h3>Join our system now!!!</h3>
          <hr />
          {inputs.map((item, i) => <CustomInput key={i} {...item} onChange={handleOnChange} />)}



          <Form.Group className='mt-3'>
            <Form.Text className='text-area' >
              Your Password must contain at least 6 characters including upper case and lower case
            </Form.Text>
            {error && <ul>
              <li className='text-danger fw-bolder mt-3'>{error}</li>
            </ul>}



          </Form.Group>
          <div className="d-grid mt-5">
            <Button type='submit' variant='success'>SignUp</Button>
          </div>
          <div className="text-end">
            Forget Password? <a href='/password-reset'>Reset</a> now
          </div>





        </Form>

      </div>
    </DefaultLayout>
  )
}

export default Registration
