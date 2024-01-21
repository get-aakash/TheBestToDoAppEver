import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import PasswordResetForm from '../components/PasswordResetForm'

const ForgetPassword = () => {
  return (
    <DefaultLayout>
        <div className="m-auto " style={{width: "400px"}}>
            <PasswordResetForm />
        </div>
     
    </DefaultLayout>
  )
}

export default ForgetPassword
