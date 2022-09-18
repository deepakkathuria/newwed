import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ForgotPassword from '@/Containers/ForgotPassword'
import {
  IndexStartupContainer,
  Login,
  Ideas,
  Signup,
  Reset,
  SearchScreen,
  WishlistScreen,
  BlogScreen,
  CreateItem,
  ItemDetails,
  EditDetails
} from '@/Containers'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '@/Navigators/Root'
import { SafeAreaView, StatusBar } from 'react-native'
import { useTheme } from '@/Theme'

const Stack = createStackNavigator()

let MainNavigator

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme
  const [isApplicationLoaded, setIsApplicationLoaded] = useState(false)
  const applicationIsLoading = useSelector(state => state.startup.loading)
  const LoggedIn = useSelector(state => state.user.loggedIn)

  useEffect(() => {
    if (MainNavigator == null && !applicationIsLoading) {
      MainNavigator = require('@/Navigators/Main').default
      setIsApplicationLoaded(true)
    }
  }, [applicationIsLoading])

  // on destroy needed to be able to reset when app close in background (Android)
  useEffect(
    () => () => {
      setIsApplicationLoaded(false)
      MainNavigator = null
    },
    [],
  )

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="Login" component={Login} />
          {isApplicationLoaded && MainNavigator != null && (
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                animationEnabled: false,
              }}
            />
          )}
          <Stack.Screen name="Singup" component={Signup} />
          <Stack.Screen name="Item" component={ItemDetails} />
          <Stack.Screen name="Reset" component={Reset} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
          <Stack.Screen name="CreateItem" component={CreateItem} />
          <Stack.Screen name="BlogScreen" component={BlogScreen} />
          <Stack.Screen name="EditDetails" component={EditDetails} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
