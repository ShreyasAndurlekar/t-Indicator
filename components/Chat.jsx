import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import {useState} from 'react'
import styles from '../stylesheets/chat'
import BottomBar from "./Bottom";

const Chat = () => {

    const [chats, changeChats] = useState(["hi"])

    let entered_input = " "

    const sent = require('../assets/send.png')

    return(
    
    <View style = {styles.root}>
        <View style = {styles.cb}>
            {
                chats.map((chat) => (
                    <View style = {styles.cm}>
                        <Text>{chat}</Text>
                    </View>
                ))
            }
        </View>
        <View style = {styles.chatbar}>
            <TextInput style = {styles.ib} onChangeText = {(val) => {entered_input = val}}/>
            <TouchableOpacity onPress = {
                
                () => {

                    console.log("Entered message = ",entered_input)

                    const newMsgs = [...chats, entered_input]
                    
                    changeChats(newMsgs) 
                    entered_input = " "

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