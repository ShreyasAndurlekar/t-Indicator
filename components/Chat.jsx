import { View, Image, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {useState, useEffect} from 'react'
import styles from '../stylesheets/chat'
import BottomBar from "./Bottom";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {

    const [entered_input, changeMsg] = useState()
    
    const sent = require('../assets/send.png')
    const [storedUsername, setStoredUsername] = useState('guest'); // due to async nature, we need to keep this a state

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

        fetchUsername();
    }, []);

    const [chats, changeChats] = useState([{user: storedUsername, msg: "hi"}])

    return(
    
    <View style = {styles.root}>
        <ScrollView>
            <View style = {styles.cb}>
                
                {
                    chats.map((chat) => (
                        <View style = {styles.overallcm}>
                            <Text style = {styles.user}>~{chat.user}</Text>
                            <View style = {styles.cm}>
                                <Text>{chat.msg}</Text>
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

                    if(entered_input.length > 0){

                        EI = {user: storedUsername, msg: entered_input}

                        const newMsgs = [...chats, EI]
                    
                        changeChats(newMsgs) 
                        changeMsg('')
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