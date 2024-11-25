import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Route from './components/Route'; 
import Home from './components/Home';
import Chat from './components/Chat';
import Account from './components/Account'
import { BusContext } from './functions/bus';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { tmtBusStops } from './functions/extra';
import { Platform } from 'react-native';


// IMPORTANT REGARDING NAVIATION LIBRARY.

// you need to add the react-native-screens and react-native-safe-area-context dependency when using navigation dependency as well otherwise apk won't work
// Set a property called  "androidStatusBar": {"translucent": true } in app.json. I think you can use StatusBar dependency as well but just in case it fails, I can't be bothered to make another apk and it worked acc to one guy on stackoverflow

const Drawer = createDrawerNavigator();

const RouteDrawer = ({ route }) => {

  const { busRoute } = route.params; // Accessing selected bus route from Home Screen

  // These are all the variables that need to be passed b/w Route.jsx and Contribute.jsx

  const [busStop, changeBusStop] = useState("Pawar Nagar"); // glowy thing
  const [busStops, changeBusStops] = useState([]);
  const [color, setColor] = useState("red")
  const [eta, setETA] = useState()   

  // Need to convert busStop, color and eta into an object 
 
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

  useEffect(() => {
    
    const activateServer = async () => {
      try {
        await axios.get('https://userdetails-five.vercel.app')
      } catch (error) {
        console.error('Error activating server:', error.message);
      }
    };
  
    // Vercel spins down with inactivity
    activateServer()    

}, [0]);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <StatusBar translucent backgroundColor="transparent"/>
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

                headerStyle: {
                    backgroundColor: 'red', 
                  },

                headerBackImageSource: Platform.OS === 'web' ? require('./assets/back-icon.png') : undefined,                  
                }}
                  
            />
            <Stack.Screen
                name="Account"
                component={Account}
                options={{

                  headerStyle: {
                      backgroundColor: 'red', 
                    },
  
                  headerBackImageSource: Platform.OS === 'web' ? require('./assets/back-icon.png') : undefined,
                    }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);
};

export default App;
