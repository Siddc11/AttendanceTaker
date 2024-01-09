    /* import { Pressable, StyleSheet, Text, View } from 'react-native'
    import React, { useState, useEffect } from 'react'
    import moment from 'moment';
    import axios from 'axios';
    import { AntDesign } from '@expo/vector-icons';

    const markAttendance = () => {

        const [currentDate, setCurrentDate] = useState(moment());
        const goToNextDay = () => {
            const nextDate = moment(currentDate).add(1, "days");
            setCurrentDate(nextDate);
        }

        const goToPrevDay = () => {
            const prevDate = moment(currentDate).subtract(1, "days");
            setCurrentDate(prevDate);
        }

        const formatDate = (date) => {
            return date.format("MMMM D, YYYY");
        }

        const [students, setStudents] = useState([]);
        useEffect(() => {
            const fetchStudentData = async () => {
                try {
                    const response = await axios.get("http://192.168.0.103:8000/students");
                    setStudents(response.data);
                } catch (error) {
                    console.log("error fetching the students data", error)
                }
            }
            fetchStudentData();
        }, [])

        const [attendance, setAttendance] = useState([]);
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get(`http://192.168.0.103:8000/attendance`, {
                    params: {
                        date: currentDate.format("MMMM D,YYYY")
                    }
                });
                setAttendance(response.data)
            } catch (error) {
                console.log("error while fetching the data", error);
            }
        };
        useEffect(() => {
            fetchAttendanceData();
        }, [currentDate])

        return (
            <View style={{ backgroundColor: 'white' }}>
                <Pressable>
                    <View style={{ flexDirection: "row", alignItems: 'center', gap: 10, marginLeft: 'auto', marginRight: "auto", marginVertical: 20 }}>
                        <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
                        <Text>{formatDate(currentDate)}</Text>
                        <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
                    </View>

            //Map the students
                    <View style={{ marginHorizontal: 12 }}>
                        {students.map((item, index) => (

                            <Pressable key = {index} style={{flexDirection:'row', alignItems:"center", gap:10}}>
                                    <View style={{ width: 50, height: 50, padding: 10, backgroundColor: '#4b6cb7', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 16 }}>{item?.studentName?.charAt(0)}</Text>
                                    </View>

                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item?.studentName}</Text>
                                        <Text style={{ marginTop: 5, color: "grey" }}>Id: {item?.studentId} - PRN: ({item?.studentPRN})</Text>
                                    </View>
                            </Pressable>

                        ))}


                    </View>
                </Pressable>
            </View>
        )
    }

    export default markAttendance

    const styles = StyleSheet.create({}) */

    import React, { useState, useEffect } from 'react';
    import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
    import moment from 'moment';
    import axios from 'axios';
    import { AntDesign } from '@expo/vector-icons';

    
    const MarkAttendance = () => {
      const [currentDate, setCurrentDate] = useState(moment());
      const [students, setStudents] = useState([]);
      const [attendance, setAttendance] = useState([]);
    
      useEffect(() => {
        const fetchStudentData = async () => {
          try {
            const response = await axios.get('http://192.168.1.104:8000/students');
            setStudents(response.data);
          } catch (error) {
            console.log('Error fetching the students data', error);
          }
        };
        fetchStudentData();
      }, []);
    
      useEffect(() => {
        const fetchAttendanceData = async () => {
          try {
            const response = await axios.get(`http://192.168.1.104:8000/attendance`, {
              params: {
                date: currentDate.format('MMMM D,YYYY'),
              },
            });
    
            const initialAttendance = students.map((student) => {
              const presentStudent = response.data.find((attendance) => attendance.studentId === student.studentId);
              return {
                studentId: student.studentId,
                isPresent: presentStudent ? presentStudent.isPresent : true,
              };
            });
            setAttendance(initialAttendance);
          } catch (error) {
            console.log('Error while fetching the data', error);
          }
        };
        fetchAttendanceData();
      }, [currentDate, students]);
    
      const formatDate = (date) => {
        return date.format('MMMM D, YYYY');
      };
    
      const goToNextDay = () => {
        const nextDate = moment(currentDate).add(1, 'days');
        setCurrentDate(nextDate);
      };
    
      const goToPrevDay = () => {
        const prevDate = moment(currentDate).subtract(1, 'days');
        setCurrentDate(prevDate);
      };
    
      const toggleAttendance = (studentId) => {
        const updatedAttendance = attendance.map((student) => {
          if (student.studentId === studentId) {
            const newStatus = !student.isPresent;
            return { ...student, isPresent: newStatus };
          }
          return student;
        });
    
        setAttendance(updatedAttendance);
      };
    
      const submitAttendance = async () => {
        try {
          // Filter only those students whose attendance status is changed
          const changedStudents = attendance.filter((student) => {
            const originalAttendance = students.find((s) => s.studentId === student.studentId);
            return originalAttendance.isPresent !== student.isPresent;
          });
    
          // Prepare the data to be sent to the server
          const dataToSave = changedStudents.map((student) => ({
            studentId: student.studentId,
            studentName: student.studentName,
            date: currentDate.format("MMMM D, YYYY"),
            status: student.isPresent ? "Present" : "Absent",
          }));
    
          // Send a POST request to save the attendance changes
          const response = await axios.post("http://192.168.1.104:8000/attendance", dataToSave);
    
          Alert.alert("Success", "Attendance data saved successfully!");
        } catch (error) {
          console.log("Error while submitting the attendance", error);
          Alert.alert("Error", "Failed to save attendance data. Please try again.");
        }
      };
      
      
    
      return (
        <View style={{ backgroundColor: 'white' , flex:1}}>
          <Pressable>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 'auto', marginRight: 'auto', marginVertical: 20 }}>
              <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
              <Text>{formatDate(currentDate)}</Text>
              <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
            </View>
    
            <View style={{ marginHorizontal: 12 }}>
              {students.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => toggleAttendance(item.studentId)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    backgroundColor: attendance.find((student) => student.studentId === item.studentId)?.isPresent ? 'lightgreen' : 'lightcoral',
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}>
                  <View style={{ width: 50, height: 50, padding: 10, backgroundColor: '#4b6cb7', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>{item?.studentName?.charAt(0)}</Text>
                  </View>
    
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item?.studentName}</Text>
                    <Text style={{ marginTop: 5, color: 'grey' }}>Id: {item?.studentId} - PRN: ({item?.studentPRN})</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </Pressable>
  
        <Pressable
          onPress={submitAttendance}
          style={{
            padding: 15,
            backgroundColor: '#00c6ff',
            width: 200,
            marginTop: 30,
            marginLeft: 'auto',
            marginRight: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
          }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Save Attendance</Text>
        </Pressable>

    </View>
  );
};
    
    export default MarkAttendance;
    


