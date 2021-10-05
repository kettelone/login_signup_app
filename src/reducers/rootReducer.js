import { combineReducers } from "redux";
import {loginReducer} from "./loginReducer";
import {signupReducer} from "./signupReducer";
import {meReducer} from "./meReducer";

const rootReducer = combineReducers({
    SignUp: signupReducer,
    Login: loginReducer,
    Me: meReducer
})

export {rootReducer}