import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";
import meReducer from "./meReducer";

const rootReducer = combineReducers({
    SignUp: signupReducer,
    Login: loginReducer,
    Me: meReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>