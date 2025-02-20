import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex justify-center items-center w-full h-screen">
        <div className="w-96 h-96 bg-blue-200 shadow-lg flex flex-col items-center justify-center rounded-lg">
          <h1 className="text-center mb-4 text-xl font-bold">Users List</h1>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-2 text-left">Name</th>
                <th className="px-6 py-2 text-left">Email</th>
                {/* <th className="px-6 py-2 text-left">Role</th> */}

              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center px-4 py-2">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="text-left">
                    <td className="px-6 py-2 w-1/2">{user.name}</td>
                    <td className="px-6 py-2 w-1/2">{user.email}</td>
                    <td className="px-6 py-2 w-1/2">{users.userType}</td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <ToastContainer />
      
      <Footer />
    </div>
  );
}
