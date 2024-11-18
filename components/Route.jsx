import { Text, View, ScrollView } from "react-native";
import styles from '../stylesheets/global'
import BottomBar from "./Bottom";
import {useState, useContext, useEffect} from 'react'
import { BusContext } from "../functions/bus";
import Bus from "./Bus";

const Route = () => {

    const {busStops} = useContext(BusContext)   // busStops retrieves the respective array of bus stops 
    const {busStop} = useContext(BusContext)    // Contains the current location of the bus if retrieved
    const {color} = useContext(BusContext)      // Contains the color of the bus
    const {eta} = useContext(BusContext)        // Contains the eta
    

    // {} is used to destructure the object
    
    useEffect(() => {

      console.log(eta)
           
    })  // React cannot update a component while rendering another component "Contribute",
        // Seems to re-render this component everytime I switch to Chat.jsx // Contribute.jsx
        // Need more explaination 
      
      
    const createTimings(eta) => {

        // get current time
        // add time to eta
      // get no of bus stops remaining divide eta of tie bus stop / no of bus stops
      // return array
    }

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

                        <Text>{eta}</Text> // Need to work on this eta variable
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
