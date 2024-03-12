import React, { useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import InputForm from '../components/InputForm'
import DisplayTable from '../components/DisplayTable'
import { useDispatch, useSelector } from 'react-redux'
import { getToDo } from '../redux/todo/toDo'


const Dashboard = () => {


  
  return (
    <DefaultLayout>
        <InputForm  />
        
    </DefaultLayout>
  )
}

export default Dashboard
