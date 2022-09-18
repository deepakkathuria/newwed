import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  Button,
  TextField,
  LoaderScreen,
} from 'react-native-ui-lib'
import { TextInput } from 'react-native-paper';
import { Brand, SmallBrandCard } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setCity, reset } from '@/Store/City/CitySlice'
import { setUser } from '../../Store/AuthUser/AuthSlice'
import { useTogglePasswordVisibility } from '../../Theme/hooks/useTogglePasswordVisibility';

const index = ({ navigation }) => {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const navigatation = useNavigation()
  const dispatch = useDispatch()
  const Values = useSelector(state => state.product.value)
  const [Phone, setPhone] = useState('')
  const [errorMessege, seterrorMessege] = useState('')
  const [errorMessegeP, seterrorMessegeP] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(true);

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

  const Login = () => {
    if (Phone.length < 10 || Phone.length > 10) {
      seterrorMessege('Phone number must be 10 digits')
      return
    }
    if (password.length < 4) {
      seterrorMessegeP('Password must be at least 4 characters')
      return
    }

    setLoading(true)
    axios
      .post('http://192.168.1.8:8080/users/login', {
        mobile: Phone,
        password,
      })
      .then(res => {
        if (res.data.success) {
          AsyncStorage.setItem('@User', JSON.stringify(res.data.data))
          dispatch(
            setUser({
              isAuthenticated: true,
              userData: res.data.data,
            }),
          )
          setLoading(false)
          navigation.replace('Main')
        } else {
          setLoading(false)
          alert('Invalid Phone or Password')
        }
      })
      .catch(e => {
        setLoading(false)
        console.log(e)
        alert('Check Your Internet Connection!', e)
      })
  }

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={{ padding: 30, backgroundColor: '#fff' }}>
      {loading ? (
        <View paddingT-100 centerH style={{ height: '100%' }}>
          <LoaderScreen color="#ff4d4d" />
        </View>
      ) : (
        <>
          <View marginT-50 center>
            <Text text30BL style={{fontFamily: 'cursive', fontWeight: 'bold', color: '#e65c00'  }}>Welcome Back !</Text>
          </View>
          <View
            paddingH-10
            paddingV-15
            // marginT-45
            style={{
              backgroundColor: '#fff',
              borderRadius: 20,
              flex: 1,
              height: '100%',
            }}
          >
            {/* <Text text40 left>
              Login
            </Text> */}
            <View marginT-20>
              <TextField
                floatingPlaceholder
                floatOnFocus
                text75
                error={errorMessege}
                value={Phone}
                onChangeText={text => setPhone(text)}
                placeholder="Registered Mobile Number"
                floatingPlaceholderColor={{
                  default: 'grey',
                  error: 'red',
                  focus: 'grey',
                  disabled: 'grey',
                }}
                underlineColor={{
                  default: 'grey',
                  error: 'red',
                  focus: 'grey',
                  disabled: 'grey',
                }}
              />
              <TextField
                text75
                // label="Password"
                // backgroundColor='white'
                floatOnFocus
                error={errorMessegeP}
                placeholder="Password"
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisible}
                // right={<TextField.Icon style={{backgroundColor: 'white'}} name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                floatingPlaceholder
                value={password}
                onChangeText={text => setPassword(text)}
                floatingPlaceholderColor={{
                  default: 'grey',
                  error: 'red',
                  focus: 'grey',
                  disabled: 'grey',
                }}
                underlineColor={{
                  default: 'grey',
                  error: 'red',
                  focus: 'grey',
                  disabled: 'grey',
                }}
              />
            </View>
            <View marginT-10>
              <Button
                onPress={Login}
                text65
                white
                //background-primary
                style={{ borderRadius: 10, backgroundColor: '#e65c00' }}
                label="Login"
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              >
                <Button
                  onPress={() => navigation.navigate('ForgotPassword')}
                  link
                  text75
                  color="#039BE5"
                  //primary
                  label="Forgot passwrod ?"
                  marginT-14
                  marginB-22
                  marginR-14
                />
              </View>
            </View>
            <View marginT-10 center style={{display: 'flex'}}>
              <Text style={{color: 'gray'}}>Don't have an account?</Text>
              <Button
                  onPress={() => navigation.navigate('Singup')}
                  link
                  text75
                  color="#e65c00"
                  //primary
                  label="Sign Up Now"
                  // marginT-10
                />
              </View>
          </View>
          
        </>
      )}
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})
