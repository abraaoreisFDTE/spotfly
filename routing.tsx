import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlaylistPage } from './pages';
const Stack = createNativeStackNavigator();

const Routing = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="playlist" component={PlaylistPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routing