import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    root: {

        flex: 1,
    },

    cb: {

        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    chatbar: {

        width: '100%',
        backgroundColor: 'green',
        height: 60,
        flexDirection: 'row'
    },

    ib: {

        flexGrow: 1,
        margin: 15,
        backgroundColor: 'white'


    },

    ic: {

        margin: 12,
        height: 35,
        width: 35,
    },

    cm: {

        padding: 10,
        backgroundColor: 'lightgray',
        margin: 10
        

    }
})

export default styles
