const defaultState = {
    currentUser: {},
    redirect: '/login',
    authenticated: false
}

function reducer (state = defaultState, action){
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                currentUser: action.payload
            }
        case "SET_REDIRECT":
            return {
                ...state,
                redirect: action.payload
            }
        case "SET_AUTH":
            return {
                ...state,
                authenticated: true,
                redirect: '/'
            }
        default: return state
    }
}

export default reducer