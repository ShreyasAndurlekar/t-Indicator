import { Text, View, ScrollView } from "react-native";
import styles from '../stylesheets/global'

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
        <View>
            <ScrollView style = {styles.sv}>
            {
            tmtBusStops.map((stop) => (

                <View style = {styles.busstop}>
                    <Text style = {styles.bstext}>
                        {stop}
                    </Text>
                </View>
            ))
            
        }
            </ScrollView>
       
        {/*<BottomBar>
        </BottomBar>*/}
        </View>
    )
}

export default Route