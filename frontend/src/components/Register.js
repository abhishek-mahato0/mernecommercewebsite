import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { register } from '../redux/actions/loginAction';
import { toast } from 'react-hot-toast';
import './css/login.css';
const Register = () => {
  const dispatch = useDispatch();
  const { success, userInfo, message } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [profile, setProfile] = useState();
  const setImage = (e) => {
    e.preventDefault();
    setProfile(e.target.files[0]);
    const files = e.target.files[0];
    imageDisplay(files);
  };
  const imageDisplay = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      toast.error('Password and Confirm Password id incorrect');
    } else if (password.length <= 7) {
      toast.error('Password Must be greater than 7 characters');
    } else {
      const form = new FormData();
      form.append('name', name);
      form.append('email', email);
      form.append('password', password);
      form.append('avatar', profile);
      try {
        dispatch(register(form));
        toast.success('Registration successfull');
        toast.success('Login');
        navigate('/login');
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    userInfo._id && navigate('/');
  }, [userInfo, dispatch]);
  return (
    <div className="loginpage">
      <form className="form" onSubmit={submitHandler}>
        <h1>Register</h1>
        {avatar && <img src={avatar ? avatar : ''} alt="profile"></img>}
        <div className="email">
          <input
            type="text"
            id="name"
            placeholder="Enter Your Name..."
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div className="email">
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email..."
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="password">
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password..."
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <div className="password">
          <input
            type="password"
            id="cpassword"
            placeholder="Confirm Your Password..."
            onChange={(e) => setCpassword(e.target.value)}
            required
          ></input>
        </div>
        <div className="password">
          <input type="file" onChange={setImage} required></input>
        </div>
        <div className="logbtn">
          <button type="submit">Register</button>
        </div>
        <Link className="link" to="/login">
          <div className="register">
            <button>Log In</button>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default Register;
