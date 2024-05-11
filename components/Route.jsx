import { Text, View, ScrollView } from "react-native";
import styles from '../stylesheets/global'
import BottomBar from "./Bottom";

const Route = () => {

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

                    <View style = {styles.buspath}></View>
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