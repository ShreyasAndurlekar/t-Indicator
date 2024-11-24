import { createContext } from "react";
import * as Location from 'expo-location';
import { getNearestLoc } from '../functions/database'

export const getLocation = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {

      console.error('Permission to access location was denied');
      return;

    }

    let location = await Location.getCurrentPositionAsync({});
    const newloc = location.coords.latitude + ", " +  location.coords.longitude
    const nearestLocBody = await getNearestLoc(newloc)

    setETA(nearestLocBody.timeAndDistance)
    
    const nearestLoc = nearestLocBody.nearest
    let ok = 0

    for(var i = 0; i < busStops.length; i++){

        if(nearestLoc == busStops[i])
            ok = 1
    }

    if(ok == 0){

        alert('TMT is restricted to Thane only!', `Nearest bus stop is ${nearestLoc}`, [
          // I forget the tilted inverted commas
                    
            {text: 'OK', onPress: () => console.log('')},
          
        ]);
    }
    else
        changeBusStop(nearestLoc)

}


export const BusContext = createContext({})