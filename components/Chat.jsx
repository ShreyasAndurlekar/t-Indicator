import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from '../stylesheets/chat'
import BottomBar from "./Bottom";

const Chat = () => {

    const sent = require('../assets/send.png')

    return(
    
    <View style = {styles.root}>
        <View style = {styles.cb}></View>
        <View style = {styles.chatbar}>
            <TextInput style = {styles.ib} />
            <TouchableOpacity style = {styles.ic}>
                <Image source = {sent}/>
            </TouchableOpacity>
        </View>
        <BottomBar/>
    </View>
    )
}

export default Chat