// import SignUp from "../components/sign_up";
import { SIGN_UP , SignUpState, SignUpAction} from "./types";

const initialState :SignUpState = {
    message: "Provide email and password"
}

const signupReducer = (state = initialState, action :SignUpAction) :SignUpState => {
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

export default signupReducer