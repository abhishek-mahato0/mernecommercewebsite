import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/loginAction';
const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (confirmpassword !== newpassword) {
      alert('Confirm Password and newpassowrd dosenot match');
    } else {
      const changePassword = async () => {
        const { data } = await axios.put(
          'https://mernecommercewebsite-backend.vercel.app/api/v1/changepassword',
          {
            oldpassword: oldpassword,
            confirmpassword: confirmpassword,
            newpassword: newpassword,
          }
        );
        if (data.message) {
          alert(data.message);
        } else {
          dispatch(logout());
          navigate('/login');
        }
      };
      changePassword();
    }
  };
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  return (
    <div className="loginpage">
      <form className="form" onSubmit={submitHandler}>
        <h1>Change Password</h1>
        <div className="email">
          <input
            type="text"
            id="password"
            placeholder="Enter Your Oldpassword..."
            onChange={(e) => setOldpassword(e.target.value)}
            required
          ></input>
        </div>
        <div className="password">
          <input
            type="password"
            id="password"
            placeholder="Enter Your newPassword..."
            onChange={(e) => setNewpassword(e.target.value)}
            required
          ></input>
        </div>
        <div className="password">
          <input
            type="password"
            id="password"
            placeholder="Confirm Password..."
            onChange={(e) => setConfirmpassword(e.target.value)}
            required
          ></input>
        </div>
        <div className="logbtn">
          <button type="submit">Change Password</button>
        </div>
        <Link className="link" to="/register">
          <div className="register">
            <button>Create New Account</button>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default ChangePassword;
