const defaultState = {
    currentUser: {
        name: null
    },
    redirect: '/login',
    authenticated: false,
    gameid: null
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
        case "SET_UNAUTH":
            return {
                ...state, 
                authenticated: false,
                redirect: '/login',
                currentUser: {
                    name: null,
                }
            }
        case "SET_GAMEID":
            return {
                ...state, 
                gameid: action.payload
            }
        default: return state
    }
}

export default reducer