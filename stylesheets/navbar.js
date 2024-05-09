import { StyleSheet } from 'react-native';

const navbar_styles = StyleSheet.create({

    navbar: {

        flexDirection: 'row', 
        alignItems: 'center', 
        width: '100%',
        height: 70,
        backgroundColor: 'red',
    },

    textContainer: {
        flex: 1, 
    },

    navtext: {

        textAlign: 'center',
        fontSize: 20,
        marginLeft: 20,
       
    },

    navicon : {

        marginRight: 10,
        width: 40,
        height: 40,
    },

    mini: {

        height: 21,
        backgroundColor: 'rgba(255, 99, 71, 1)'
    }

    
})

export default navbar_styles