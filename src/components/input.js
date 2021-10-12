import React from "react"

const InputForm = (props) =>{
    return(
         <div className="row">
            <label>Your {props.type}</label>
            <input 
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            onChange={props.handleChange}
            />
        </div>
    )
}

const SubmitButton = (props) =>{
    return(
    <div className="row">
        <button 
        onClick={props.handleSubmit} 
        >{props.name}</button>
    </div>
    )
}

export {InputForm,SubmitButton};