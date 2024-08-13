import BottomBar from "./Bottom"
import styles from '../stylesheets/global'
import { Text, View, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {useState, useContext} from 'react'
import { BusContext } from "../functions/bus";
import * as Location from 'expo-location';
import { getNearestLoc } from '../functions/database'
import alert from './Alert'

const Contribute = () => {

    const {changeBusStop} = useContext(BusContext)
    const {busStops} = useContext(BusContext)
    const {setColor} = useContext(BusContext)

    const [selectedBus, setSelectedBus] = useState("red")
    const [selectedStop, setSelectedStop] = useState("Pawar Nagar")

    const getLocation = async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {

              console.error('Permission to access location was denied');
              return;

            }
        
            let location = await Location.getCurrentPositionAsync({});
            const newloc = location.coords.latitude + ", " +  location.coords.longitude
            const nearestLoc = await getNearestLoc(newloc)

            let ok = 0

            for(var i = 0; i < busStops.length; i++){

                if(nearestLoc == busStops[i])
                    ok = 1
            }

            if(ok == 0){

                alert('Error', `Nearest place is ${nearestLoc}`, [        // I forget the tilted inverted commas
                            
                    {text: 'OK', onPress: () => console.log('')},
                  
                ]);
            }
            else
                changeBusStop(nearestLoc)

    }

    return(
        <View style = {styles.root}>
            <View style = {styles.cont}>

                <Text style = {styles.big}>Which bus?</Text>

                <Picker selectedValue={selectedBus} 
                        onValueChange={(itemValue) => {
                            
                            setSelectedBus(itemValue)
                            setColor(itemValue)
                        
                        }}
                        style = {styles.picker}
                >
                    <Picker.Item label="Yellow Bus" value="yellow" />
                    <Picker.Item label="Red Bus" value="red" />
                    <Picker.Item label="AC Bus" value="white" />

                </Picker>

                <Text style = {styles.big}>Recently Passed Stop</Text>

                <Picker selectedValue={selectedStop} 
                        onValueChange={(itemValue) => {
                            
                            setSelectedStop(itemValue)
                            changeBusStop(itemValue)
                           
                        }}
                        style = {styles.picker}>
                
                {
                    busStops.map((stop, idx) => (

                        <Picker.Item label={stop} value={stop} key = {idx} />

                    ))
                }

                </Picker>

                <View style = {{flexDirection: 'row', gap: 20}}> 
                    <Button title = "USE LOCATION" onPress={getLocation} />
                </View>
                
            </View>
            <BottomBar />
        </View>
    )
}

export default Contribute