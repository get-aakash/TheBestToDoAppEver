import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'

import { Link, useParams } from 'react-router-dom'

const DisplayTable = () => {
  
  
  
  


  
  const handleOnDelete = async(id) => {
    if (window.confirm("Are you sure to delete this TODO?")) {
      
      
        
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
        
             <tr >
             <td></td>
             <td></td>
             <td></td>
             <td className='text-center'><Link  title='Update' className='m-1' to={`/update/`}><i class="fa-solid fa-pen-to-square"></i></Link><Button title='Delete ;; '    variant='danger' className='btn-sm' ><i className="fa-solid fa-trash"></i></Button></td>
           </tr>

       
       
        
        
      </tbody>
    </Table>
    </div>
    
  )
}

export default DisplayTable
