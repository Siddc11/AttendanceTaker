import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SearchResults from '../../components/searchResults';


const students = () => {

    const [students, setStudents] = useState([]);
    const [input, setInput] = useState("");
    const router = useRouter();
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get("http://192.168.1.104:8000/students");
                setStudents(response.data);
            } catch (error) {
                console.log("error fetching the students data", error)
            }
        }
        fetchStudentData();
    }, [])
    console.log(students);
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
                <Ionicons style={{ marginLeft: 10 }} name='arrow-back' size={24} color="black" />
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, backgroundColor: 'white', gap: 10, height: 40, borderRadius: 4, flex: 1 }}>
                    <AntDesign name='search1' size={20} color="black" />
                    <TextInput value={input} onChange={(text) => setInput(text)} style={{ flex: 1 }} placeholder='Search' />

                    {
                        students.length > 0 && (
                            <View>
                                <Pressable onPress={() => router.push("/(home)/addDetails")} >
                                    <AntDesign name="pluscircle" size={24} color="#0072b1" />
                                </Pressable>
                            </View>
                        )
                    }
                </Pressable>
            </View>

            {
                students.length > 0 ? (
                    <SearchResults data={students} input={input} setInput={setInput} />
                ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text> No Data Found</Text>
                        <Text> Press on the plus button to add the Student data</Text>
                        <Pressable onPress={() => router.push("/(home)/addDetails")}>
                            <AntDesign style={{ marginTop: 30 }} name="pluscircle" size={24} color="black" />
                        </Pressable>
                    </View>
                )
            }
        </View>
    );
};

export default students

const styles = StyleSheet.create({})