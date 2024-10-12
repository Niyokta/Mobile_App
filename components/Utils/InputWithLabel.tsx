import {View,Text,StyleSheet} from "react-native"
import { TextInput } from "react-native-gesture-handler"



export default function InputWithLabel({label}:any){
    return(
        <View style={styles.box}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input}/>
        </View>
    )
}

const styles=StyleSheet.create({
    box:{
        width:"100%",
    },
    label:{
        color:"#e9684b",
        fontWeight:"500"
    },
    input:{
        height:30,
        borderBottomColor:"#e9684b",
        borderBottomWidth:2,
        fontSize:14,
        paddingVertical:10

    }
})