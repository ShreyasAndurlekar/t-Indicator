import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useContext, useRef } from 'react';
import styles from '../stylesheets/chat';
import BottomBar from "./Bottom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrieveMessages } from '../functions/database';
import { BusContext } from "../functions/bus";
import alert from './Alert';
import { io } from 'socket.io-client';
import { API_URL } from '@env';

const Chat = () => {
    const [entered_input, changeMsg] = useState("");
    const [msgstatus, changeMsgStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true); 
    const [storedUsername, setStoredUsername] = useState('guest');
    const [chats, changeChats] = useState([]);
    const { busStops } = useContext(BusContext);
    const routename = busStops[0];
    const sent = require('../assets/send.png');
    const socketRef = useRef(null);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const stored = await AsyncStorage.getItem('Username');
                if (stored) setStoredUsername(stored);
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };
        fetchUsername();
    }, []);

    useEffect(() => {
        if (!routename) return;

        const fetchData = async () => {
            setIsLoading(true);
            const messagesarray = await retrieveMessages(routename);
            if (!messagesarray || messagesarray.length === 0) {
                changeMsgStatus("No one has sent a message yet..");
            } else {
                changeChats(messagesarray);
                changeMsgStatus("");
            }
            setIsLoading(false);
        };

        fetchData();

       socketRef.current = io(`${API_URL}`, {
  transports: ['websocket'],
});

        socketRef.current.emit('join_room', routename);

        socketRef.current.on('receive_message', (data) => {
            changeChats(prev => [...prev, data]);
        });

        return () => {
            socketRef.current.off('receive_message');
            socketRef.current.disconnect();
        };
    }, [routename]);

    const sendMessage = () => {
        if (storedUsername === "guest") {
            alert('Feature Disabled', 'Log in to chat', [{ text: 'OK', onPress: () => {} }]);
        } else if (entered_input.length > 0) {
            socketRef.current.emit('send_message', {
                message: entered_input,
                sender: storedUsername,
                route: routename
            });
            changeMsg('');
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
                            let formattedTime = "";
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
                                hours = hours % 12 || 12;
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
