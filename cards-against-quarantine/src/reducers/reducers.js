const defaultState = {
    currentUser: {},
    redirect: '/login'
}

function reducer (state = defaultState, action){
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                currentUser: action.payload,
                redirect: '/lobby'
            }
        default: return state
    }
}

export default reducer