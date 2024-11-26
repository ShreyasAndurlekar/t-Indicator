import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Route from './components/Route'; 
import Home from './components/Home';
import Chat from './components/Chat';
import Account from './components/Account';
import { BusContext } from './functions/bus';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { tmtBusStops } from './functions/extra';
import { Platform } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; // Import SplashScreen

const Drawer = createDrawerNavigator();

const RouteDrawer = ({ route }) => {
  const { busRoute } = route.params; 

  const [busStop, changeBusStop] = useState("Pawar Nagar"); 
  const [busStops, changeBusStops] = useState([]);
  const [color, setColor] = useState("red");
  const [eta, setETA] = useState();

  useEffect(() => {
    changeBusStops(tmtBusStops[busRoute]);
  }, [busRoute]);

  return (
    <BusContext.Provider value={{ busStop, busStops, changeBusStop, setColor, color, eta, setETA }}>
      <Drawer.Navigator>
        <Drawer.Screen name="RoutesList" component={Route} options={() => ({ headerShown: false })} />
        <Drawer.Screen name="Chat" component={Chat} options={() => ({ headerShown: false })} />
      </Drawer.Navigator>
    </BusContext.Provider>
  );
};

const App = () => {
  const [fontsLoaded] = useFonts({
    "Bahnschrift": require("./assets/fonts/BAHNSCHRIFT.ttf"),
    "Futura": require('./assets/fonts/Futura Condensed Medium.otf')
  });

  useEffect(() => {
    const activateServer = async () => {
      try {
        await axios.get('https://userdetails-five.vercel.app');
      } catch (error) {
        console.error('Error activating server:', error.message);
      }
    };
    activateServer();
  }, []);

  useEffect(() => {
    const prepare = async () => {
      // Keep the splash screen visible while fonts are loading
      await SplashScreen.preventAutoHideAsync();  // Prevent auto hide
    };

    prepare();
  }, []);

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
      }
    };

    hideSplashScreen();
  }, [fontsLoaded]);

  const Stack = createNativeStackNavigator();

  if (!fontsLoaded) {
    return null; // Return null until the fonts are loaded, showing the splash screen
  }

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="red" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Route"
          component={RouteDrawer}
          options={{
            headerStyle: { backgroundColor: 'red' },
            headerBackImageSource: Platform.OS === 'web' ? require('./assets/back-icon.png') : undefined,
            title: ''
          }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerStyle: { backgroundColor: 'red' },
            headerBackImageSource: Platform.OS === 'web' ? require('./assets/back-icon.png') : undefined,
            title: ''
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
