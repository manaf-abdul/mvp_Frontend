import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import BASEURL from '../../constants'
import axios from 'axios'
import { UserState } from '../../Context';

const SignIn = () => {
    const { user, setUser } = UserState()
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
            if (!values.email || !values.password) {
                toast.info("Please fill all fields")
            } else {
                const payload={
                    email:values.email,
                    password:values.password
                }
                const { data } = await axios.post(`${BASEURL}/auth/login`, payload)
                toast.success("SignIn Successfull")
                console.log("data",data)
                if (data && data.accessToken) {
                    console.log("inside")
                    setUser(data)
                    localStorage.setItem('user',JSON.stringify(data.accessToken))
                    navigate('/home')
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data)
        }
    }

    return (
        <div className='container'>
            <div className='form-box'>
                <h1>Login</h1>
                <button className='google-btn'><img src="./google.png"></img>Log in with Google</button>
                <hr></hr>
                <form onSubmit={submitHandler}>
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
                    <div className='form-check-input'>
                        <input id="remember-me" type="checkbox"></input>
                        <label for="remember-me">Remember me</label>
                    </div>
                    <div className='form-input'>
                        <button type='submit'>Login</button>
                    </div>
                    <div className='form-input'>
                        <Link>Forgot Password</Link>
                    </div>
                    <hr />
                    <div className='footer-text'>
                        <p>Don't have an account ?</p>
                        <Link to={'/signup'}>SignUp</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn