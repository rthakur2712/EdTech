import React from 'react'
import { logout } from '../../../services/operationa/auth'
import {sidebarLinks} from "../../../data/dashboard-links"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import * as Icons from 'react-icons/vsc';

export default function Sidebar() {
const {user,loading:profileLoading} = useSelector((state)=>state.profile)
console.log(user);
const location = useLocation();
const dispatch = useDispatch();

  return (
    <div className='w-[222px] h-[100vh]'>
     {
      sidebarLinks.map((link,index)=>{
        if(link.type && link.type!==user.accountType){
          return null
        }
        const Icon = Icons[link.icon];
        return(
          <div>
            <div className='text-white'>
             <Icon/>
              <p>{link.name}</p>
            </div>
          </div>
        )
      })
     }
    </div>
  )
}
