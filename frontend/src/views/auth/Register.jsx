import React, {useState, useEffect} from 'react'
import { register } from '../../utils/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

function Register() {
  const [fullname,setFullname] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [password,setPassword] = useState("")
  const [password2,setPassword2] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if(isLoggedIn()){
        navigate("/")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form data:", { fullname, email, phone, password, password2 });
    setIsLoading(true)

    const {error} = await register(fullname,email,phone,password,password2)

    if(error){
        console.error("Registration error:", error);
        alert(JSON.stringify(error))
    }else{
        navigate("/")
    }
  }

  return (
    <div>
        <div>Register</div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Full Name' onChange={(e) => setFullname(e.target.value)}></input>
            <br/>
            <br/>
            <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
            <br/>
            <br/>
            <input type='number' placeholder='Mobile Number' onChange={(e) => setPhone(e.target.value)}></input>
            <br/>
            <br/>
            <input type='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}></input>
            <br/>
            <br/>
            <input type='password' placeholder='Confirm Password' onChange={(e) => setPassword2(e.target.value)}></input>
            <br/>
            <br/>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register