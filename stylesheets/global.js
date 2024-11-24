import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({

    body:{

        backgroundColor: 'rgba(255, 99, 71, 1)'
    },

    root: {

        flex: 1,

    },

    pnroute: {

        backgroundColor: 'lightgrey',
        width: 200,
        padding: 10,
        marginTop: 10,
        marginLeft: 20,

    },

    sv: {

        marginTop: 30,
    },

    busstop: {

        marginTop: Platform.OS === 'web' ? 30 : 10,
        marginLeft: 30,
        
    },

    bstext: {

        fontSize: 20
    },

    bottom: {

        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#edd328',
        justifyContent: 'space-evenly',
        padding: 15
    },

    icons: {

        height: 30,
        width: 30
    },

    cont : {

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        flexGrow: 1
    },

    picker: {

        height: 30,         // should be 150 for mobile
        width: 200,
        /*marginTop: -50,
        marginBottom: -25,*/

    },

    big: {

        fontSize: 20
    },

    buspath: {

        width: 10,
        backgroundColor: 'black',
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center'
        
    }

})

export default styles