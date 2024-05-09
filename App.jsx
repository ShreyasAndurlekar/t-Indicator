import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Route from './components/Route'; // Assuming Route component exports necessary screens
import Home from './components/Home';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const RouteDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Route" component={Route} options={() => ({ headerShown: false })} />
      <Drawer.Screen name="Chat" component={Chat} options={() => ({ headerShown: false })}/>
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
        <Stack.Screen name="Route" component={RouteDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
