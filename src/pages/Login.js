import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, userType, error } = result;
            if (success) {
                handleSuccess(message);
                window.localStorage.setItem('token', jwtToken);
                window.localStorage.setItem('loggedInUser', name);
                window.localStorage.setItem('userType', userType);
                setTimeout(() => {
                    navigate('/weather')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="m-4 p-8 w-96 bg-blue-200 rounded-lg shadow-lg">
                <h1 className='text-3xl font-semibold text-center mb-9'>Login</h1>
                <form onSubmit={handleLogin} className='space-y-7'>
                    <div className='flex justify-center m-4 rounded-md shadow-md bg-white h-9 space-x-3'>
                        <label htmlFor='email' className='m-1 p-1 block text-sm font-medium text-gray-900 ps-1' >Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={loginInfo.email}
                        />
                    </div>
                    <div className='flex  space-x-1 justify-center m-4 rounded-md shadow-lg bg-white h-9 '>
                        <label htmlFor='password' className='m-1 p-1 block text-sm font-medium text-gray-900 ps-6' >Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={loginInfo.password}
                        />
                    </div>
                    <button type='submit' className='block justify-center bg-blue-400 rounded-lg p-2 ms-16 ms-32 text-semibold'>Login</button>
                    <div className="text-center">
                        <span className="text-sm">Do not have an account?
                            <Link to="/signup" className="text-blue-500 hover:underline">  Signup</Link>
                        </span>
                    </div>
                    <div className="text-center mt-3">
                        <Link to="/forgetPassword" className="text-blue-500 hover:underline">
                            Forgot Password?
                        </Link>
                       
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login
