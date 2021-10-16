/* eslint-disable react/jsx-no-bind */
import React , {useState} from "react"
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import useTypedSelector from "../hooks/useTypedSelector"
import {handleSignUp} from "../actions/index"
import {SIGN_UP} from "../reducers/types"
import {InputForm,SubmitButton} from "./input"

const SignUp :React.FC = () =>{

    const [email, setEmail] = useState('')  
    const [password, setPassword] = useState('')
    const message  = useTypedSelector(state => state.SignUp.message)
    const dispatch  = useDispatch()

    function handleChange(e : React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target
        if(name === 'email'){
            setEmail(value)
          }else{
            setPassword(value)
          }
    }

    function handleSubmit(e :React.MouseEvent){
        e.preventDefault()
        handleSignUp(email, password).then((response:any) => {
            dispatch({type: SIGN_UP, payload: response.data})
         })
        
    }
    return(
        <div className="form">
                <h2 className="headerTitle">SignUp</h2>

                <InputForm type = "email" name = "email" placeholder = "Enter your email" handleChange={handleChange} />
                <InputForm type = "password" name = "password" placeholder = "Enter your password" handleChange={handleChange} />
                <SubmitButton name="SignUp" handleSubmit={handleSubmit} />

                <div className="row">
                    {message}
                    <Link to="/login">or Login here</Link>
                </div>
            </div> 
    )
}


export default SignUp;