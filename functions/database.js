import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.ROUTE_FOR_SIGNUP;
const SIGNIN_API_URL = process.env.ROUTE_FOR_AUTH;

export const signIn = async (credentials) => {
    try {

        const response = await axios.post(SIGNIN_API_URL, credentials);
        const token  = response.data.token
        const username = response.data.username

        await AsyncStorage.setItem('Username', username);
        
        const storedUsername = await AsyncStorage.getItem('Username');

        console.log('Stored username:', storedUsername);

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

export const signOut = async () => {
    try {
        
        await AsyncStorage.removeItem('Username');

    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};