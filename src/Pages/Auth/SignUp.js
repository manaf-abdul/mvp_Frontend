import React, { useState } from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import axios from "axios"
import BASEURL from '../../constants'
import PasswordStrengthBar from 'react-password-strength-bar';

const SignUp = () => {
  const navigate = useNavigate()

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [show, setShow] = useState(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      if (!values.name || !values.email || values.password.length<8) {
        if (values.password.length < 8) {
          toast.error("Passwprd should be atleast 8 characters")
        } else {
          toast.info("Please fill all fields")
        }
      } else {
        const { data } = await axios.post(`${BASEURL}/api/user/signup`, values)
        toast.success("SignUp Successfull")
        navigate('/login')
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  return (
    <div>
      <div className='container'>
        <div className='form-box'>
          <h1>SignUp</h1>
          <button className='google-btn'><img src="./google.png"></img>Signup with Google</button>
          <hr />
          <form onSubmit={submitHandler}>
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
              <PasswordStrengthBar password={values.password} />
            </div>
            <div className='form-check-input' style={{ marginTop: "6px" }}>
              <input id="check-box" type="checkbox" placeholder="name"></input>
              <label htmlFor='check-box'>i agree with <Link>terms</Link> And <Link>Privacy</Link></label>
            </div>
            <div className='form-input'>
              <button type="submit">SignUp</button>
            </div>
            <hr />
            <div className='footer-text'>
              <p>Already have an account?</p>
              <Link to={'/'}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp