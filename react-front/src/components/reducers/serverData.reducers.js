export function serverDataReducer(state, action) {
    switch (action.type) {
        case 'NEW': // updates state with a new data that is comming from server
            return action.data
        case 'UPDATE':
            const newdata = action.data
            return { ...state, ...newdata }
        case "DENTISTS":
            return { ...state, dentists: action.data }
        case "PATIENTS":
            return { ...state, patients: action.data }
        case "APPOINTMENTS":
            return { ...state, appointments: action.data }
        case "EDIT":
            return state.map(todo =>
                todo.id === action.id ? { ...todo, task: action.newTask } : todo
            )
        default:
            return state
    }
}