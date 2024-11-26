import { StyleSheet } from 'react-native';

const navbar_styles = StyleSheet.create({

    navbar: {

        flexDirection: 'row', 
        alignItems: 'center', 
        width: '100%',
        height: 90,
        backgroundColor: 'red',
    },

    textContainer: {
        flex: 1, 
        marginTop: 20
    },

    navtext: {

        fontSize: 20,
        marginLeft: 10,
        fontFamily: 'Bahnschrift'
       
    },

    navicon : {

        marginRight: 10,
        width: 40,
        height: 40,
        marginTop: 20
    },

    
})

export default navbar_styles