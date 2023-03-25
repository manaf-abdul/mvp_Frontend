import React, { useState } from 'react'

const UpdateProfile = () => {
  const submitHandler = async () => {
    try {
      console.log("here");
    } catch (error) {

    }
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  })

  return (
    <div>
      <div className='container'>
        <div className='form-box'>
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

          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile