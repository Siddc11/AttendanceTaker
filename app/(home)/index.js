import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Entypo, Ionicons, FontAwesome5, Octicons , MaterialCommunityIcons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';


const index = () => {

    const router = useRouter();
    return (
        <ScrollView>
            <LinearGradient colors={["#D8B5FF", '#6FD6FF']} style={{ flex: 1 }}>
                <View style={{ padding: 12 }}>
                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between" }}>
                        <Feather name="bar-chart" size={24} color="black" />
                        <Text style={{ fontSize: 20, fontWeight: "600" }}>Attendance Taker</Text>
                        <Entypo name="lock" size={24} color="black" />
                    </View>

                    <View style={{ marginTop: 30, alignItems:'center', justifyContent:"center"}}>

                    <Pressable
                        onPress={()=>
                          router.push("/(home)/markAttendance")
                        }
                     style={{ backgroundColor: "#A9F1DF", padding: 12, borderRadius: 6, alignItems: "center", justifyContent: 'center', height:190, width:250}}>
                            <View style={{ width: 70, height: 70, borderRadius: 25, backgroundColor: "white", alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesome5 name="marker" size={24} color="black" />
                            </View>
                            <Text style={{ marginTop: 7, fontWeight: "600" }}>Mark Attendance</Text>
                        </Pressable>

                        <Pressable 
                           onPress={()=> 
                            router.push("/(home)/students")
                         } 
                        style={{ backgroundColor: "#A9F1DF", padding: 12, borderRadius: 6, alignItems: "center", justifyContent: 'center', marginTop: 20, height: 190, width:250}}>
                            <View style={{ width: 70, height: 70, borderRadius: 25, backgroundColor: "white", alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons name="ios-people-sharp" size={24} color="black" />
                            </View>
                            <Text style={{ marginTop: 7, fontWeight: "600" }}>Student List</Text>
                        </Pressable>

                        

                    </View>

                    <View style={{marginTop:90, backgroundColor: "white", paddingHorizontal: 10 , paddingVertical: 10, borderRadius:7}}>
                        <Pressable 
                         onPress={()=>
                            router.push("/(home)/summary")
                          }
                        style={{backgroundColor:"#BE93C5", borderRadius:6, padding:10, flexDirection:"row", alignItems: "center", marginVertical:10 }}>
                            <View style={{padding:7, width:45, height: 45, borderRadius:7, backgroundColor:"white", alignItems:"center", justifyContent:"center"}}>
                            <Ionicons name="newspaper-outline" size={24} color="black" />
                            </View>
                            <Text style={{marginLeft:10, fontSize: 16, fontWeight: "600", flex: 1}}> Attendance Report</Text>
                            <View style={{width:35, height:35, borderRadius:7, backgroundColor:"white", alignItems:"center", justifyContent:"center"}}>
                                <Entypo name= 'chevron-right' size={24} color="black" />
                            </View>
                        </Pressable>

                     </View>
                        
                     <View style={{marginTop:75}}>

                        <View style={{backgroundColor:'#ABCABA', borderRadius:6, padding: 12, alignItems: 'center', justifyContent:"center"}}>
                            <View style={{width:35, height: 35, backgroundColor:'white', borderRadius:7, alignItems:'center', justifyContent:'center'}}>
                                 <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />
                            </View>
                            <Text style={{marginTop: 7}}>Designed and Developed with ❤️</Text>
                        </View>


                    </View>
                
            </View>
            </LinearGradient>
        </ScrollView>
    )
}

export default index

const styles = StyleSheet.create({})