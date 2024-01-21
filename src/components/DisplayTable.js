import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { create } from '../redux/toDoSlice'
import { getToDo } from '../redux/todo/toDo'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'
import { toast } from 'react-toastify'

const DisplayTable = () => {
  const {todoInfo} = useSelector((state)=> state.toDo)
  const {userInfo} = useSelector((state)=>state.user)
  console.log(userInfo.uid)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getToDo(userInfo.uid))
  },[dispatch])
  
  
  const handleOnDelete = async(id) => {
    if (window.confirm("Are you sure to delete this TODO?")) {
      try {
         await deleteDoc(doc(db, "todos",id))
      toast.success("ToDo has been deleted!!!")
        
        dispatch(getToDo(userInfo.uid))
      } catch (error) {
        toast.error(error.message)
        
      }
      
        
    }
}
  
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
        {todoInfo.map((item,i)=>(
             <tr key={i}>
             <td>{i + 1}</td>
             <td>{item.todo}</td>
             <td>{item.date}</td>
             <td className='text-center'><Button onClick={()=>handleOnDelete(item.id)}   variant='danger' className='btn-sm' ><i className="fa-solid fa-trash"></i></Button></td>
           </tr>

        ))}
       
        
        
      </tbody>
    </Table>
    </div>
    
  )
}

export default DisplayTable
