import { Text, View, ScrollView } from "react-native";
import styles from '../stylesheets/global'
import BottomBar from "./Bottom";
import {useState, useContext, useEffect} from 'react'
import { BusContext } from "../functions/bus";
import Bus from "./Bus";

const Route = () => {

    const {busStops} = useContext(BusContext)   // busStops is where the array is
    const {busStop} = useContext(BusContext)    // Assuming this is the part where the red highlight thing is
    const {color} = useContext(BusContext)
    

    // {} is used to destructure the object
    
    useEffect(() => { 
           
    })  // React cannot update a component while rendering another component "Contribute",
        // Therefore only update whenRoute is on screen.
      

    return(
        <View style = {styles.root}>
            <ScrollView style = {styles.sv}>
            {
            busStops.map((stop, idx) => (

                <View key = {idx} style = {{flexDirection: 'row'}}>

                    <View style = {styles.buspath}>

                        {stop === busStop && <Bus clr = {color}/>}

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