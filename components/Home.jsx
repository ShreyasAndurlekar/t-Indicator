import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../stylesheets/global'
import { useNavigation } from '@react-navigation/native';
import Navbar from './Navbar'

const Home = () => {

    const navigation = useNavigation();

    return(
        <View style = {styles.root}>
            <Navbar />
            <TouchableOpacity style = {styles.pnroute} onPress = {() => {navigation.navigate('Route')}}>
                <Text>
                    PAWAR NAGAR
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home