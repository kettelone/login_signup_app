/* eslint-disable react/jsx-no-bind */

import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import  useTypedSelector  from '../hooks/useTypedSelector';
import { handleLogin } from '../actions/index';
import { LOG_IN } from '../reducers/types';
import { InputForm, SubmitButton } from './input';

const Login :React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isAuth, message} =  useTypedSelector((state) => state.Login)
  const dispatch = useDispatch();

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if(name === 'email'){
      setEmail(value)
    }else{
      setPassword(value)
    }
  }

  function handleSubmit(e:React.MouseEvent) {
    e.preventDefault();
    handleLogin(email, password).then((response:any) => {
      dispatch({ type: LOG_IN, payload: response.data });
    });
  }

  if (isAuth === true) {
    return <Redirect to="/me" />;
  }

  return (

    <div className="form">
      <h2 className="headerTitle">Login</h2>

      <InputForm type="email" name="email" placeholder="Enter your email" handleChange={handleChange} />
      <InputForm type="password" name="password" placeholder="Enter your password" handleChange={handleChange} />
      <SubmitButton name="Login" handleSubmit={handleSubmit} />

      <div className="row">
        {message}
        <Link to="/signup">or SignUp here</Link>
      </div>
    </div>

  );
};

export default Login;
