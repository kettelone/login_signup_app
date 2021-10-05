import React from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import {getMe} from "../actions/index"

function Me(props){
    useEffect(()=>{
        props.getMe(
            localStorage.getItem("accessToken"),
            localStorage.getItem("refreshToken")
        )
    },[])
    return(
        <div className="form">
           <h2 style={{textAlign: "center"}}>{props.message}</h2>
        </div> 
    )
}

const mapStateToProps = (state) => {
    return state.Me;
  };
  
  export default connect(mapStateToProps, { getMe })(Me);
  