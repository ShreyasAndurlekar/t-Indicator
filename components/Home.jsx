import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../stylesheets/global'
import { useNavigation } from '@react-navigation/native';
import Navbar from './Navbar'

const Home = () => {

    const navigation = useNavigation();

    return(
        <View style = {styles.root}>
            <Navbar />
            <TouchableOpacity style={styles.pnroute} onPress={() => { navigation.navigate("Route", { busRoute: 0 }) }}>

                <Text style = {{fontWeight: 'bold'}}>पवार नगर</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.pnroute} onPress={() => { navigation.navigate("Route", { busRoute: 1 }) }}>

                <Text style = {{fontWeight: 'bold'}}>धर्माचापडा</Text>

            </TouchableOpacity>

        </View>
    )
}

export default Home