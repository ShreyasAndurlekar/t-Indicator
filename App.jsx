import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Route from './components/Route'
import Home from './components/Home'

const App = () => {

    const Stack = createNativeStackNavigator()
    
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home" 
              component={Home} 
              options={() => ({
                headerShown: false,
              })}
            />
            <Stack.Screen name="Route" component={Route} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    };

export default App