import { useState } from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {handleSignUp} from "../actions/index"

function SignUp(props){

    const [email, setEmail] = useState('')  
    const [password, setPassword] = useState('')

    function handleChange(e){
        const {name, value} = e.target
        name === "email" ? setEmail(value)
                         : setPassword(value)
    }

    function handleSubmit(e){
        e.preventDefault()
        props.handleSignUp(email, password)
        
    }
    return(
        <div className="form">
                <h2 className="headerTitle">SignUp</h2>
                <div className="row">
                    <label>Your email</label>
                    <input 
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    />
                </div> 

                <div className="row">
                    <label>Password</label>
                    <input 
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    />
                </div> 

                <div className="row">
                    <button onClick={handleSubmit}>SignUp</button>
                </div>

                <div className="row">
                    {props.message}
                    <Link to="/login">or Login here</Link>
                </div>
            </div> 
    )
}

const mapStateToProps = (state) => {
    return { 
        message: state.SignUp.message 
    };
  };

export default connect(mapStateToProps, { handleSignUp })(SignUp);