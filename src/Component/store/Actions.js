export const login = (username, token) =>{
    return{
        type: 'LOGIN',
        payload: {
            user: username,
            token: token
        }
    };
};

export const logout = () =>{
    return{
        type: 'LOGOUT'
    };
};