import axios from 'axios';

const API_URL = 'http://localhost:5000/accounts';
const SIGNIN_API_URL = 'http://localhost:5000/auth';

export const signIn = async (credentials) => {
    try {
        const response = await axios.post(SIGNIN_API_URL, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createAccount = async (account) => {
    try {
        const response = await axios.post(API_URL, account);
        return response.data;
    } catch (error) {
        console.error('Error creating account:', error);
        throw error;
    }
};
