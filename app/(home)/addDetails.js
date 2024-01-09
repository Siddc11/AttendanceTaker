import { StyleSheet, Text, View, ScrollView , Pressable, TextInput, Alert} from 'react-native'
import React,{useState} from 'react'
import axios from 'axios';

const addDetails = () => {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [prn, setPrn] = useState("");
    const [division, setDivision] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");

    const handleRegister=()=>{
       const studentData ={
        studentId: id,
        studentName: name,
        studentPRN: prn, 
        studentClass: division,
        contactNumber: contact,
        email: email,
       };
         axios.post("http://192.168.1.104:8000/addStudent", studentData).then((response)=>{
            Alert.alert("Registration Successfull !!","of the Student has been registered Successfully");
        
      setId("");
      setName("");
      setPrn("");
      setDivision("");
      setContact("");
      setEmail("");
    }).catch((error)=>{
         Alert.alert("Registration Failed");
         console.log("error during registration ", error)
    })
};

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ padding: 10 }}>
                <View style={{alignItems:"center", justifyContent:"center", marginTop: 10}}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Add a new Student</Text>
                </View>

                <View style={{ marginVertical: 30 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Student ID</Text>
                    <TextInput 
                         value={id} 
                         onChangeText={(text)=>setId(text)}
                    style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} placeholder='Enter the Id of student' placeholderTextColor={"black"} />
                </View>

                <View style={{ marginVertical: 5 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Full Name of Student</Text>
                    <TextInput value={name} 
                         onChangeText={(text)=>setName(text)}
                    style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} placeholder='Enter the Student Name' placeholderTextColor={"black"} />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Student PRN </Text>
                    <TextInput 
                       value={prn} 
                       onChangeText={(text)=>setPrn(text)}
                    style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} placeholder='Enter the PRN of Student' placeholderTextColor={"black"} />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Year and Division </Text>
                    <TextInput 
                        value={division} 
                        onChangeText={(text)=>setDivision(text)}
                    style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} placeholder='Enter the year and division student studing in' placeholderTextColor={"black"} />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Contact Number </Text>
                    <TextInput 
                        value={contact} 
                        onChangeText={(text)=>setContact(text)}
                    style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} placeholder='Enter Phone number of student' placeholderTextColor={"black"} />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Email Address </Text>
                    <TextInput
                       value={email} 
                       onChangeText={(text)=>setEmail(text)}
                    style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} placeholder='Enter the emai id of Student' placeholderTextColor={"black"} />
                </View>

           <Pressable 
             onPress={handleRegister}
           style={{backgroundColor:"#ABCABA", padding: 10, marginTop: 20, justifyContent:"center", alignItems: "center", borderRadius:8}}>
            <Text style={{fontSize:18 , fontWeight:"bold", color:'black'}}>Add Student</Text>
           </Pressable>

            </View>
        </ScrollView>
    )
}

export default addDetails

const styles = StyleSheet.create({})