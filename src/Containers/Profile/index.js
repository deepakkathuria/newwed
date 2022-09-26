import React, { useState, useEffect } from 'react'
import profile from '@/Assets/Images/profile.png'

import {
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native'
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import {
  View,
  TextField,
  Image,
  Button,
  LoaderScreen,
  Text,
} from 'react-native-ui-lib'
import { RightArrow } from '@/Assets/SVGIcons'
import { KeyboardAwareScrollView } from 'react-native-ui-lib/keyboard'
const InputColors = {
  default: 'grey',
  error: 'red',
  focus: 'grey',
  disabled: 'grey',
}

import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
// import { API_URL, API_TOKEN } from '@env'
import { launchImageLibrary } from 'react-native-image-picker'
import AwesomeAlert from 'react-native-awesome-alerts'
import auth from '@react-native-firebase/auth'
import { SafeAreaView } from 'react-native-safe-area-context'

const API_URL = 'https://api.wedcell.com/front-profile-update'
const API_TOKEN = 'https://api.wedcell.com/front-profile-update'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '@/Store/AuthUser/AuthSlice'

//for form data handling for image

const Profile = ({ navigation }) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.value.isAuthenticated)
  const user = useSelector(state => state.auth.value.userData)
  const [Alert, SetAlert] = useState({
    visible: false,
    title: '',
    message: '',
  })
  const [name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [photo, setPhoto] = useState(null)
  const [ProfilePicture, setProfilePicture] = useState('')
  const [Phone, setPhone] = useState('')
  const [Address, setAddress] = useState('')
  const [Password, setPassword] = useState('')
  const [Password2, setPassword2] = useState('')
  const [User, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [NotificationStatus, setNotificationStatus] = useState(true)
  const [ModalVisible, setModalVisible] = useState(false)
  const [errorMessege, seterrorMessege] = useState('')
  const [CurrentStatus, setCurrentStatus] = useState('')
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigation.replace('Login')
  //   } else {
  //     console.log(user)
  //     setName(user.name)
  //     setEmail(user.email)
  //     setPhone(user.mobile)
  //     setAddress(user.address)
  //   }
  // }, [navigation])
  //--------get--users-----------
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true)
      FetchData()
    })
    return unsubscribe
  }, [navigation])

  const FetchData = async () => {
    console.log('FetchData')
    const config = {
      headers: { authorization: `${user.token}` },
    }
    await axios
      .post(
        'http://192.168.68.115:8080/users/getuserbyid',
        {
          _id: user._id,
        },
        config,
      )
      .then(res => {
        if (res.data.success) {
          if (!isAuthenticated) {
            navigation.replace('Login')
          } else {
            console.log('-----------------dta---------')
            seterrorMessege('')
            setName(user.name)
            setEmail(user.email)
            setPhone(user.mobile)
            // setPhoto(user.profile_pic[0].path)
            // var showPhoto = photo

            console.log(ProfilePicture)
            setAddress(user.address)
          }
          setLoading(false)
        } else {
          alert('Not update')
          setLoading(false)
          console.log('api call failed')
        }
      })
      .catch(e => console.log('Someting went wrong', e))
  }

  const logOut = async () => {
    try {
      await auth().signOut()
    } catch (e) {
      console.log(e)
    }
    dispatch(reset())
    AsyncStorage.removeItem('@User')
    navigation.replace('Login')
  }
  // const SetToken = async Token => {
  //   axios
  //     .post(`${API_URL}/users/togglenotification`, {
  //       _id: User._id,
  //       token: Token,
  //     })
  //     .then(res => {
  //       const user = res.data.data
  //       //setUser(user);
  //       //AsyncStorage.setItem('@User', JSON.stringify(user));
  //     })
  //     .catch(e => console.log())
  // }
  //---------------image------------editting-------

  // const extractRequiredImageData = () => {
  //   let imageData = photo
  //   let imageList = []

  //   for (let i = 0; i < Object.keys(imageData).length; i++) {
  //     let data = imageData[String(i)]
  //     let image = {
  //       id: String(i),
  //       contentType: data.mime,
  //       fileSize: data.size,
  //       filePath: data.path,
  //     }

  //     if (Platform.OS === 'ios') {
  //       image.fileName = data.filename
  //     } else {
  //       let path = data.path.split('/')
  //       image.fileName = path[path.length - 1]
  //     }

  //     imageList.push(image)
  //   }
  //   setProfilePicture(imageList)
  // }

  //////////////////////////////////////////////////////////////////
  const updateUser = async () => {
    const config = {
      headers: { authorization: `${user.token}` },
    }
    if (Phone.length < 10 || Phone.length > 10) {
      seterrorMessege('Phone number must be 10 digits')
      return
    }
    if (loading) return
    if (errorMessege.length > 0) return
    if ((name || Address).length > 0) {
      console.log()
      setLoading(true)
      const res = await axios
        .patch(`http://192.168.68.115:8080/users/updatewithpass`, {
          _id: user._id,
          name: name,
          address: Address,
          // mobile: Phone,
          // access_token: user.access_token,
          // user_id: user.cutomer_vendor_id,
        })
        .then(res => {
          if (!res.data.success) {
            setLoading(false)
            SetAlert({
              visible: true,
              title: 'Error',
              message: 'Error in updating...',
            })
            // seterrorMessege('Number. Already Used')
            return
          } else {
            console.log('good to go')
            setLoading(false)
            // alert("Details Updated")
          }
        })
        .catch(e => {
          alert('Fileds not Updated')
        })
    }
    console.log(errorMessege.length)
    if (errorMessege.length > 0) return
    if (Phone.length > 0) {
      setLoading(true)
      axios
        .patch(`http://192.168.68.115:8080/users/resetuniquemobile`, {
          _id: user._id,
          mobile: Phone,
        })
        .then(result => {
          setLoading(false)
          setPhone(Phone)
          seterrorMessege(result.data)
          alert(result.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
    console.log(errorMessege.length)
    if (errorMessege.length > 0) return
    if (Email.length > 0) {
      setLoading(true)
      axios
        .patch(`http://192.168.68.115:8080/users/resetuniqueemail`, {
          _id: user._id,
          email: Email,
        })
        .then(result => {
          setLoading(false)
          setEmail(Email)
          seterrorMessege(result.data)
          alert(result.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
    console.log(errorMessege.length)
    if (errorMessege.length > 0) return
    if ((Password || Password2).length > 0) {
      console.log('----------------password lenght')
      console.log(Password.length)
      if (Password === Password2) {
        setLoading(true)
        axios
          .patch(`http://192.168.68.115:8080/users/reset/password`, {
            // shipping_address: Address,
            // address: Address,
            // mobile: Phone,
            // name,
            password: Password,
            mobile: Phone,
            // user_id: user.cutomer_vendor_id,
            // access_token: user.access_token,
          })
          .then(async res => {
            if (!res.data.success) {
              setLoading(false)
              setPassword('')
              setPassword2('')
              alert('Password Updated Successfully')
            } else {
              console.log(res.data)
              setLoading(false)
              alert('Password not Updated!')
            }
          })
          .catch(e => {
            console.log(e)
            setLoading(false)
            SetAlert({
              visible: true,
              title: 'Error',
              message: 'Error in updating your password,  Kindly try again',
            })
          })
      } else {
        SetAlert({
          visible: true,
          title: 'Error',
          message: "Password didn't match",
        })
        setLoading(false)
      }
    }
    console.log(errorMessege.length)
    if (errorMessege.length > 0) return
    if (photo === true) {
      console.log('------------------------')
      console.log(photo.type)
      const mainform = new FormData()
      const imageName = photo.uri.split('/')
      console.log('==========================')
      console.log(imageName)
      mainform.append('profile_pic', {
        name: imageName[imageName.length - 1],
        type: photo.type,
        uri:
          Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      })
      mainform.append('_id', user._id)
      setCurrentStatus('Item Created, Uploading Profile Image')
      console.log(mainform)
      setLoading(true)
      await axios
        .post(`http://192.168.68.115:8080/users/uploadprofile`, {
          mainform,
          config,
          // _id: user._id,
          // profile_pic: photo
          // shipping_address: Address,
          // address: Address,
          // mobile: Phone,
          // access_token: user.access_token,
          // name,
          // email: Email,
        })
        .then(res => {
          // setPhoto(photo)
          // setUser(user)
          // await AsyncStorage.setItem('@User', JSON.stringify(user))
          if (res.data.success === true) {
            setLoading(false)
            alert('Profle pic Updated')
          } else {
            setLoading(false)
            console.log('================ dsdsds ==================')
            console.log(res.data)
            alert('Profle pic not Updated!')
          }
        })
        .catch(e => {
          setLoading(false)
          console.log(photo)
          console.log('-----------------------------')
          console.log(e)
          SetAlert({
            visible: true,
            title: 'Error',
            message: 'Error in updating your profile,  Kindly try again',
          })
        })
    }
  }

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, response => {
      console.log(response)
      setModalVisible(false)
      if (response) {
        if (response.didCancel) return
        setPhoto(response.assets[0])
      }
    })
  }

  const removeProfile = () => {
    setLoading(true)
    setModalVisible(false)
    axios
      .post(`${API_URL}/users/update`, {
        _id: User._id,
        shipping_address: Address,
        address: Address,
        mobile: Phone,
        name,
        profile_pic: [],
      })
      .then(res => {
        const user = res.data.data
        setUser(user)
        setEmail(user.email)
        setName(user.name)
        setPhone(user.mobile)
        setAddress(user.shipping_address)
        setPhoto(null)
        setProfilePicture('')
        AsyncStorage.setItem('@User', JSON.stringify(user))
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
        SetAlert({
          visible: true,
          title: 'Error',
          message: 'Error in updating your profile,  Kindly try again',
        })
      })
  }

  const handleNotificationChange = async () => {
    if (NotificationStatus) {
      setNotificationStatus(false)
      SetToken('notoken')
    } else {
      setNotificationStatus(true)
      const value2 = await AsyncStorage.getItem('@NotificationToken')
      if (value2 !== null) {
        // value previously stored
        SetToken(value2)
        //setUser(User);
      }
    }
  }

  return (
    <>
      <View
        bg-white
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 5,
          elevation: 5,
          width: '100%',
          height: 70,
          justifyContent: 'center',
        }}
      >
        <View row paddingV-10>
          <View flex-4></View>
          <View flex-4>
            <Text center text60>
              Profile
            </Text>
          </View>
          <View paddingR-10 flex-4>
            <TouchableOpacity onPress={updateUser}>
              <Text style={{ textAlign: 'right', color: '#ff4d4d' }} text65>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <AwesomeAlert
        showConfirmButton={true}
        onDismiss={() => {
          SetAlert({ visible: false, title: '', message: '' })
        }}
        confirmText="Ok"
        onConfirmPressed={() => {
          SetAlert({ visible: false, title: '', message: '' })
        }}
        show={Alert.visible}
        showProgress={false}
        title={Alert.title}
        message={Alert.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        confirmButtonColor="#49A534"
      />
      {loading ? (
        <View marginT-45 style={{ height: '100%' }} center centerV>
          <LoaderScreen />
        </View>
      ) : (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          extraScrollHeight={60}
        >
          <View marginT-100 marginB-40 paddingH-10 paddingB-30 flex>
            <View center>
              <View bg-white br20 padding-10>
                <TouchableOpacity onPress={() => handleChoosePhoto()}>
                  <Image
                    resizeMode="cover"
                    style={{ height: 150, width: 150, borderRadius: 10 }}
                    source={
                      photo
                        ? { uri: photo.uri }
                        : User && ProfilePicture.length
                        ? { uri: `${API_URL}/` + ProfilePicture }
                        : profile
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              paddingH-25
              paddingV-15
              marginT-65
              style={{ backgroundColor: '#fff', borderRadius: 10 }}
            >
              <Text text60 center>
                User Info
              </Text>
              <View marginT-20>
                <TextField
                  floatingPlaceholder
                  floatOnFocus
                  value={name}
                  onChangeText={text => setName(text)}
                  text75
                  placeholder="Name "
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                />
                <TextField
                  floatingPlaceholder
                  floatOnFocus
                  text75
                  editable={true}
                  value={Email}
                  onChangeText={text => setEmail(text)}
                  placeholder="Email"
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                />
                <TextField
                  floatingPlaceholder
                  floatOnFocus
                  error={errorMessege}
                  text75
                  editable={true}
                  value={Phone}
                  onChangeText={text => {
                    setPhone(text)
                    seterrorMessege('')
                  }}
                  keyboardType="numeric"
                  placeholder="Phone "
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                />

                <TextField
                  floatingPlaceholder
                  floatOnFocus
                  text75
                  value={Address}
                  onChangeText={text => setAddress(text)}
                  placeholder="Shipping Address "
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                />
                <TextField
                  text75
                  floatOnFocus
                  placeholder="Password"
                  value={Password}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry
                  floatingPlaceholder
                  floatingPlaceholderColor={InputColors}
                />
                <TextField
                  text75
                  floatOnFocus
                  value={Password2}
                  onChangeText={text => setPassword2(text)}
                  placeholder="Repeat Password"
                  secureTextEntry
                  floatingPlaceholder
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('About')
              }}
            >
              <View
                paddingH-25
                paddingV-15
                marginT-20
                style={{ backgroundColor: '#fff', borderRadius: 10 }}
                spread
                row
              >
                <View>
                  <Text>About</Text>
                </View>
                <View style={{ alignSelf: 'flex-end' }}>
                  <RightArrow />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={logOut}>
              <Text
                style={{
                  textAlign: 'left',
                  textDecorationLine: 'underline',
                  color: '#E55612',
                }}
                text65
                marginT-10
                marginB-10
                marginL-10
                secoundry
              >
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  )
}

export default Profile
