import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'User'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, userType } = signupInfo;

        if (!name || !email || !password || !userType) {
            return handleError('Name, email, password, and user type are required');
        }

        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, userType })
            });

            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                window.localStorage.setItem('userType', userType);  

                setTimeout(() => {
                    navigate('/login');
                }, 1000);
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
                <h1 className='text-3xl font-semibold text-center mb-9'>Signup</h1>
                <form onSubmit={handleSignup} className='space-y-7'>
                    <div className='flex justify-center m-4 rounded-md shadow-md bg-white h-9'>
                        <label htmlFor='name' className='m-1 p-1 block text-sm font-medium text-gray-900 ps-1'>Name: </label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            autoFocus
                            placeholder='Enter your name...'
                            value={signupInfo.name}
                        />
                    </div>
                    <div className='flex justify-center m-4 rounded-md shadow-md bg-white h-9'>
                        <label htmlFor='email' className='m-1 p-1 block text-sm font-medium text-gray-900 ps-0'>Email: </label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={signupInfo.email}
                        />
                    </div>
                    <div className='flex justify-center m-4 rounded-md shadow-md bg-white h-9'>
                        <label htmlFor='password' className='m-1 p-1 block text-sm font-medium text-gray-900 ps-6'>Password: </label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={signupInfo.password}
                        />
                    </div>

                    <div className='flex justify-center m-4 rounded-md shadow-md bg-white h-9'>
                        <label htmlFor='userType' className='m-1 p-1 block text-sm font-medium text-gray-900 ps-0'>User Type: </label>
                        <select
                            onChange={handleChange}
                            name='userType'
                            value={signupInfo.userType}
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <button type='submit' className='block justify-center bg-blue-400 rounded-lg p-2 ms-16 ms-32 text-semibold'>Signup</button>
                    <div className="text-center">
                        <span className="text-sm">Already have an account? </span>
                        <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Signup;
//ugke cxbs vahi vynj