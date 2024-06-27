import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const API_URL = "https://userdetails-five.vercel.app/accounts"
//const SIGNIN_API_URL = 	"https://userdetails-five.vercel.app/auth"

const API_URL = "http://localhost:5000/accounts"
const SIGNIN_API_URL = 	"http://localhost:5000/auth"

console.log("Does this work?",API_URL)

export const signIn = async (credentials) => {
    try {

        const response = await axios.post(SIGNIN_API_URL, credentials);
        const token  = response.data.token
        const username = response.data.username

        await AsyncStorage.setItem('Token', token);
        await AsyncStorage.setItem('Username',username);
        
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