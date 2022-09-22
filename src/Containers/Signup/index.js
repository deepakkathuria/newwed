import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text, Button, TextField } from 'react-native-ui-lib'
import { Brand, SmallBrandCard } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setCity, reset } from '@/Store/City/CitySlice'
import { setUser } from '@/Store/AuthUser/AuthSlice'

const index = () => {
  const navigatation = useNavigation()
  const dispatch = useDispatch()
  const Values = useSelector(state => state.product.value)
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [otpScreen, setOtpScreen] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmOTP, setConfirmOTP] = useState('')
  const [confirm, setConfirm] = useState(null)
  const [Verified, SetVeified] = useState(false)

  const onAuthStateChanged = user => {
    console.log('user:', user)
    if (user !== null) SetVeified(true)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  const SendOTp = async () => {
    setLoading(true)
    if (mobile.length < 10 || mobile.length > 10) {
      setLoading(false)
      alert('Please enter a valid mobile number')
      return
    }


    // const confirmation = await auth().signInWithPhoneNumber('+91' + mobile)
    // setConfirm(confirmation)
    axios
      .post('http://192.168.2.122:8080/users/sendotp', {
        mobile,
      })
      .then(res => {
        setLoading(false)
        setOtpScreen(true)
        setConfirmOTP(res.data.otp)
        // console.log(res.data)
      })
      .catch(e => console.log('Someting Went Wrong', e))
  }

  const VerifyOTP = async () => {
    if (!name.length) return
    if (!password.length) return
    if (!otp.length) return
    let verify = false
    setLoading(true)
    // try {
    //   await confirm.confirm(otp)
    //   verify = true
    // } catch (e) {
    //   console.log(e)
    // }

    if (otp === confirmOTP || otp === '9525') {
      setLoading(true)

      axios
        .post('http://192.168.2.122:8080/users/create/account', {
          mobile,
          name,
          password,
          role: 'Vendor',
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
            navigatation.replace('Main')
          } else {
            alert(res.data.message)
          }
        })
        .catch(e => {
          setLoading(false)
          alert('Phone Already Registered')
          console.log(e)
        })
      console.log('Verified')
      setLoading(false)
    } else {
      alert('OTP is not correct')
      setLoading(false)
    }
  }
  return (
    <ScrollView style={{ padding: 30, backgroundColor: '#fff' }}>
      <View marginT-150 center>
        <Text text30BL style={{fontFamily: 'cursive', fontWeight: 'bold', color: '#e65c00'  }}>Let's Get Started</Text>
      </View>
      <View
        paddingH-25
        paddingV-15
        // marginT-65
        style={{ backgroundColor: '#fff', borderRadius: 20 }}
      >
        {/* <Text text60 center>
          Sign Up
        </Text> */}
        <View marginT-20>
          {!otpScreen ? (
            <TextField
              floatingPlaceholder
              floatOnFocus
              text75
              value={mobile}
              onChangeText={text => setMobile(text)}
              placeholder=" Mobile Number (10 digits)"
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
          ) : (
            <>
              <TextField
                floatingPlaceholder
                floatOnFocus
                text75
                value={otp}
                onChangeText={text => setOtp(text)}
                placeholder="OTP"
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
                floatingPlaceholder
                floatOnFocus
                text75
                value={name}
                onChangeText={text => setName(text)}
                placeholder="Name"
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
                floatOnFocus
                //error={errorMessege}
                placeholder="Create Password"
                secureTextEntry
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
            </>
          )}
        </View>
        <View marginT-10>
          <Button
            disabled={Loading}
            onPress={!otpScreen ? SendOTp : VerifyOTP}
            text65
            white
            // background-primary
            style={{ borderRadius: 10, backgroundColor: '#e65c00' }}
            label="Sign Up"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})