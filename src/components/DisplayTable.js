import { QuerySnapshot, collection, getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

import { Link, useParams } from 'react-router-dom'
import { db } from '../firebase-config/firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { createTodo } from '../redux/todoSlice'
import {getTodos} from '../redux/todos'

const DisplayTable = ({ handleOnDelete}) => {
  const dispatch = useDispatch()
  const {todoData} = useSelector(state=>state.todo)
const {userInfo} = useSelector(state=>state.user)

useEffect(()=>{
  console.log(userInfo.uid)
  dispatch(getTodos(userInfo.uid))
},[dispatch])
  
  


  return (
    <div className="table p-2 ">
        <Table striped bordered hover className='mt-5'>
            
      <thead>
        <tr>
          <th>#</th>
          <th>ToDo</th>
          <th>Date</th>
          <th>Action</th>
          
        </tr>
      </thead>
      <tbody>
        {todoData.map((item,i)=>(
           <tr key={i} >
             <td>{i+1}</td>
             <td>{item.todo}</td>
             <td>{item.date}</td>
             <td className='text-center'><Link  title='Update' className='m-1' to={`/update/${item.id}`}><i className="fa-solid fa-pen-to-square"></i></Link><Button title='Delete' onClick={()=>handleOnDelete(i)}    variant='danger' className='btn-sm' ><i className="fa-solid fa-trash"></i></Button></td>
           </tr>

        ))}
            

       
       
        
        
      </tbody>
    </Table>
    </div>
    
  )
}

export default DisplayTable
