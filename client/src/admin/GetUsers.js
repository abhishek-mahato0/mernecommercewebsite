import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './users.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const GetallUsers = async () => {
    try {
      const { data } = await axios.get(
        'https://mernecommercewebsite-backend.vercel.app/api/v1/users',
        {
          withCredentials: true, // Include cookies and other credentials with the request
        }
      );
      if (data) {
        setUsers(data);
      }
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };

  useEffect(() => {
    GetallUsers();
  });
  return (
    <div className="user-container">
      <Link to="/admin" className="link">
        <h3 className="red">Go Back</h3>
      </Link>
      <div className="user-flex">
        <h1>Users</h1>
        <h1>Total Users: {users.length}</h1>
      </div>

      <div className="user">
        {users &&
          users.map((item) => {
            return (
              <>
                <Link
                  className="link black"
                  to={`/getalluserorder/${item._id}`}
                >
                  <div className="user-Info">
                    <img src={item.avatar} alt="avatar"></img>
                    <h3>Name: {item.name}</h3>
                    <h3>Email: {item.email}</h3>
                  </div>
                </Link>
              </>
            );
          })}
      </div>
      <div className="links">
        <Link className="link" to="/adminorders">
          <button>
            <h1 className="red">See Orders of each costumer</h1>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GetUsers;
