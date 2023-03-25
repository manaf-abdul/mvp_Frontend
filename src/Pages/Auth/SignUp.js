import React, { useState } from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import axios from "axios"
import BASEURL from '../../constants'
import PasswordStrengthBar from 'react-password-strength-bar';
import { UserState } from '../../Context';

const SignUp = () => {
  const navigate = useNavigate()
  const { user, setUser } = UserState()

  const [otp, setOtp] = useState('');
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otpPage, setOtpPage] = useState(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const signUpHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (!values.name || !values.email || values.password.length < 8) {
        if (values.password.length < 8) {
          toast.error("Passwprd should be atleast 8 characters")
        } else {
          toast.info("Please fill all fields")
        }
      } else {
        const payload = {
          email: values.email,
          name: values.name,
          password: values.password,
          confirmPassword: values.confirmPassword
        }
        const { data } = await axios.post(`${BASEURL}/auth/register`, payload)
        setOtpPage(true)
      }
    } catch (error) {
      console.log("error",error.message)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const submitHandler = async () => {
    try {
      setLoading(true)
      const payload = {
        email: values.email,
        otp: Number(otp)
      }
      const {data} = await axios.post(`${BASEURL}/auth/verify-otp`, payload)
      console.log("data", data)
      toast.success("SignUp Successfull")
      if (data && data.accessToken) {
        console.log("inside")
        setUser(data)
        localStorage.setItem('user',JSON.stringify(data.accessToken))
        navigate('/home')
    }
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='container'>
        <div className='form-box'>
          <h1 style={{ textAlign: "center" }}>Sign Up</h1>
          {
            otpPage ?
              <>
                <hr />
                <div className='form-input'>
                  <label style={{ marginLeft: "7rem" }}>Enter your Otp</label>
                  <input
                    type={"password"}
                    placeholder="Enter OTP"
                    name="confirmPassword"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  >
                  </input>

                </div>
                <div className='form-input'>
                  <button onClick={submitHandler}>{loading?"Loading...":"Verify OTP"}</button>
                </div>
              </>
              :
              <>
                <button className='google-btn'><img src="./google.png"></img>Sign up with Google</button>
                <hr />
                <form onSubmit={signUpHandler}>
                  <div className='form-input'>
                    <label>Name</label>
                    <input type="text"
                      placeholder="Enter your Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className='form-input'>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      value={values.email}
                      required
                      onChange={handleChange}
                    >
                    </input>
                  </div>
                  <div className='form-input'>
                    <label>Password</label>
                    <div className='password-input'>
                      <input
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                      >
                      </input>
                      <span
                        onClick={() => setShow(!show)}>
                        {show ?
                          <FontAwesomeIcon icon={faEyeSlash} />
                          :
                          <FontAwesomeIcon icon={faEye} />}
                      </span>
                    </div>
                  </div>

                  <PasswordStrengthBar password={values.password} />
                  <div className='form-input' style={{ marginTop: "3px" }}>
                    <label>Confirm Password</label>
                    <div className='password-input'>
                      <input
                        type={"password"}
                        placeholder="Enter password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                      >
                      </input>
                    </div>
                  </div>
                  <div className='form-check-input' style={{ marginTop: "6px" }}>
                    <input id="check-box" type="checkbox" placeholder="name"></input>
                    <label htmlFor='check-box'>i agree with <Link>terms</Link> And <Link>Privacy</Link></label>
                  </div>
                  <div className='form-input'>
                    <button type="submit">{loading?"loading...":"Sign Up"}</button>
                  </div>
                  <hr />
                  <div className='footer-text'>
                    <p>Already have an account?</p>
                    <Link to={'/'}>Login</Link>
                  </div>
                </form>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp