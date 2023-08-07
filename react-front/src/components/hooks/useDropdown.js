import { useEffect, useRef, useState } from 'react'

function useDropdown() {
    const [dropdown, setDropdown] = useState(false)
    const dropdownRef = useRef(null);
    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdown(false);
        }
    };
    const toggleDropdown = () => {
        setDropdown((prevOpen) => !prevOpen);
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return [dropdown, toggleDropdown, dropdownRef]
}

export default useDropdown
