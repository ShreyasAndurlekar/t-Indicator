import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Route from './components/Route'; 
import Home from './components/Home';
import Chat from './components/Chat';
import Contribute from './components/Contribute';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const RouteDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="RoutesList" component={Route} options={() => ({ headerShown: false })} />
      <Drawer.Screen name="Chat" component={Chat} options={() => ({ headerShown: false })}/>
      <Drawer.Screen name="Contribute" component={Contribute} options={() => ({ headerShown: false })}/>
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={() => ({ headerShown: false })}
        />
        <Stack.Screen name="Pawar Nagar" component={RouteDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
