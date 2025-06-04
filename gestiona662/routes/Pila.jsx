import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../components/Login'
import Registro from '../components/Registro'

const Stack= createStackNavigator();

const Pila = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="login" component={Login}></Stack.Screen>
        <Stack.Screen name="registro" component={Registro}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default Pila

const styles = StyleSheet.create({})