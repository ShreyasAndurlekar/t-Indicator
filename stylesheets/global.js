import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    root: {

        flex: 1
    },

    pnroute: {

        backgroundColor: 'lightgrey',
        width: 200,
        padding: 10,
        marginTop: 50,
        marginLeft: 20
    },

    sv: {

        marginTop: 30,
    },

    busstop: {

        marginTop: 30,
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

        height: 150,
        width: 200,
        marginTop: -50,
        marginBottom: -25,

    },

    big: {

        fontSize: 20
    },

    buspath: {

        height: '30',
        width: 10,
        backgroundColor: 'black',
        marginBottom: -30,
        marginLeft: 15
        
    }

})

export default styles