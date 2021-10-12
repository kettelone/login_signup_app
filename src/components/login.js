import { useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {Link, Redirect}  from "react-router-dom"
import {handleLogin} from "../actions/index"
import {LOG_IN} from "../reducers/types"
import {InputForm,SubmitButton} from "./input"

const Login =() =>{

    const [email, setEmail] = useState('')  
    const [password, setPassword] = useState('')
    const isAuth = useSelector(state => state.Login.isAuth)
    const message  = useSelector(state => state.Login.message)
    const dispatch  = useDispatch()

    function handleChange(e){
        const {name, value} = e.target
        name === "email" ? setEmail(value)
                         : setPassword(value)
    }

    function handleSubmit(e){
        e.preventDefault()
        handleLogin(email, password).then((response) => {
        dispatch({type: LOG_IN, payload: response.data})
     })
    }

    if (isAuth === true) {
        return <Redirect to="/me" />;
      }

         return(
            <div className="form">
                <h2 className="headerTitle">Login</h2>

                <InputForm type = "email" name = "email" placeholder = "Enter your email" handleChange={handleChange} />
                <InputForm type = "password" name = "password" placeholder = "Enter your password" handleChange={handleChange} />
                <SubmitButton name="Login" handleSubmit={handleSubmit} />

                <div className="row">
                    {message}
                    <Link to="/signup">or SignUp here</Link>
                </div>
            </div> 
     
    )
 }

export default Login;