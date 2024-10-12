import React from "react";
import {View,Text} from "react-native"
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SigninBox } from "@/components";

export default function Signin(){
    const router=useRouter()
    const {top,bottom}=useSafeAreaInsets()
    return(
        <SigninBox/>
    )
}