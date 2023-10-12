import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const history = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email : credentials.email, password: credentials.password})
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            history('/')
            props.showAlert('Logged In Successfully', 'success') 
          }
          else{
            props.showAlert('Invalid Credentials', 'danger')
          }
        }
    
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value })
    }
    

  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={onChange} name='email' id="email" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" value={credentials.password} onChange={onChange} name='password' className="form-control" id="password"/>
        </div>
        <button type="submit" className="btn btn-primary" onSubmit={handleSubmit} >Submit</button>
      </form>
    </div>
  )

}
export default Login
