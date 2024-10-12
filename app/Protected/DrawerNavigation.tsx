import React,{useEffect} from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Mainpage from "./MainPage";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store"
const Drawer=createDrawerNavigator()

export default function DrawerNavigation(){
    const router=useRouter()
    const verifytoken=async()=>{
        const token=await SecureStore.getItemAsync('accessToken')
        if(!token){
            router.replace('/Signin')
            return
        }
        const tokenverification=await fetch("http://192.168.50.242:3000/auth/verifyToken",{
            method:'GET',
            headers:{
                'User-Agent':"Mobile",
                'authorization' : token
            }
        }).then((res)=>res.json())
        .then((res)=>{
            if(res.status!=="200"){
                reassignToken()
            }
        })
        .catch((err)=>{
            router.replace("/Signin")
        })
    }
    const reassignToken=async()=>{
        const refreshToken=await SecureStore.getItemAsync('refreshToken')
        if(!refreshToken){
            router.replace('/Signin')
            return
        }
        const reassignToken=await fetch("http://192.168.50.242:3000/auth/refreshToken",{
            method:'GET',
            headers:{
                'User-Agent':"Mobile",
                'authorization':refreshToken
            }
        }).then((res)=>res.json())
        .then(async(res)=>{
            if(res.status!=="200"){
                router.replace('/Signin')
                return
            }
            console.log("new access token : ",res)
            const newToken=await SecureStore.setItemAsync('accessToken',res.accessToken)
        })
        .catch((err)=>{
            router.replace("/Signin")
        })
    }
    useEffect(()=>{
        verifytoken()
    },[])
    return(
        <GestureHandlerRootView>
            <Drawer.Navigator>
            <Drawer.Screen name="MainPage" component={Mainpage}/>
            </Drawer.Navigator>
        </GestureHandlerRootView>
    )
}