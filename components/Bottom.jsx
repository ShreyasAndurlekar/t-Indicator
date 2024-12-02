import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Make sure this is imported
import styles from '../stylesheets/global';

const BottomBar = () => {
    const chat = require('../assets/chat.png');
    const route = require('../assets/route.png');

    const navigation = useNavigation();

    return (
            <LinearGradient
                colors={['#edd328','#FFA500']} // Orange gradient colors
                style={styles.bottom}
            >
                <TouchableOpacity onPress={() => {navigation.navigate('RoutesList')}}>
                    <Image source={route} style={styles.icons} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('Chat')}}>
                    <Image source={chat} style={styles.icons} />
                </TouchableOpacity>
            </LinearGradient>
    );
}

export default BottomBar;
