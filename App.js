import { StatusBar } from 'expo-status-bar';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ResetPassword from './screens/ResetPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigtor } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";

const Stack = createNativeStackNavigtor();
const firebaseConfig = {
  apiKey: "AIzaSyBz628lZmDYTlhhVfrVFJUTIQJ86y_-48k",
  authDomain: "todoapp-f4140.firebaseapp.com",
  projectId: "todoapp-f4140",
  storageBucket: "todoapp-f4140.appspot.com",
  messagingSenderId: "871699626578",
  appId: "1:871699626578:web:048b5d6f042f30b6027d8b",
  measurementId: "G-JF37RF5ZS0"
};

const app = initializeApp(firebaseConfig);

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
      <Stack.Screen
      name="ResetPassword"
      component={ResetPassword}
      options={{headerShown: false}} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

