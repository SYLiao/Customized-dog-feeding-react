import { act } from 'react-dom/test-utils'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const init = {
   isAuth:false,
    user: "",
    token: ""
}

export default (state = init ,action) => { 
    switch(action.type){
        case LOGIN:
            localStorage.setItem("user", action.payload.user);
            return {
                ...state,
                isAuth:true,
                user: action.payload.user,
                token: action.payload.token
            }
        case LOGOUT:
            localStorage.setItem("user", "");
            return {
                ...state,
                isAuth:false,
                user: "",
                token: ""
            }
        default :
            return state
    }
}