import { Text, View, ScrollView, Pressable } from "react-native";
import styles from '../stylesheets/global'
import BottomBar from "./Bottom";
import {useState, useContext, useEffect} from 'react'
import { BusContext } from "../functions/bus";
import Bus from "./Bus";
import calculateTimestamps from "../functions/timesplitter.js"    
import { getTime } from "../functions/database"

const Route = () => {

    const {busStops} = useContext(BusContext)   // busStops retrieves the respective array of bus stops 
    const {busStop} = useContext(BusContext)    // Contains the current location of the bus if retrieved
    const {color} = useContext(BusContext)      // Contains the color of the bus
    const {eta} = useContext(BusContext)        // Contains the eta
    const {setETA} = useContext(BusContext)
    const {changeBusStop} = useContext(BusContext)
    // {} is used to destructure the object
  
  const [busstopcount, setBusstopcount] = useState(0);
  const [arrayOfTimeStamps, setArrayOfTimeStamps] = useState([]);
    
useEffect(() => {

if (eta) {
    
    let tempBusstopcount = 0;
    
    busStops.map((stop, idx) => {
      
      if (stop === busStop) {
        tempBusstopcount = idx;
//        console.log("Temp Busstopcount:", tempBusstopcount);
      }
    });

    setBusstopcount(tempBusstopcount);
    const timestamps = calculateTimestamps(eta, busStops.length - tempBusstopcount - 1);
    setArrayOfTimeStamps(timestamps);
    
    console.log("Immediate timestamps:", timestamps);
  }
}, [eta]);
   // React cannot update a component while rendering another component "Contribute",
        // Seems to re-render this component everytime I switch to Chat.jsx // Contribute.jsx
        // Need more explaination

   
    return(
        <View style = {styles.root}>
            <ScrollView style = {styles.sv}>
            {
            busStops.map((stop, idx) => (

                <View key = {idx} style = {{flexDirection: 'row'}}>

                    <View style = {styles.buspath}>

                        {stop === busStop && <Bus clr = {color}/>}

                    </View>

                    <Pressable  onPress={async () => {
                            
                            changeBusStop(stop)
                            const eta_ = await getTime(stop)
                            setETA(eta_)

                       }} style = {styles.busstop}>

                        <Text style = {styles.bstext}>
                            {stop}
                        </Text>
                        <Text>{ 
                        

                        idx >= busstopcount + 1 ? arrayOfTimeStamps[idx - busstopcount - 1] : ''
                          
                        }</Text> 
                    </Pressable>

                </View>
            ))
            
        }
            </ScrollView>
       
        <BottomBar />
        </View>
          )
}

export default Route
