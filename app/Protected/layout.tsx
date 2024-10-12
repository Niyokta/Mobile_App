import React, { Children, useEffect } from "react"
import { SafeAreaView } from "react-native"
import * as SecureStore from "expo-secure-store"
import { useRouter } from "expo-router"
export default function ProtectedLayout(){
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
                'user-agent':"Mobile",
                'authorization' : token
            }
        }).then((res)=>res.json())
        .then((res)=>{
            console.log("token verification : ",res)
            if(res.status!=="200"){
                router.replace('/Signin')
            }
        })
    }
    useEffect(()=>{
        verifytoken()
    },[])
    return(
        <>
        hi
        {Children}
        </>
    )
}