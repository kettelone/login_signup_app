import {ME} from "./types"

const initialState = { message: "Loading..."}

const meReducer = (state = initialState, action) => {
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

export {meReducer}