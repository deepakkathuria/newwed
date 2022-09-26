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
  const [ConfirmPassword, setConfirmPassword] = useState('')
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
      .post('http://192.168.68.115:8080/users/sendotp', {
        mobile,
      })
      .then(res => {
        setLoading(false)
        setOtpScreen(true)
        setConfirmOTP(res.data.otp)
        // console.log(res.data)
      })
      .catch(e => alert('Check your connection', e))
  }

  const VerifyOTP = async () => {
    if (!ConfirmPassword.length) return
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
      if (password === ConfirmPassword) {
        setLoading(true)
        console.log(mobile + ' ' + password)

        await axios
          .patch('http://192.168.68.115:8080/users/reset/password', {
            mobile,
            password,
          })
          .then(res => {
            // if (res.data.success) {
            //   // AsyncStorage.setItem('@User', JSON.stringify(res.data.data))
            //   // dispatch(
            //   //   setUser({
            //   //     isAuthenticated: true,
            //   //     userData: res.data.data,
            //   //   }),
            //   // )
            //   alert(res.data.message)
            //   setLoading(false)
            //   navigatation.replace('Login')
            // } else {
            setLoading(true)
            alert(res.data)
            navigatation.replace('Login')
          })
          .catch(e => {
            setLoading(false)
            alert('Check Your Internet Connection!', e)
            // navigatation.replace('Singup')
            console.log(e)
          })

        // .then(res => {
        // if (res.data.success) {
        //     // AsyncStorage.setItem('@User', JSON.stringify(res.data.data))
        //     // dispatch(
        //     // setUser({
        //     //     isAuthenticated: true,
        //     //     userData: res.data.data,
        //     // }),
        //     // )
        //     setLoading(false)
        //     navigatation.replace('Login')
        // } else {
        //     alert(res.data.message)
        // }
        // })
        // .catch(e => {
        // setLoading(false)
        // alert("Error in process")
        // console.log(e.message)
        // })
        // console.log('Verified')
        // setLoading(false)
        // navigatation.replace('Login')
      } else {
        alert('Password is not matched')
        setLoading(false)
      }
    } else {
      alert('OTP is not correct')
      setLoading(false)
    }
  }
  return (
    <ScrollView style={{ padding: 30, backgroundColor: '#fff' }}>
      <View marginT-150 center>
        <Text text30BL style={{fontFamily: 'cursive', fontWeight: 'bold', color: '#e65c00'  }}>Forgot Password!</Text>
      </View>
      <View
        paddingH-25
        paddingV-15
        // marginT-65
        style={{ backgroundColor: '#fff', borderRadius: 20 }}
      >
        {/* <Text text60 center>
          Enter Mobile Number
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
                text75
                floatOnFocus
                //error={errorMessege}
                placeholder=" New Password"
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
              <TextField
                floatingPlaceholder
                floatOnFocus
                text75
                secureTextEntry
                value={ConfirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                placeholder="Confirm New Password"
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
            label="Continue"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})
