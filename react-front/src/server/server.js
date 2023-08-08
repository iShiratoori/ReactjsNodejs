import Cookies from "js-cookie";
import axios from 'axios'

export async function LoginUser(userData, path) {
    const { username, password } = userData
    const res = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('Username or password is incorrect')
        }
        const data = await res.json()
        throw data
    }

    return res.json()
}


export async function RegisterUser(userData, path) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: userData
        })
    })
    if (!res.ok) {
        const data = await res.json()
        throw data
    }
    return res.json()
}

export async function performAPIRequest(path, method, requestData = null) {
    const sessionToken = Cookies.get('session-token');
    const headers = {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json'
    };

    const options = {
        method,
        headers
    };

    if (requestData) {
        options.body = JSON.stringify(requestData);
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, options);

    if (!response.ok) {
        const data = await response.json();
        throw data;
    }

    const data = await response.json();
    return data;
}

export async function uploadFileToServer(path, method, requestData = null) {
    const sessionToken = Cookies.get('session-token');
    const headers = {
        'Authorization': `Bearer ${sessionToken}`,
    };
    const config = {
        method,
        url: `${process.env.REACT_APP_API_URL}/${path}`,
        headers,
        data: requestData, // Include data if provided
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error;
    }


}