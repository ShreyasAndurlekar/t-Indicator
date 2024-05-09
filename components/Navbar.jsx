import { View, Text, Image, TouchableOpacity } from "react-native"
import navbar_styles from '../stylesheets/navbar'

const Navbar = () => {

    const icon = require('../assets/user.png')

    return(
        <View>
            <View style = {navbar_styles.mini}>
                </View>
                <View style={navbar_styles.navbar}>
                <View style={navbar_styles.textContainer}>
                    <Text style={navbar_styles.navtext}>
                        TMT App
                    </Text>
                </View>
                <TouchableOpacity onPress = { console.log()}>
                    <Image source={icon} style={navbar_styles.navicon} />
                </TouchableOpacity>
            </View>
       </View>
    )
}

export default Navbar