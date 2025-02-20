import React, { useEffect, useState } from 'react'
 function Footer() {
  const [loggedInUser, setLoggedInUser] = useState('');
  useEffect(() => {
      setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])
  return (
    <div className='max-w-auto py-10 px-4 sm:px-3 text-gray-800 sm:flex justify-between mt-48'>
    <div class="bg-gray-300 w-full h-72 ">
    <div class="max-w-screen-xl py-10 px-4 sm:px-6 text-gray-800 sm:flex justify-between mx-auto">
        <div class="p-5 sm:w-2/12">
            <h3 class="font-bold text-xl  mb-3">Hello {loggedInUser},</h3>

            <div class="flex text-gray-500 uppercase text-sm space-x-6 ps-3">
                <a href="./" class="mr-2 hover:text-indigo-600">Home</a>
                <a href="./" class="mr-2 hover:text-indigo-600">About Us</a>
                <a href="./" class="mr-2 hover:text-indigo-600">Contact Us</a>
                <a href="./" class="mr-2 hover:text-indigo-600">Support Us</a>
            </div>

        </div>
        <div class="p-5 ">
            <h3 class="font-medium text-lg  mb-4">Subscribe to our Channel</h3>
            <form class="mt-4">
                <input class="border rounded w-full px-4 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="username@email.com"/>
            </form>
        </div>
    </div>
    <div class="flex py-0  text-gray-800 text-sm flex-col items-center border-t max-w-screen-xl">
        <p>© Copyright 2020. All Rights Reserved.</p>
    </div>
</div>
    </div>  )
}
export default Footer;
