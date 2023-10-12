import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    const history = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password})
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            history('/')
          }
          else{
            alert("Invalid credentials")
          }
        }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value })
    }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" name='name' onChange={onChange} value={credentials.name} className="form-control" id="name" aria-describedby="emailHelp" required  />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" name='email' onChange={onChange} value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" required  />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name='password' onChange={onChange} value={credentials.password} className="form-control" id="password" required minLength={5} />
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" name='cpassword' onChange={onChange} value={credentials.cpassword} className="form-control" id="cpassword" required minLength={5} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
