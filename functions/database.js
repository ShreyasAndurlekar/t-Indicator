import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.apiUrl;


const activateServer = async () => {
      try {
        await axios.get(`${apiUrl}`)
      } catch (error) {
        console.error('Error activating server:', error.message);
      }
    };
  
activateServer()   


const API_URL = `${apiUrl}accounts`;
const SIGNIN_API_URL = `${apiUrl}auth`;
const RETRIEVEMESSAGES_URL = `${apiUrl}messages`;
const SENDMESSAGE_URL = `${apiUrl}send`;
const GETLOC_URL = `${apiUrl}near`;
const GETTIME_URL = `${apiUrl}time`;

export const getNearestLoc = async (location) => {

    try{

        const response = await axios.get(GETLOC_URL, {
            params: { location }
        })

        return response.data;
    }
    catch (error) {
        console.error('Error retrieving messages:', error);
        throw error;
    }
}

export const signIn = async (credentials) => {
    try { 

        const response = await axios.post(SIGNIN_API_URL, credentials);
        const token  = response.data.token
        const username = response.data.username

        await AsyncStorage.setItem('Token', token);
        await AsyncStorage.setItem('Username',username);
        
        const storedUsername = await AsyncStorage.getItem('Username');

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

export const retrieveMessages = async (routename) => {

    try{

        const response = await axios.get(RETRIEVEMESSAGES_URL, {
            params: { routename }
        })

        if(response.data.length == 0)
            return undefined

        const messages = response.data[0].messages.map(message => ({
            message: message.message,
            sender: message.sender,
            createdAt: message.createdAt
        }));

        return messages;
    }
    catch (error) {
        console.error('Error retrieving messages:', error);
        return undefined
    }
}

export const sendMessages = async (message, username, routename) => {

    try{

        await axios.post(SENDMESSAGE_URL, {
            message,
            username,
            routename
        });
    
    }
    catch (error) {
        console.error('Error sending messages:', error);
        throw error;
    }
}

export const getTime = async ( location ) => {

  try{
       console.log(GETTIME_URL)
        const response = await axios.get(GETTIME_URL, {
            params: { location }
        })

        return response.data.timeAndDistance;
    }
    catch (error) {
        console.error('Error retrieving messages:', error);
        throw error;
    }
 
}


