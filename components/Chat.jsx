import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import styles from '../stylesheets/chat';
import BottomBar from "./Bottom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrieveMessages, sendMessages } from '../functions/database';
import { BusContext } from "../functions/bus";
import alert from './Alert';

const Chat = () => {
    const [entered_input, changeMsg] = useState("");
    const [msgstatus, changeMsgStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true); // New state to track loading status
    
    const sent = require('../assets/send.png');
    const [storedUsername, setStoredUsername] = useState('guest');
    const [chats, changeChats] = useState([]);

    const { busStops } = useContext(BusContext);
    const routename = busStops[0];

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('Username');
                if (storedUsername) setStoredUsername(storedUsername);
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        const fetchData = async () => {
            setIsLoading(true); // Start loading
            const messagesarray = await retrieveMessages(routename);
            if (messagesarray == undefined) {
                changeMsgStatus("No one has sent a message yet..");
            } else {
                changeChats(messagesarray);
                changeMsgStatus(""); // Clear loading message
            }
            setIsLoading(false); // End loading
        };

        fetchUsername();
        fetchData();
    }, []);

    const sendMessage = () => {
        if (storedUsername == "guest") {
            alert('Feature Disabled', 'Log in to chat', [
                { text: 'OK', onPress: () => console.log('') },
            ]);
        } else {
            if (entered_input.length > 0) {
                var EI = { sender: storedUsername, message: entered_input };
                sendMessages(entered_input, storedUsername, routename);
                const newMsgs = [...chats, EI];
                changeChats(newMsgs);
                changeMsg('');
            }
        }
    };

    return (
        <View style={styles.root}>
            {isLoading ? (
                <View style={styles.cb}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{ margin: 10 }}>{msgstatus}</Text>
                </View>
            ) : chats.length === 0 ? (
                <View style={styles.cb}>
                    <Text style={{ margin: 10 }}>{msgstatus}</Text>
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
                                hours = hours % 12;
                                hours = hours ? hours : 12;
                                const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                                formattedTime = `${hours}:${formattedMinutes} ${ampm}`;
                            }
                            return (
                                <View
                                    style={[
                                        styles.overallcm,
                                        chat.sender === storedUsername ? styles.rightAligned : styles.leftAligned,
                                    ]}
                                    key={idx}
                                >
                                    <Text style={styles.user}>~{chat.sender}</Text>
                                    <View style={styles.cm}>
                                        <Text>{chat.message}</Text>
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
    );
};

export default Chat;
