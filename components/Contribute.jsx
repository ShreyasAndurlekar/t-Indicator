import BottomBar from "./Bottom"
import styles from '../stylesheets/global'
import { Text, View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {useState, useContext} from 'react'
import { BusContext } from "../functions/bus";

const Contribute = () => {

    const {changeBusStop} = useContext(BusContext)
    const {busStops} = useContext(BusContext)

    const [selectedBus, setSelectedBus] = useState("Yellow Bus")
    const [selectedStop, setSelectedStop] = useState("Pawar Nagar")
    const [selectedOption, setSelectedOption] = useState("No")

    return(
        <View style = {styles.root}>
            <View style = {styles.cont}>

                <Text style = {styles.big}>Which bus?</Text>

                <Picker selectedValue={selectedBus} 
                        onValueChange={(itemValue) => setSelectedBus(itemValue)} 
                        style = {styles.picker}
                >
                    <Picker.Item label="Yellow Bus" value="y" />
                    <Picker.Item label="Red Bus" value="r" />
                    <Picker.Item label="AC Bus" value="a" />

                </Picker>

                <Text style = {styles.big}>Recently Passed Stop</Text>

                <Picker selectedValue={selectedStop} 
                        onValueChange={(itemValue) => setSelectedStop(itemValue)} 
                        style = {styles.picker}>
                
                {
                    busStops.map((stop, idx) => (

                        <Picker.Item label={stop} value={stop} key = {idx} />

                    ))
                }

                </Picker>

                <Text style = {styles.big}>Ride Over?</Text>

                <Picker selectedValue={selectedOption} 
                        onValueChange={(itemValue) => setSelectedOption(itemValue)} 
                        style = {styles.picker}
                >

                    <Picker.Item label="No" value="n" />
                    <Picker.Item label="Yes" value="y" />

                </Picker>

                <View style = {{flexDirection: 'row', gap: 20}}> 
                    <Button title = "SUBMIT" onPress = 
                    
                    {

                        changeBusStop(selectedStop)
                    }/>
                    <Button title = "USE LOCATION" />
                </View>
                
            </View>
            <BottomBar />
        </View>
    )
}

export default Contribute