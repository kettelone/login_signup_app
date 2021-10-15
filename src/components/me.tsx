import React, { useEffect } from "react";
import {useDispatch} from 'react-redux'
import {getMe} from "../actions/index"
import  useTypedSelector  from '../hooks/useTypedSelector';
import {ME} from "../reducers/types"

const Me: React.FC = () =>{

const message = useTypedSelector(state => state.Me.message)
const dispatch = useDispatch()

    useEffect(()=>{
     getMe(
         localStorage.getItem("accessToken"),
         localStorage.getItem("refreshToken")
         ).then((response) => dispatch({ type: ME, payload: response }))

    },[])
    return(
        <div className="form">
           <h2 style={{textAlign: "center"}}>{message}</h2>
        </div> 
    )
}

  export default Me;