import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Login from './screens/login'
import SignUp from './screens/signup'

const Stack = createStackNavigator()

export default function AuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}
