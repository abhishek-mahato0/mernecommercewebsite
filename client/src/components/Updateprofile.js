import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/loginAction';

const Updateprofile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const updateuser = async () => {
      const { data } = await axios.put(
        'https://mernecommercewebsite-backend.vercel.app/api/v1/update',
        {
          name: name,
          email: email,
          password: password,
          avatar: avatar,
        }
      );
    };
    updateuser();
    dispatch(logout());
    navigate('/login');
  };
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [name, setName] = useState(userInfo.name);
  const [avatar, setAvatar] = useState(userInfo.avatar);

  const setImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="loginpage">
      <form className="form" onSubmit={submitHandler}>
        <h1>Update Profile</h1>
        <img src={avatar ? avatar : userInfo.avatar} alt="profile"></img>
        <div className="email">
          <label>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter Your Name..."
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div className="email">
          <label>New Email</label>
          <input
            type="text"
            id="email"
            value={email}
            placeholder="Enter Your Email..."
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="password">
          <label>Old Password</label>
          <input
            type="password"
            id="passwoed"
            placeholder="Enter Your Password..."
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <div className="password">
          <input type="file" onChange={setImage}></input>
        </div>
        <div className="logbtn">
          <button type="submit">Update</button>
        </div>
        <Link className="link" to="/register">
          <div className="register">
            <button>Forgot Password</button>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default Updateprofile;
