import axios from "axios";
import baseUrl from "./baseUrl";
const userId = localStorage.getItem('user_id');

export const getItemById = async (itemId) => {
    try {
        const response = await baseUrl.get(`/items/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the item!', error);
        throw error;
    }
};

export const getAllItems = async () => {

    try {
        const response = await baseUrl.get('/items');
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the items!', error);
        throw error;
    }
};

export const firstRender = async () => {
    const accessToken = localStorage.getItem('access_token');

    try {
        const response = await axios.get('http://127.0.0.1:5000/items', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the items!', error);
        throw error;
    }
};

export const createItem = async (title, description) => {
    try {
        const response = await baseUrl.post('/items', { title, userId, description });
        return response.data;
    } catch (error) {
        console.error('There was an error creating the item!', error);
        throw error;
    }
};

export const updateItem = async (item) => {
    const { id, title, description, completed } = item
    try {
        const response = await baseUrl.put(`/items/${id}`, { title, description, completed });
        return response.data;
    } catch (error) {
        console.error('There was an error updating the item!', error);
        throw error;
    }
};

export const updateItemStatus = async (itemId, completed) => {
    try {
        const response = await baseUrl.patch(`/items_status/${itemId}`, completed);
        return response.data;
    } catch (error) {
        console.error('There was an error updating the item!', error);
        throw error;
    }
};


export const deleteItem = async (itemId) => {
    try {
        const response = await baseUrl.delete(`/items/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('There was an error deleting the item!', error);
        throw error;
    }
};

