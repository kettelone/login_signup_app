import { LOG_IN } from "./types";

const initialState = {
    isAuth: false
}

const  loginReducer = (state = initialState, action) =>{
        switch(action.type){
            case LOG_IN :
                if(action.payload.status === "error"){
                    return{
                    ...state, 
                    message: "Incorrect email or password",
                  }
                }else{
                    return{
                        ...state,
                        isAuth: true,
                        accessToken: action.payload.body.access_token,
                        refreshToken: action.payload.body.refresh_token,
                    }
                }
            default:
                return state;     
 }
}

export {loginReducer}