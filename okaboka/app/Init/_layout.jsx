import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen name='ProfileScreen' options={{headerShown: false}}/>
        <Stack.Screen name='UserForm' options={{headerShown: false}}/>
        <Stack.Screen name='ProfileSetup' options={{headerShown: false}}/>
        
    </Stack>
  )
}