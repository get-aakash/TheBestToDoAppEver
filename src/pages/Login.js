import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Button, Col, Form, Row } from 'react-bootstrap'
import CustomInput from '../components/CustomInput'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase-config'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userInfo} = useSelector((state)=>state.user)
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
  
  onAuthStateChanged(auth,(user)=>{
   user &&  dispatch(createUser(user))
    
  })
  useEffect(()=>{
    userInfo?.uid && navigate("/dashboard")

  },[userInfo])

  const handleOnChange = (e)=>{
    const {name,value} = e.target
    setFormData({...formData, [name]:value})

  }
  

  const handleOnSubmit = async(e)=>{
    e.preventDefault()
    try {
      const responsePending = signInWithEmailAndPassword(auth, formData.email, formData.password)
      toast.promise(responsePending, {
        pending:"please wait!!!"
      })
      const {user} = await responsePending
      console.log(user)
      if(user?.uid){
        const userObj = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }
        dispatch(createUser(userObj))
        return toast.success("Logged in Successfully, Redirecting Now!!")
      }
      
    } catch (error) {
      let msg = error.message
      if(error.message.includes("(auth/wrong-password")){
        msg= "Invalid Login Details"
      }
      toast.error(msg)
    }
   


  }
  return (
    <DefaultLayout>
      <div className="container w-50 m-auto">
        <Form onSubmit={handleOnSubmit} className=' p-3 py-5 rounded shadow-lg '>
          <h3>Welcome back!!</h3>
    <hr />

    {inputs.map((item, index) => (
                        <CustomInput key={index} {...item} onChange={handleOnChange} />
                    ))}
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
