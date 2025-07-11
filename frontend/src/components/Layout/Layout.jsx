import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <NavLink to='/'>Home</NavLink> <br />
        <NavLink to= '/addusers'>Add User</NavLink> <br />
       <div> <br /> <br />
         <Outlet></Outlet>
       </div>
    </div>
  )
}

export default Layout