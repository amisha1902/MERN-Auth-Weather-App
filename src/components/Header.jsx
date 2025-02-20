import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
function Header() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])
  const userType = localStorage.getItem("userType")

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout');
    setTimeout(() => {
      navigate('/login');
    }, 1000)
  }

  const routes = [
    {
      name: "Dashboard", link: "/home",
    },
    
    // {
    //   name: "Users", link: "/users",
    // },
    // {
    //   name: "Weather App", link: "/weather",
    // },
  ]


  return (



    <nav className="bg-gray-800 h-36 pt-7 pb-6">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

            <div className="hidden lg:block sm:ml-6">
              <div className="flex space-x-5">
                {routes.map((item, key) => (
                  <a key={key} href={item.link} className="text-white px-3 pt-5  py-2 text-md font-medium">{item.name}</a>
                ))}
                {userType === 'Admin' && <a href="/users" className="text-white px-3 pt-5  py-2 text-md font-medium">Users</a>}

              </div>
            </div>
          </div>

          <div className="flex items-center pr-2">
            <div className="flex flex-col items-center justify-center mt-10">
              <h1 className="text-lg text-white font-semibold ">Welcome {loggedInUser}  !!</h1>
              <button onClick={handleLogout} className="bg-red-800 text-white hover:text-white px-2 py-1  rounded-lg focus:outline-none">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>




  )
}


export default Header;
