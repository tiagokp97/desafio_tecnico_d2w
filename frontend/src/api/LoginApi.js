import { toast } from "react-toastify";
import baseUrl from "./baseUrl"

const notify = (text) => toast(text);

export const loginUser = async (email, password) => {
    try {
        const response = await baseUrl.post('/login', { email, password });
        return response;
    } catch (error) {
        notify('Login ou senha incorretos')

    }
};

export const registerUser = async (email, password) => {
    try {
        const response = await baseUrl.post('/register', { email, password });
        return response;
    } catch (error) {
        notify('Email em uso')

    }
};

export const logoutUser = async () => {
    try {
        await baseUrl.post('/logout');
    } catch (error) {
        notify('Houve um erro para deslogar')

    }
};


