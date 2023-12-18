import { $authHost, $host } from "./http";
import { jwtDecode } from "jwt-decode";

export const registration = async (name, email, pass) => {
    const { data } = await $host.post('api/registration', { name, email, pass })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, pass) => {
    const { data } = await $host.post('api/login', { email, pass })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    if (localStorage.getItem('token')) {
        const { data } = await $authHost.get('api/auth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    }
}
