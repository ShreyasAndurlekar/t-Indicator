import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {useState, useEffect, useContext} from 'react'
import styles from '../stylesheets/chat'
import BottomBar from "./Bottom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrieveMessages, sendMessages } from '../functions/database';
import { BusContext } from "../functions/bus";

const Chat = () => {

    const [entered_input, changeMsg] = useState()
    
    const sent = require('../assets/send.png')
    const [storedUsername, setStoredUsername] = useState('guest'); // due to async nature, we need to keep this a state
    const [chats, changeChats] = useState([])

    const {busStops} = useContext(BusContext)
    const routename = busStops[0]

    // basically since the requests take time, React might render stuff before the stuff is even retrieved from AsyncStorage or Database
    // Therefore we need to do a useEffect before React renders the stuff

    useEffect(() => {

        const fetchUsername = async () => {
            try {

                const storedUsername = await AsyncStorage.getItem('Username');

                console.log(storedUsername)

                if (storedUsername) {

                    setStoredUsername(storedUsername);
                }

                console.log("Username = ",storedUsername)

            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        const fetchData = async () => {

            console.log("Hey this is the routename",routename)
            const messagesarray = await retrieveMessages(routename) // remember to use await, if you did not use await, it would execute the next code without waiting
            console.log('Transformed messages',messagesarray)
            changeChats(messagesarray)
            
        }

        fetchUsername();
        fetchData();

    }, []);

    // RETRIEVE MESSAGES

    return(
    
    <View style = {styles.root}>
        <ScrollView>
            <View style = {styles.cb}>
                
                {
                    chats.map((chat, idx) => (
                        <View style = {styles.overallcm} key = {idx}>
                            <Text style = {styles.user}>~{chat.sender}</Text>
                            <View style = {styles.cm}>
                                <Text>{chat.message}</Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        </ScrollView>
        <View style = {styles.chatbar}>
            <TextInput style = {styles.ib} 
                onChangeText = {(val) => {changeMsg(val)}}
                value = {entered_input}/>
            <TouchableOpacity onPress = {
                
                () => {

                    if(storedUsername == "guest"){

                        Alert.alert('Feature Disabled', 'Log in to chat', [
                            
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                          
                        ]);

                    }
                    else{

                        if(entered_input.length > 0){

                            EI = {sender: storedUsername, message: entered_input}
                            sendMessages(entered_input, storedUsername, routename)

                            const newMsgs = [...chats, EI]
                        
                            changeChats(newMsgs) 
                            changeMsg('')
                        }  

                        }
                    }
                }>
                <Image source = {sent} style = {styles.ic}/>
            </TouchableOpacity>
        </View>
        <BottomBar/>
    </View>
    )
}

export default Chat