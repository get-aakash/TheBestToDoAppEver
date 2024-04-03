import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import InputForm from '../components/InputForm'
import DisplayTable from '../components/DisplayTable'




const Dashboard = () => {
  return (
    <DefaultLayout>
      <InputForm />
      <div className="display">
        <DisplayTable />
      </div>
    </DefaultLayout>
  )
}

export default Dashboard
