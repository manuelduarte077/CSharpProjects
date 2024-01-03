import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { PublicStackParamList } from '../types'
import { LoginScreen, SignupScreen } from '../features/auth/screens'

const Stack = createNativeStackNavigator<PublicStackParamList>()

export const PublicRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Signup">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}
