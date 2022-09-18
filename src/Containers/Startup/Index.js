import React, { useEffect } from 'react'
import { ActivityIndicator, StatusBar } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Theme'
import InitStartup from '@/Store/Startup/Init'
import { Brand } from '@/Components'
import {
  View,
  Text,
  Button,
  Image,
  Card,
  Carousel,
  LoaderScreen,
  AnimatedImage,
} from 'react-native-ui-lib'
import { setCity, reset } from '@/Store/City/CitySlice'
import { setUser } from '../../Store/AuthUser/AuthSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const IndexStartupContainer = ({ navigation }) => {
  const { Layout, Gutters, Fonts } = useTheme()

  const { t } = useTranslation()

  const dispatch = useDispatch()
  useEffect(() => {
    getUserDetails()
  }, [])

  const getUserDetails = async () => {
    try {
      const value = await AsyncStorage.getItem('@User')
      const city = await AsyncStorage.getItem('@City')
      if (city) dispatch(setCity(city))

      if (value !== null) {
        // value previously stored
        const User = JSON.parse(value)
        dispatch(setUser({ isAuthenticated: true, userData: User }))
        navigation.replace('Main')
      } else {
      }
    } catch (e) {
      // error reading value
      console.log(e)
    }
  }

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <StatusBar backgroundColor="#a13737" barStyle="dark-content" />
      <Carousel
        loop
        autoplay
        // pageControlPosition={Carousel.pageControlPositions.OVER}
      >
        <View flex>
          <Image
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
            source={require('@/Assets/Images/4Q4A2487.jpg')}
          />
          <View
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 10,
              position: 'absolute',
              bottom: 0,
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              //paddingBottom: 40,
            }}
            center
          >
            <Text text50 white center>
              Let's Celebrate Your Wedding With
              <Text color="#ff4d4d"> WedCell</Text>
            </Text>
            <Button
              backgroundColor="#ff4d4d"
              label="Lets Start"
              labelStyle={{ fontWeight: '600', paddingVertical: 5 }}
              style={{ width: '40%', marginTop: 10 }}
              onPress={() => navigation.navigate('Main')}
              enableShadow
            />
          </View>
        </View>
        <View>
          <Image
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
            source={require('@/Assets/Images/LENS0277.jpg')}
          />
          <View
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 10,
              position: 'absolute',
              bottom: 0,
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              //paddingBottom: 40,
            }}
            center
          >
            <Text text50 white center>
              Select From Top Venders / Venues in Your
              <Text color="#ff4d4d"> City </Text>
            </Text>
            <Button
              backgroundColor="#ff4d4d"
              label="Lets Start"
              labelStyle={{ fontWeight: '600', paddingVertical: 5 }}
              style={{ width: '40%', marginTop: 10 }}
              onPress={() => navigation.navigate('Main')}
              enableShadow
            />
          </View>
        </View>
        <View>
          <Image
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
            source={require('@/Assets/Images/DB0A3339.jpg')}
          />
          <View
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 10,
              position: 'absolute',
              bottom: 0,
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              //paddingBottom: 40,
            }}
            center
          >
            <Text text50 white center>
              Connect to Vendor or Venues Directly On
              <Text color="#ff4d4d"> WedCell</Text>
            </Text>
            <Button
              backgroundColor="#ff4d4d"
              label="Login/Signup"
              labelStyle={{ fontWeight: '600', paddingVertical: 5 }}
              style={{ width: '40%', marginTop: 10 }}
              onPress={() => navigation.navigate('Login')}
              enableShadow
            />
          </View>
        </View>
      </Carousel>
    </View>
  )
}

export default IndexStartupContainer
