export function serverDataReducer(state, action) {
    switch (action.type) {
        case 'update': // updates state with a new data that is comming from server
            return action.data
        default:
            return state
    }
}