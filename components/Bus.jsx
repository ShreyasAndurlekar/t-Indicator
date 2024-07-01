import { View } from 'react-native';


function Bus(props) {
  return (
    <View style = {{

        height: 20,
        width: 20,
        backgroundColor : props.clr,
        borderRadius: 20

    }}>

    </View>
  )
}

export default Bus