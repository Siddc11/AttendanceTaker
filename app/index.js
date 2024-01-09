import { StyleSheet } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router' 

const index = () => {
  return (
    <Redirect href="/(home)"/> //Redirecting to Main Screen
  )
}

export default index

const styles = StyleSheet.create({})