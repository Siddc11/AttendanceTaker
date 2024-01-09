import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

const SearchResults = ({ data, input, setInput }) => {
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.studentId.toString()} 
        renderItem={({ item }) => {
          // Fix the typo here
          if (item?.studentName.toLowerCase().includes(input.toLowerCase())) {
            return (
              <View style={{ marginVertical: 10, gap: 10, flexDirection: 'row' }}>
                <View style={{ width: 50, height: 50, padding: 10, backgroundColor: '#4b6cb7', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{color:'white', fontSize:16}}>{item?.studentName?.charAt(0)}</Text>
                </View>

                <View>
                  <Text style={{fontSize:16, fontWeight:'bold'}}>{item?.studentName}</Text>
                  <Text style={{marginTop: 5, color: "grey"}}>Id: {item?.studentId} - PRN: ({item?.studentPRN})</Text>
                </View>
              </View>
            );
          } else {
            return null; 
          }
        }}
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});
