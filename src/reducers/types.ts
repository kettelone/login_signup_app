const LOG_IN = 'LOG_IN'
const SIGN_UP = 'SIGN_UP'
const ME = 'ME'

export interface SignUpState{
    message: string;
}

export interface SignUpAction{
    type: string;
    payload: any;
}

export interface LoginState{
    isAuth: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;

}

export interface LoginAction{
    type: string;
    payload: any;
}

export interface MeState{
    message: string;
    status: string;
}

export interface MeAction{
    type: string;
    payload: any;
}

export {LOG_IN, SIGN_UP, ME}