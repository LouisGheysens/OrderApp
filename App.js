import { StatusBar } from 'expo-status-bar';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigtor } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigtor();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}} />
      <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{headerShown: false}} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
