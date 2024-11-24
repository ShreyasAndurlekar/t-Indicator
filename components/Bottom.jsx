import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../stylesheets/global'
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomBar = () => {

    const chat = require('../assets/chat.png')
    const route = require('../assets/route.png')

    const navigation = useNavigation();

    return(
    
    <View style = {styles.bottom}>
        <TouchableOpacity onPress = {() => {navigation.navigate('RoutesList')}}>
            <Image source = {route} style = {styles.icons}/>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => {navigation.navigate('Chat')}}>
            <Image source = {chat}  style = {styles.icons}/>
        </TouchableOpacity>
    </View>)
}

export default BottomBar