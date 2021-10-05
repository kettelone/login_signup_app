import { useState } from "react"
import {Link, Redirect}  from "react-router-dom"
import {connect} from "react-redux"
import {handleLogin} from "../actions/index"

function Login(props){

    const [email, setEmail] = useState('')  
    const [password, setPassword] = useState('')


    function handleChange(e){
        const {name, value} = e.target
        name === "email" ? setEmail(value)
                         : setPassword(value)
    }

    function handleSubmit(e){
        e.preventDefault()
        props.handleLogin(email, password)
    }

    if (props.auth === true) {
        return <Redirect to="/me" />;
      }

         return(
            <div className="form">
                <h2 className="headerTitle">Login</h2>
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
                    <button onClick={handleSubmit} >Login</button>
                </div>

                <div className="row">
                    <Link to="/signup">or SignUp here</Link>
                </div>
            </div> 
     
    )
 }

const mapStateToProps = (state) => {
    return { 
        auth: state.Login.isAuth
    };
  };

export default connect(mapStateToProps, { handleLogin })(Login);