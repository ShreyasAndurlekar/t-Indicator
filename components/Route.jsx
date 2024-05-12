import { Text, View, ScrollView } from "react-native";
import styles from '../stylesheets/global'
import BottomBar from "./Bottom";
import {useState, useContext, useEffect} from 'react'
import { BusContext } from "../functions/bus";
import Bus from "./Bus";

const Route = () => {

    const {busStop} = useContext(BusContext)
    const [buz, renderBus] = useState(false)

    useEffect(() => { })   // React cannot update a component while rendering another component "Contribute",
                            // Therefore only update whenRoute is on screen.

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
      

    return(
        <View style = {styles.root}>
            <ScrollView style = {styles.sv}>
            {
            tmtBusStops.map((stop) => (

                <View style = {{flexDirection: 'row'}}>

                    <View style = {styles.buspath}>

                        {stop === busStop && <Bus />}

                    </View>

                    <View style = {styles.busstop}>
                        <Text style = {styles.bstext}>
                            {stop}
                        </Text>
                    </View>

                </View>
            ))
            
        }
            </ScrollView>
       
        <BottomBar />
        </View>
    )
}

export default Route