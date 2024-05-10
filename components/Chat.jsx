import { View, Image, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {useState} from 'react'
import styles from '../stylesheets/chat'
import BottomBar from "./Bottom";

const Chat = () => {

    const [chats, changeChats] = useState(["hi"])
    const [entered_input, changeMsg] = useState()

    const sent = require('../assets/send.png')

    return(
    
    <View style = {styles.root}>
        <ScrollView>
            <View style = {styles.cb}>
                
                {
                    chats.map((chat) => (
                        <View style = {styles.cm}>
                            <Text>{chat}</Text>
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

                        const newMsgs = [...chats, entered_input]
                    
                        changeChats(newMsgs) 
                        changeMsg()
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