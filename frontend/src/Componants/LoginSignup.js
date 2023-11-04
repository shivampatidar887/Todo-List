import React, { Fragment, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';
import { clearErrors, login, create } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { toast } from 'react-toastify';
import Loader from './Loader';

const LoginSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const { error, loading, isAuthenticated } = useSelector((state) => state.user);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(create(userData));
    // Save token in local storage
  }

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [dispatch, error, isAuthenticated,navigate]);
  
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOG-IN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <AiOutlineMail />
                <input
                  type="email"
                  placeholder='Email'
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <RiLockPasswordLine />
                <input
                  type="password"
                  placeholder='Password'
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>


              <input type="submit" value="logIn" className='loginBtn' />

            </form>

            <form className='signUpForm'
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signUpName">
                <RxAvatar />
                <input
                  type="text"
                  placeholder='Name'
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <AiOutlineMail />
                <input
                  type="email"
                  placeholder='Email'
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <RiLockPasswordLine />
                <input
                  type="password"
                  placeholder='Password'
                  required
                  name='password'
                  value={password}
                  onChange={registerDataChange}
                />
              </div>
              <input
                type="submit"
                value="Register"
                className='signUpBtn'
              />
            </form>

          </div>
        </div>
      </Fragment>}
    </Fragment>
  )
};

export default LoginSignUp
