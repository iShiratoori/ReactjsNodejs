import { useState } from 'react'

function useInput(data) {
    const [value, setValue] = useState(data)

    const resetValue = () => {
        setValue("")
    }
    const handleChange = e => {
        setValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })
        )
    }
    return [value, handleChange, resetValue]
}

export default useInput
