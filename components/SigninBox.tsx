import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import  * as SecureStore from "expo-secure-store"
import { parseSync } from "@babel/core";



export default function SigninBox() {
    const [error,seterror]=useState("")
    const [usercredentials,setusercredentials]=useState({
        username:"",
        password:""
    })
    const router=useRouter()
    async function handlelogin() {
        const loginstatus = await fetch("http://192.168.50.242:3000/auth/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mobile',
            },
            body: JSON.stringify({
                username: usercredentials.username,
                password: usercredentials.password
            })
        }).then((res) => res.json())
            .then(async(res) => {
                if(res.status==="200"){
                    await SecureStore.setItemAsync('accessToken',res.accessToken)
                    await SecureStore.setItemAsync('refreshToken',res.refreshToken)
                    router.replace('/Protected/DrawerNavigation')
                }
                else{
                    seterror(res.message)
                }
            })
            .catch((err) => {
                console.log("error : ", err)
            })

    }

    const { top, bottom } = useSafeAreaInsets()
    return (
        <View style={styles.main_box}>
            <Text style={styles.errormessage}>{error}</Text>
            <View style={styles.box}>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input}  onChangeText={(val)=>{
                    seterror("")
                    setusercredentials({...usercredentials,username:val})
                }}/>
            </View>
            <View style={styles.box}>
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} onChangeText={(val)=>{
                    seterror("")
                    setusercredentials({...usercredentials,password:val})
                }}/>
            </View>
            <TouchableOpacity style={styles.button} onPress={handlelogin}>
                <Text style={styles.button_text}>
                    Log In
                </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    main_box: {
        width: 300,
        height: 400,
        backgroundColor: "white",
        opacity: 0.7,
        marginHorizontal: "auto",
        marginVertical: "auto",
        borderRadius: 10,
        padding: 20
    },
    box: {
        width: "100%",
        marginVertical: 20
    },
    label: {
        fontWeight: "500",
        fontSize: 13
    },
    input: {
        height: 40,
        borderBottomWidth: 2,
        fontSize: 14,
    },
    button: {
        backgroundColor: "#D55134",
        width: 120,
        height: 45,
        borderRadius: 5,
        marginHorizontal: "auto",
        marginVertical: 20
    },
    button_text: {
        marginHorizontal: "auto",
        marginVertical: "auto",
        fontWeight: "bold",
        color: "white",
        fontSize: 15
    },
    errormessage:{
        color:"red",
        fontWeight:"bold",
        fontSize:14
    }
})