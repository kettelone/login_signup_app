import { LOG_IN, LoginAction, LoginState} from "./types";


const initialState :LoginState = {
    isAuth: false,
    message: '',
    accessToken: '',
    refreshToken: '',
}

const  loginReducer = (state = initialState, action :LoginAction) :LoginState =>{
        switch(action.type){
            case LOG_IN : 
                if(action.payload.status === "error"){
                    return{
                    ...state, 
                    message: "Incorrect email or password",
                  }
                }
                    return{
                        ...state,
                        isAuth: true,
                        accessToken: action.payload.body.access_token,
                        refreshToken: action.payload.body.refresh_token,
                    }
                
            default:
                return state;     
 }
}

export default loginReducer