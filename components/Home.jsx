import { Text, Pressable, View, TextInput, ScrollView, Image } from 'react-native';
import styles from '../stylesheets/global';
import { useNavigation } from '@react-navigation/native';
import Navbar from './Navbar';
import { useState } from 'react';

const BusStop = ({ busRouteNo, busName }) => {
    const navigation = useNavigation();
    return (
        <Pressable
            style={styles.pnroute}
            onPress={() => {
                navigation.navigate("Route", { busRoute: busRouteNo });
            }}
        >
            <Text style={styles.routestext}>{busName}</Text>
        </Pressable>
    );
};

const Home = () => {
    const [searchText, setSearchText] = useState('');
    
    const tmtBusStops = [
        [
            "PAWAR NAGAR",
            "MUNICIPAL SCHOOL",
            "EDENWOOD",
            "LOKPURAM",
            "VASANT VIHAR",
            "JAWAHAR NAGAR",
            "GANDHI NAGAR",
            "VOLTAS",
            "SUBHASH NAGAR",
            "OSWAL PARK",
            "MAJIWADA NAKA",
            "MUKTAI NAGAR",
             "GOKUL NAGAR", 
           "UTHALSAR NAKA",  
           "CIVIL HOSPITAL", 
            "CENTRAL MAIDAN",
            "COURTNAKA",
            "TALAO PALI",
            "THANE STATION"
        ],
        [
          "ANAND NAGAR",
          "VIJAY NAGARI",
          "WAGHBIL",
          "DONGRI PADA",
          "PATLI PADA",
          "AZAD NAGAR",
          "MULLA BAGH",
          "MANPADA",
          "LOCKIM COMPANY",
          "HIDE PARK",
          "KAPURBAWDI",
          "ASHAPURA MANDIR",
          "MAJIWADA",
          "MUKTAI NAGAR",
          "GOKUL NAGAR",
          "CENTRAL MAIDAN",
          "COURT NAKA",
          "CIVIL COURT",
          "TALAV PALI",
          "THANE STATION"
          ],
          [ "VRUNDAVAN SOCIETY",
            "SHREERANG SOCIETY",
            "DESAI BANGLA",
            "ABHIRUCHI",
            "HOLY CROSS SCHOOL",
            "POLICE LINE",
            "CENTRAL MAIDAN",
            "COURT NAKA",
            "CIVIL COURT",
            "TALAV PALI",
            "THANE STATION"
          ],
          ["BORIVADE GAON",
            "VIJAY NAGARI",
          "WAGHBIL",
          "DONGRI PADA",
          "PATLI PADA",
          "AZAD NAGAR",
          "MULLA BAGH",
          "MANPADA",
          "LOCKIM COMPANY",
          "HIDE PARK",
          "KAPURBAWDI",
          "ASHAPURA MANDIR",
          "MAJIWADA",
          "MUKTAI NAGAR",
          "GOKUL NAGAR",
          "CENTRAL MAIDAN",
          "COURT NAKA",
          "CIVIL COURT",
          "TALAV PALI",
          "THANE STATION"],
          [ "KASARVADAVALI",
            "SAINATH NAGAR",
            "ANAND NAGAR",
            "MUCHHALA COLLEGE",
            "BATATA COMPANY",
            "PANCHAMRIT",
          "WAGHBIL",
          "DONGRI PADA",
          "PATLI PADA",
          "AZAD NAGAR",
          "MULLA BAGH",
          "MANPADA",
          "LOCKIM COMPANY",
          "HIDE PARK",
          "KAPURBAWDI",
          "ASHAPURA MANDIR",
          "MAJIWADA",
          "MUKTAI NAGAR",
          "GOKUL NAGAR",
          "CENTRAL MAIDAN",
          "COURT NAKA",
          "CIVIL COURT",
          "TALAV PALI",
          "THANE STATION"],
          [ "PARSIK NAGAR",
            "VASTU ANAND",
            "VIMAL NAGAR",
            "RAJ PARK",
            "PREM NAGAR",
            "PARSIK SHIV MANDIR",
            "KHARIGAON NAKA",
            "DATTA WADI",
            "SUKUR PARK",
            "SAHYADRI SOCIETY",
            "MANISHA NAGAR",
            "KALWA BUS STATION",
            "COURT NAKA",
            "KANHAJI AGRH CHOWK",
            "R.T.O OFFICE",
            "CENTRAL MAIDAN",
            "COURT NAKA",
            "THANE STATION"],
            ["WAGHBIL",
          "DONGRI PADA",
          "PATLI PADA",
          "AZAD NAGAR",
          "MULLA BAGH",
          "MANPADA",
          "LOCKIM COMPANY",
          "HIDE PARK",
          "KAPURBAWDI",
          "ASHAPURA MANDIR",
          "MAJIWADA",
          "MUKTAI NAGAR",
          "GOKUL NAGAR",
          "CENTRAL MAIDAN",
          "COURT NAKA",
          "CIVIL COURT",
          "TALAV PALI",
          "THANE STATION"],
          [ "UPVAN",
            "SHIVAI NAGAR",
            "DEVDAYA NAGAR",
            "S.T. JUNA THAMBA",
            "BUILDING NO. 3",
            "VARTAK NAGAR",
            "J.K. GRAM",
            "CADBURY CO.",
            "PUJANI ESTATE",
            "KHOPAT",
            "NEW SHAKTI MILL",
            "SHISHU GYAN MANDIR",
            "CIVIL HOSPITAL",
            "CENTRAL MAIDAN",
            "COURT NAKA",
            "THANE STATION"]
    ];

    const busStops = [
        "PAWAR NAGAR", "ANAND NAGAR", "VRUNDAVAN SOCIETY", "BORIVADE GAON", 
        "KASARVADAVALI", "PARSIK NAGAR", "WAGHBIL", "UPVAN"
    ];

    const filteredBusStops = busStops
        .map((busName, index) => ({ busName, busRouteNo: index }))
        .filter(({ busName, busRouteNo }) => 
            !searchText || 
            tmtBusStops[busRouteNo].some(stop => stop.toLowerCase().includes(searchText.toLowerCase()))
        );

    /*<View style = {{flex: 1, alignItems: 'center'}}>
    <View style={{ flex: 1 , width: 500, borderWidth: 3}}>*/

    const searchicon = require('../assets/search.png')

    return (
        <View style = {{flex: 1}}>
            <Navbar />
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 12, borderWidth: 1, borderColor: 'lightgrey', padding: 5 }}>
                    <TextInput
                        style={{ flex: 1, padding: 10, color: 'black' }}
                        placeholder="Search"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <Image
                        source={searchicon} 
                        style={{ width: 20, height: 20, tintColor: 'gray' }}
                    />
                </View>
            <ScrollView>
                {filteredBusStops.map(({ busName, busRouteNo }) => (
                    <BusStop key={busRouteNo} busRouteNo={busRouteNo} busName={busName} />
                ))}
            </ScrollView>
        </View>
       
    );
};

export default Home;
