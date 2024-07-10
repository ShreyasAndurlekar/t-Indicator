import { View, Text, Image, TouchableOpacity } from "react-native"
import navbar_styles from '../stylesheets/navbar'
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {

    const icon = require('../assets/user.png')
    const navigation = useNavigation();

    return(
        <View>
            <View style={navbar_styles.navbar}>
                <View style={navbar_styles.textContainer}>
                    <Text style={navbar_styles.navtext}>
                        TMT App
                    </Text>
                </View>
                <TouchableOpacity onPress = {() => {navigation.navigate("Account")}}>
                    <Image source={icon} style={navbar_styles.navicon} />
                </TouchableOpacity>
            </View>
       </View>
    )
}

export default Navbar