import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions/loginAction';
import './css/login.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const Login = () => {
  const { userInfo, message, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const datas = {
        email,
        password,
      };
      dispatch(login(datas));
      if (userInfo && userInfo.roles == 'user') {
        toast.success('Login Successfull');
        navigate('/');
      } else if (userInfo && userInfo.roles == 'admin') {
        navigate('/admin');
      } else if (!userInfo) {
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    //message && toast.error(message);
  }, [dispatch, message]);
  return (
    <div className="lloginpage">
      <form className="form" onSubmit={submitHandler}>
        <h1>Sign In</h1>
        <div className="email">
          <input
            type="text"
            id="email"
            placeholder="Enter Your Email..."
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="password">
          <input
            type="password"
            id="passwoed"
            placeholder="Enter Your Password..."
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <div className="logbtn">
          <button type="submit">Sign In</button>
        </div>
        <Link className="link" to="/register">
          <div className="register">
            <button>Create New Account</button>
          </div>
        </Link>
        <h3 id="flex">{message}</h3>
      </form>
    </div>
  );
};

export default Login;
