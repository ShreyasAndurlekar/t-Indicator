import { StyleSheet } from 'react-native';

const navbar_styles = StyleSheet.create({

    navbar: {

        flexDirection: 'row', 
        alignItems: 'center', 
        width: '100%',
        height: 100,
        backgroundColor: 'red',
    },

    textContainer: {
        flex: 1, 
        marginTop: 30
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
        marginTop: 30
    },

    
})

export default navbar_styles