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
        backgroundColor: '#edd328',
        height: 60,
        flexDirection: 'row'
    },

    ib: {

        flexGrow: 1,
        margin: 12,
        backgroundColor: 'white',
        borderRadius: 10


    },

    ic: {

        margin: 12,
        height: 35,
        width: 35,
        
    },

    overallcm: {

        flexDirection: 'column',
        backgroundColor: 'lightgray',
        margin: 10
    },

    user: {

        padding: 5,  
        color: '#731003',
        fontWeight: 'bold'
        
    },

    cm: {
        padding: 1, 
        paddingRight: 40,
        paddingLeft: 5,
        paddingBottom: 5  
    }
    ,

    leftAligned: {
        alignSelf: 'flex-start',
      },
      
    rightAligned: {
        alignSelf: 'flex-end',
    },

    time:{

        padding: 5, 
        alignSelf: 'flex-end',
        fontSize: 10,

    }
      

})

export default styles
