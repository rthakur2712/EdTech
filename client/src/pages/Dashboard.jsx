import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/dashboard/Sidebar'
import { useSelector } from 'react-redux'

export default function Dashboard() {
    const {loading:authLoading} = useSelector((state)=>state.auth)
    const {loading:profileLoading} = useSelector((state)=>state.profile)

    if(authLoading || profileLoading){
        return <div className='loader'></div>
    }

  return (
    <div className='flex'>
        <Sidebar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}
