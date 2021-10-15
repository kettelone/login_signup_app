import {ME, MeAction, MeState} from "./types"

const initialState = { 
    message: "Loading...",
    status: ''
}

const meReducer = (state = initialState, action :MeAction) :MeState => {
    switch(action.type){
        case ME :
            return{
                ...state,
                message: action.payload.data.body.message,
                status: action.payload.data.statusCode,
            }
        default: 
        return state
    }
}

export default meReducer