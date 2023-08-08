export function serverDataReducer(state, action) {
    switch (action.type) {
        case 'NEW': // updates state with a new data that is comming from server
            return action.data
        case 'UPDATE':
            const newdata = action.data
            return { ...state, ...newdata }
        case "REMOVE_APPOINTMENT":
            return { ...state, appointments: state.appointments.filter(appointment => appointment._id !== action.id) }
        case "EDIT":
            return state.map(todo =>
                todo.id === action.id ? { ...todo, task: action.newTask } : todo
            )
        default:
            return state
    }
}