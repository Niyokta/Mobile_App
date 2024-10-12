// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from './Signin';
import Signup from './Signup';
import DrawerNavigation from './Protected/DrawerNavigation';
import { useEffect } from 'react';
import * as SecureStore from "expo-secure-store"
import { useRouter } from 'expo-router';
const Stack = createStackNavigator();


export default function StackLayout() {
  const router=useRouter()
  const verifylogin=async()=>{
    const token=await SecureStore.getItemAsync('accessToken')
    if(token){
      router.replace('/Protected/DrawerNavigation')
    }
  }
  useEffect(()=>{
    verifylogin()
  })
  return (
    <GestureHandlerRootView>
      <Stack.Navigator initialRouteName='Signin' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Signin' component={Signin} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Protected/DrawerNavigation' component={DrawerNavigation}/>
      </Stack.Navigator>
    </GestureHandlerRootView>
  )
}