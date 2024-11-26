import { View, Image, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {useState, useEffect, useContext} from 'react'
import styles from '../stylesheets/chat'
import BottomBar from "./Bottom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrieveMessages, sendMessages } from '../functions/database';
import { BusContext } from "../functions/bus";
import alert from './Alert'

const Chat = () => {

    const [entered_input, changeMsg] = useState("")
    const [msgstatus, changeMsgStatus] = useState("Loading..")
    
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

                if (storedUsername) 
                    setStoredUsername(storedUsername);
                
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        const fetchData = async () => {

            const messagesarray = await retrieveMessages(routename) // remember to use await, if you did not use await, it would execute the next code without waitin
            if(messagesarray == undefined)
                changeMsgStatus("No one has sent a message yet..")
            else
                changeChats(messagesarray)
            
        }

        fetchUsername();
        fetchData();

    }, []);

    // RETRIEVE MESSAGES

    const sendMessage = () => {

        if(storedUsername == "guest"){

            alert('Feature Disabled', 'Log in to chat', [

                {text: 'OK', onPress: () => console.log('')},

            ]);

        }
        else{

            if(entered_input.length > 0){

                var EI = {sender: storedUsername, message: entered_input}
                sendMessages(entered_input, storedUsername, routename)

                const newMsgs = [...chats, EI]
            
                changeChats(newMsgs) 
                changeMsg('')
            }  

            }
        }

    return(
    
        <View style={styles.root}>
        {chats.length === 0 ? (
            <View style={styles.cb}>
                <Text style = {{margin: 10, fontFamily: 'Futura', letterSpacing: 0.3}}>{msgstatus}</Text>
            </View>
        ) : (
            <ScrollView>
                <View style={styles.cb}>
                    {chats.map((chat, idx) => {
                        let formattedTime;
    
                        if (chat.createdAt !== undefined) {
                            formattedTime = new Date(chat.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            });
                        } else {
                            const date = new Date();
                            let hours = date.getHours();
                            const minutes = date.getMinutes();
                            const ampm = hours >= 12 ? 'PM' : 'AM';
    
                            // Convert to 12-hour format
                            hours = hours % 12;
                            hours = hours ? hours : 12; // the hour '0' should be '12'
    
                            // Pad minutes with leading zero if needed
                            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                            formattedTime = `${hours}:${formattedMinutes} ${ampm}`;
                        }
    
                        return (
                            <View
                                style={[
                                    styles.overallcm,
                                    chat.sender === storedUsername ? styles.rightAligned : styles.leftAligned,
                                ]}
                                key={idx}>
                                <Text style={styles.user}>~{chat.sender}</Text>
                                <View style={styles.cm}>
                                    <Text style = {styles.skyrimfont}>{chat.message}</Text>
                                </View>
                                <Text style={styles.time}>{formattedTime}</Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        )}
        <View style={styles.chatbar}>
            <TextInput
                style={styles.ib}
                onChangeText={(val) => changeMsg(val)}
                value={entered_input}
                onSubmitEditing={sendMessage}
            />
            <TouchableOpacity onPress={sendMessage}>
                <Image source={sent} style={styles.ic} />
            </TouchableOpacity>
        </View>
        <BottomBar />
    </View>
    )
}

export default Chat