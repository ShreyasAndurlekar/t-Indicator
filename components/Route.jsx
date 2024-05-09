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
            tmtBusStops.map((stop, idx) => (

                <View style = {styles.busstop}>
                    <Text key = {idx} style = {styles.bstext}>
                        {stop}
                    </Text>
                </View>
            ))
            
        }
            </ScrollView>
       
        <BottomBar />
        </View>
    )
}

export default Route