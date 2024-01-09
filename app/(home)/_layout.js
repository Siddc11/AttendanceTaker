import{Stack} from 'expo-router';

export default function Layout(){
    return(
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="students"/>
            <Stack.Screen name="addDetails"/>
            <Stack.Screen name="markAttendance"/>
            <Stack.Screen name="summary"/>
        </Stack>
    );
}