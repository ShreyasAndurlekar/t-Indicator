import BottomBar from "./Bottom"
import styles from '../stylesheets/global'
import { Text, View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {useState} from 'react'

const tmtBusStops = [
    "PAWAR NAGAR",
    "MUNICIPAL SCHOOL",
    "EDENWOOD",
    "LOKPURAM",
    "VASANT VIHAR",
    "JAWAHAR NAGAR",
    "GANDHI NAGAR",
    "VOLTAS COMPANY",
    "SUBHASH NAGAR",
    "OSWAL PARK",
    "MUKTAI NAGAR",
    "UTHALSAR",
    "COURTNAKA",
    "TALAO PALI",
    "THANE STATION"
  ];

const Contribute = () => {

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
                    tmtBusStops.map((stop) => (

                        <Picker.Item label={stop} value={stop} />

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
                    <Button title = "SUBMIT" />
                    <Button title = "USE LOCATION" />
                </View>
                
            </View>
            <BottomBar />
        </View>
    )
}

export default Contribute