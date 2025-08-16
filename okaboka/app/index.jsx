import React from 'react'
import { Redirect } from 'expo-router'
export const unstable_settings = {
  initialRouteName: 'Auth',
};
export default function index() {
  return (<>
    <Redirect href="/Auth"/>

    </>
  )
}