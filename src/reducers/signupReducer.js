import { SIGN_UP } from "./types";

const initialState = "Provide email and password"

const signupReducer = (state = initialState, action) => {
    switch(action.type){
        case SIGN_UP: 
            return {
                ...state,
                message: action.payload.message
            }
        default: 
            return state   
    }
}

export {signupReducer}