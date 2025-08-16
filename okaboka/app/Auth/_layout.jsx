import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen name='Signup' options={{headerShown: false}}/>
        <Stack.Screen name='Verification' options={{headerShown: false}}/>
        <Stack.Screen name='ProfileScreen' options={{headerShown: false}}/>
    </Stack>
  )
}