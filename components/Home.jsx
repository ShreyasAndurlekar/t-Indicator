import { Text, Pressable, View, TextInput, ScrollView, Image } from 'react-native';
import styles from '../stylesheets/global';
import { useNavigation } from '@react-navigation/native';
import Navbar from './Navbar';
import { useState } from 'react';
import { tmtBusStops } from '../functions/extra';

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
