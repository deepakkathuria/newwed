import React, { useState, useEffect } from 'react'
import {
  Platform,
  Dimensions,
  Pressable,
  Modal,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native'
import {
  View,
  TextField,
  Image,
  Button,
  ExpandableSection,
  Checkbox,
  Colors,
  LoaderScreen,
  Carousel,
  Text,
  Picker,
} from 'react-native-ui-lib'

import { useNavigation } from '@react-navigation/native'
import { FlatGrid } from 'react-native-super-grid'
import ImagePicker from 'react-native-image-crop-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
// import { API_URL, API_TOKEN } from '@env'
const API_URL = 'https://api.wedcell.com/front-profile-update'
import { CardField, useConfirmSetupIntent } from '@stripe/stripe-react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import { useIsFocused } from '@react-navigation/native'
const win = Dimensions.get('window')
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { launchImageLibrary } from 'react-native-image-picker'
import { useDispatch, useSelector } from 'react-redux'
// import MultipleImagePicker from '@baronha/react-native-multiple-image-picker'
import DocumentPicker from 'react-native-document-picker'
import TableInpute from '@/Components/TableInpute'
import AlbumTable from '@/Components/AlbumTable'

import GallaryImage from '@/Assets/Images/main-Gallary.png'
import LinkTable from '@/Components/LinkTable'
import TableInputeCapacity from '../../Components/TableInputeCapacity'

const InputColors = {
  default: 'grey',
  error: 'red',
  focus: 'grey',
  disabled: 'grey',
}
const InputColor2 = {
  default: '#000',
  error: 'red',
  focus: '#000',
  disabled: '#000',
}
const cities = [
  'Mumbai',
  'Pune',
  'Delhi',
  'Jaipur',
  'Goa',
  'Udaipur',
  'Agra',
  'Noida',
  'Gurgaon',
  'Ranchi',
  'Patna',
  'Bangalore',
  'Hyderabad',
  'Ahmedabad',
  'Chennai',
  'Kolkata',
  'Surat',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Vadodara',
  'Ghaziabad',
  'Ludhiana',
  'Nashik',
  'Meerut',
  'Rajkot',
  'Varanasi',
  'Srinagar',
  'Aurangabad',
  'Dhanbad',
  'Amritsar',
  'Allahabad',
  'Gwalior',
  'Jabalpur',
  'Coimbatore',
  'Vijayawada',
  'Jodhpur',
  'Raipur',
  'Kota',
  'Chandigarh',
  'Guwahati',
  'Mysore',
  'Bareilly',
  'Aligarh',
  'Moradabad',
  'Jalandhar',
  'Bhuba',
  'Gorakhpur',
  'Bikaner',
  'Saharanpur',
  'Jamshedpur',
  'Bhilai',
  'Cuttack',
  'Firozabad',
  'Kochi',
  'Dehradun',
  'Durgapur',
  'Ajmer',
  'Siliguri',
  'Gaya',
  'Tirupati',
  'Mathura',
  'Bilaspur',
  'Haridwar',
  'Gandhinagar',
  'Shimla',
  'Gangtok',
  'Nainital',
  'Jaisalmer',
  'Indor',
  'Rishikesh',
  'kaushali',
  'Pushkar',
  'Kerala',
  'Jim Corbet',
  'Mussoorie',
  'Dubai',
  'Thailand',
  'Canada',
  'Srilanka',
  'South Africa',
  'Singapore',
  'Bali',
  'Italy',
  'UK',
  'Autralia',
  'Bokaro',
  'Faridabad',
  'South Delhi',
  'Kolkata',
]

const CategotiesList = [
  {
    name: 'Bridal Wear',
    subCategories: [],
  },
  {
    name: 'Groom Wear',
    subCategories: [],
  },
  {
    name: 'Food',
    subCategories: [
      'Chaat Counter',
      'Fruit Counter',
      'Catering services',
      'Pan Counter',
      'Cake',
      'Bar Tenders',
    ],
  },
  {
    name: 'Invites & Gifts',
    subCategories: ['invitation card', 'invitation gift'],
  },
  {
    name: 'Jwellery And Accessories',
    subCategories: [
      'FLOWER JEWELLERY ',
      'BRIDAL JEWELLERYON RENT',
      'Artificial',
      'Accessories',
    ],
  },
  {
    name: 'Music & Dance',
    subCategories: [
      'Anchor',
      'Artist management services',
      'Choreographer',
      'Singer',
      'DJ',
      'Ghodi & Baggi',
      'Band Baja',
      'Dhol',
    ],
  },
  {
    name: 'Pandit Jee',
    subCategories: [],
  },
  {
    name: 'Makeup',
    subCategories: ['bridal makeup', 'Groom Makeup', 'Family Makeup'],
  },
  {
    name: 'Mehndi',
    subCategories: ['Bride Mehndi', 'Family Member Mehndi'],
  },
  {
    name: 'Photographers',
    subCategories: [
      'Cinema/Video',
      'Album',
      'Collage Maker',
      'Drone',
      'Pre Wedding Shoot',
    ],
  },
  {
    name: 'Planning & Decor',
    subCategories: [
      'Wedding Decor',
      'Wedding Planners',
      'Celebrities Management',
      'Hospitality Service',
    ],
  },
]

const CategotiesListVenue = [
  {
    name: 'Hotel',
    subCategories: [],
  },
  {
    name: 'Resort',
    subCategories: [],
  },
  {
    name: 'Farm House',
    subCategories: [],
  },
  {
    name: 'Banquet Hall',
    subCategories: [],
  },
  {
    name: 'Lawn',
    subCategories: [],
  },
  {
    name: 'Destination Wedding',
    subCategories: [],
  }
]

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Wedcell need to read Media for Uploading Images ',
        message: 'Wedcell need to read Media for Uploading Images',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera')
    } else {
      console.log('Camera permission denied')
    }
  } catch (err) {
    console.warn(err)
  }
}
const ProductScreen = () => {
  const [Alert, SetAlert] = useState({
    visible: false,
    title: '',
    message: '',
  })
  const user = useSelector(state => state.auth.value.userData)
  const [ShowImage, setShowImage] = useState({ visible: false, image: '' })
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const [SelectedProduct, setSelectedProduct] = useState([])

  const [address, setaddress] = useState('')

  const [termsandconditions, settermsandconditions] = useState('')

  // const [user, setUser] = useState('USER', null);

  const [Loading, SetLoading] = useState(false)
  const [errorMessege, seterrorMessege] = useState('')
  const [errorMessegeP, seterrorMessegeP] = useState('')
  const [CurrentStatus, setCurrentStatus] = useState('')

  // Item Variables
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [description, setdescription] = useState('')
  const [type, settype] = useState('')
  const [category, setCategories] = useState('')
  const [subCategory, setSubcategories] = useState('')
  const [subCategoryList, setSubcategoriesList] = useState([])
  const [plans, setplans] = useState([{ name: '', value: '' }])
  const [amenities, setamenities] = useState([{ name: '', min: '', max: '' }])

  const [albums, setAlbums] = useState([{ name: '', value: '' }])
  const [vidLinks, setvidLinks] = useState([''])
  const [features, setfeatures] = useState([{ name: '', value: false }])
  const [allowedVendors, setallowedVendors] = useState([
    { name: 'Decor', value: false },
    { name: 'DJ', value: false },
    { name: 'Cake', value: false },
    { name: 'Liquor', value: false },
    { name: 'Pan Counter', value: false },
  ])
  const [terms, setterms] = useState([])
  const [state, setstate] = useState('')
  const [city, setcity] = useState('')
  const [zipcode, setzipcode] = useState('')
  const [price, setprice] = useState('')
  const [vegPerPlate, setvegPerPlate] = useState('')
  const [nonVegPerPlate, setnonVegPerPlate] = useState('')
  const [localisation, setlocalisation] = useState([])
  const [MainImage, setMainImage] = useState(null)
  const [Brochure, setBrochure] = useState(null)
  const [GalleryImages, setGalleryImages] = useState([])

  useEffect(() => {
    requestCameraPermission()
  }, [])

  // useEffect(() => {
  //   setaddress(FullAddress);
  // }, [FullAddress]);
  // const checkLogin = () => {
  //   if (user === null && !Loading) SignUp();
  //   else {
  //     SetCard(true);
  //     getClientSecret();
  //   }
  // };

  const OnBlurPhone = () => {
    if (phone.length > 10 || phone.length < 10)
      seterrorMessege('Phone no. should be 10 digit only')
    else {
      seterrorMessege('')
    }
  }

  const Goback = () => {
    navigation.goBack()
    console.log('backpress')
  }
  const handleCategoryChange = value => {
    const tempCat = CategotiesList.find(i => i.name === value)
    setSubcategoriesList(tempCat.subCategories)
    setCategories(value)
  }
  const handleVenueCategoryChange = value => {
    const tempCat = CategotiesListVenue.find(i => i.name === value)
    setSubcategoriesList(tempCat.subCategories)
    setCategories(value)
  }

  const [savedImages, setSavedImages] = useState({})

  const choosePhotosFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      multiple: true,
    })
      .then(images => {
        console.log(images)
        if (images.length > 0) {
          setSavedImages(images)
        }
      })
      .catch(err => {
        console.log(' Error fetching images from gallery ', err)
      })
  }
  const chooseMainImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setMainImage(image)
    })
  }

  const extractRequiredImageData = () => {
    let imageData = savedImages
    let imageList = []

    for (let i = 0; i < Object.keys(imageData).length; i++) {
      let data = imageData[String(i)]
      let image = {
        id: String(i),
        contentType: data.mime,
        fileSize: data.size,
        filePath: data.path,
      }

      if (Platform.OS === 'ios') {
        image.fileName = data.filename
      } else {
        let path = data.path.split('/')
        image.fileName = path[path.length - 1]
      }

      imageList.push(image)
    }
    setGalleryImages(imageList)
  }

  useEffect(() => {
    extractRequiredImageData()
  }, [savedImages, MainImage])

  const handleChoosePhoto = async single => {
    const options = {
      usedCameraButton: true,
      allowedVideo: true,
      allowedPhotograph: true,
      allowedVideoRecording: false,
      maxVideoDuration: 60,
      numberOfColumn: 3,
      maxSelectedAssets: 20,
      singleSelectedMode: true,
      doneTitle: 'Done',
      isPreview: true,
      mediaType: 'all',
      isExportThumbnail: false,
    }
    if (single) {
      const response = await MultipleImagePicker.openPicker(options)
      console.log(response)
      setMainImage(response)
      return
    }
    options.singleSelectedMode = false
    options.selectedAssets = GalleryImages
    const response = await MultipleImagePicker.openPicker(options)
    setGalleryImages(response)
    console.log(response)
    // let option = {}
    // if (!single) option.selectionLimit = 0
    // launchImageLibrary(
    //   {
    //     selectionLimit: 0,
    //   },
    //   response => {
    //     // console.log(response);
    //     // setModalVisible(false);
    //     if (response) {
    //       if (response.didCancel) return
    //       if (single) return setMainImage(response.assets[0])
    //       setGalleryImages(response.assets)
    //     }
    //   },
    // )
  }
  const ChangeValue = () => {
    plans.map(item => {
      const vali = Number(item.value)
      if (vali < 250 && vali > 100) {
        seterrorMessegeP('Value should be b/w 100-250')
      } else {
        seterrorMessegeP('')
      }
    })
  }

  const CreateItem = async () => {
    ChangeValue()
    console.log(errorMessegeP)
    console.log('-==-===-==-=-===-=-=-=-=-=-==-')
    if (errorMessegeP.length > 0) {
      return alert('Price Filed should be b/w 100 - 250')
    }
    if (!name.length || !type.length || !city.length)
      return alert('Please fill name ,type & city')
    if (MainImage === null) return alert('Please select main image')
    const config = {
      headers: { authorization: `${user.token}` },
    }
    SetLoading(true)
    setCurrentStatus('Creating Item on Server')
    const data = await axios.post(
      'http://192.168.2.122:8080/item/create',
      {
        name: name,
        contactPhone: phone,
        contactEmail: email,
        address,
        category,
        city,
        type,
        description,
        subCategory,
        plans,
        terms,
        state,
        zipcode,
        price,
        vegPerPlate,
        nonVegPerPlate,
        plans,
        amenities,
        features,
        allowedVendors,
        termsandconditions,
        vendorId: user._id,
        vidLinks: [],
        albums: [],
        Brochure: [],
      },
      config,
    )
    const Itemdata = data.data.data
    console.log('--------------====----------------')
    const mainform = new FormData()
    const imageName = MainImage.path.split('/')
    mainform.append('image', {
      name: imageName[imageName.length - 1],
      type: MainImage.mime,
      uri:
        Platform.OS === 'ios'
          ? MainImage.uri.replace('file://', '')
          : MainImage.path,
    })
    mainform.append('_id', Itemdata._id)
    console.log('--------------------------Main imagesnklnk-----------')
    setCurrentStatus('Item Created, Uploading Main Image')
    try {
      axios
        .post('http://192.168.2.122:8080/item/mainimage', mainform, config)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => console.log('E' + err))

      const Gallary = new FormData()
      GalleryImages.forEach((item, index) => {
        const galleryName = item.filePath.split('/')
        Gallary.append(`images`, {
          name: item.fileName,
          type: item.contentType,
          uri:
            Platform.OS === 'ios'
              ? item.uri.replace('file://', '')
              : item.filePath,
        })
      })
      Gallary.append('_id', Itemdata._id)
      setCurrentStatus('Uploading Gallery Images')
      await axios.post(
        'http://192.168.2.122:8080/item/imageupload',
        Gallary,
        config,
      )

      //uploading albums images
      setCurrentStatus('Uploading Albums Images')
      for (let item of albums) {
        if (item.name) await uploadAlbums(Itemdata._id, item, config)
      }
      setCurrentStatus('Uploading Brocher')
      const brocherdata = new FormData()
      if (Brochure) {
        console.log(Brochure, '******************************')
        brocherdata.append(`brochure`, {
          name: Brochure.name,
          type: Brochure.type,
          uri:
            Platform.OS === 'ios'
              ? Brochure.uri.replace('file://', '')
              : Brochure.uri,
        })
        brocherdata.append('_id', Itemdata._id)
        await axios.post(
          'http://192.168.2.122:8080/item/uploadbrochure',
          brocherdata,
          config,
        )
      }
      alert('Listing Added')
    } catch (e) {
      alert(JSON.stringify(e))
      SetLoading(false)
    }

    SetLoading(false)
  }
  const uploadAlbums = async (id, item, config) => {
    //helper function to upload albums
    const data = new FormData()
    data.append('_id', id)
    data.append('name', item.name)
    item.value.forEach((item, index) => {
      const uploadAlbumImg = item.path.split('/')
      data.append(`albums`, {
        name: uploadAlbumImg[uploadAlbumImg.length - 1],
        type: item.mime,
        uri:
          Platform.OS === 'ios' ? item.uri.replace('file://', '') : item.path,
      })
    })
    await axios.post('http://192.168.2.122:8080/item/uploadalbum', data, config)
    return
  }

  const onDocumentPress = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      })
      setBrochure(res)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log('User cancelled')
      } else {
        throw err
      }
    }
  }
  console.log(Brochure, '%%%%%%%%%%%%%%%%%%%%%')

  return (
    <SafeAreaView>
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
      {!isFocused ? (
        <View style={{ height: '100%' }} center>
          <LoaderScreen />
        </View>
      ) : SelectedProduct ? (
        <KeyboardAwareScrollView
          extraScrollHeight={50}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
        >
          <Modal
            transparent
            visible={ShowImage.visible}
            onDismiss={() => setShowImage({ visible: false, image: '' })}
            //style={{width: 260}}
          >
            <TouchableOpacity
              style={{ position: 'absolute', width: '100%', height: '100%' }}
              onPress={() => setShowImage({ visible: false, image: '' })}
            />
            <View
              bg-white
              marginT-100
              row
              spread
              centerV
              style={{
                alignSelf: 'center',
                borderRadius: 15,
                elevation: 15,
                padding: 10,
                margin: 40,
              }}
            >
              <Image
                resizeMode="contain"
                //overlayType={Image.overlayTypes.BOTTOM}
                style={{ width: win.width - 60, height: win.height / 2 }}
                source={{
                  uri: `${API_URL}/` + ShowImage.image,
                }}
              />
            </View>
          </Modal>
          <Modal
            transparent
            visible={Loading}
            // onDismiss={() => setShowImage({ visible: false, image: '' })}
            // style={{ width: 260, height: 260 }}
          >
            <View
              bg-white
              marginT-100
              spread
              centerV
              style={{
                alignSelf: 'center',
                borderRadius: 15,
                elevation: 15,
                padding: 10,
                margin: 40,
                width: 260,
                height: 260,
              }}
            >
              <View paddingT-20 center>
                <Text center>Status : {CurrentStatus}</Text>
              </View>

              <LoaderScreen />
            </View>
          </Modal>
          <View marginB-5 flex>
            <View centerV row padding-15 backgroundColor='#482ef2' flex >
              <View flex left>
                <Text text60 color='white' style={{fontWeight: 'bold'}}>Add Your Listing</Text>
              </View>
                <View flex right>
                  <Button
                      text65
                      white
                      disabled={Loading}
                      onPress={CreateItem}
                      background-primary
                      style={{ borderRadius: 10 }}
                      label="Save"
                    />
                </View>
            </View>
            <View
              flex
              // marginV-5
              // paddingH-15
              paddingV-20
              style={{ backgroundColor: '#fff' }}
              >
              <View spread flex row>
                <View flex-8 center>
                  {/* <Carousel
                  loop
                  autoplay
                    containerStyle={{
                      width: 150,
                      height: 250,
                    }}
                    pageControlPosition={Carousel.pageControlPositions.UNDER}
                    // pageControlPosition={Carousel.pageControlPositions.OVER}
                  > */}
                  <View flex centerV row>
                    <Pressable onPress={() => chooseMainImageFromGallery()}>
                      <Image
                        resizeMode="contain"
                        style={{
                          width: 350,
                          height: 300,
                        }}
                        source={
                          MainImage
                            ? { uri: 'file://' + MainImage?.path }
                            : { uri: '../../Assets/Images/default_banner.png' }
                        }
                      />
                      {/* {isUserSelectedImage?
                        <Carousel
                        loop
                        autoplay
                          containerStyle={{
                            width: 150,
                            height: 250,
                          }}
                          pageControlPosition={Carousel.pageControlPositions.UNDER}
                          // pageControlPosition={Carousel.pageControlPositions.OVER}
                        >
                      {imageList?.map((item,index)=>
                      {
                       return(
                       <Image
                          resizeMode="contain"
                          style={{ 
                            width: 150,
                            height: 250,}}
                          source={{ uri: 'file://'+ imageList[index]?.filePath }}
                        />
                      )})}
                        </Carousel>:<Image
                        resizeMode="contain"
                        style={{ width: 150, height: 250 }}
                        source={{ uri:  `${API_URL}/` + '' }}
                        />} */}
                    </Pressable>
                  </View>
                  {/* </Carousel> */}
                </View>
              </View>
            </View>
            <View
              paddingH-25
              paddingV-15
              // marginT-40
              style={{ backgroundColor: '#fff', borderRadius: 20 }}
            >
              <Text color='#e65c00' text60 center>
                Enter Details
              </Text>
              <View marginT-20>
                <Picker
                  value={type}
                  placeholder={'Listing Type'}
                  floatingPlaceholder
                  onChange={value => {
                    settype(value.value)
                    console.log(value)
                  }}
                >
                  <Picker.Item key="Vendor" value="Vendor" label="Vendor" />
                  <Picker.Item key="Venue" value="Venue" label="Venue" />
                </Picker>
                <Picker
                  value={city}
                  placeholder={'City'}
                  floatingPlaceholder
                  onChange={value => {
                    setcity(value.value)
                    console.log(value)
                  }}
                >
                  {cities.map(item => (
                    <Picker.Item key={item} value={item} label={item} />
                  ))}
                </Picker>
                {type === "Vendor" ? (
                <Picker
                  value={category}
                  placeholder={'Category'}
                  floatingPlaceholder
                  onChange={value => {
                    handleCategoryChange(value.value)
                  }}
                >
                    {CategotiesList.map(item => (
                      <Picker.Item
                        key={item.name}
                        value={item.name}
                        label={item.name}
                      />
                    ))}
                </Picker>
                ) : (
                  <Picker
                  value={category}
                  placeholder={'Category'}
                  floatingPlaceholder
                  onChange={value => {
                    handleVenueCategoryChange(value.value)
                  }}
                >
                    {CategotiesListVenue.map(item => (
                      <Picker.Item
                        key={item.name}
                        value={item.name}
                        label={item.name}
                      />
                    ))}
                </Picker>
                )}
                {subCategoryList.length > 0 && (
                  <Picker
                    value={subCategory}
                    placeholder={'Sub Category'}
                    floatingPlaceholder
                    onChange={value => {
                      setSubcategories(value.value)
                    }}
                  >
                    {subCategoryList.map(item => (
                      <Picker.Item key={item} value={item} label={item} />
                    ))}
                  </Picker>
                )}
                <TextField
                  floatingPlaceholder
                  floatOnFocus
                  text75
                  placeholder="Name of Listing "
                  value={name}
                  onChangeText={text => setName(text)}
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                />
                <TextField
                  floatingPlaceholder
                  floatOnFocus
                  text75
                  multiline
                  numberOfLines={7}
                  placeholder="Description / About "
                  value={description}
                  onChangeText={text => setdescription(text)}
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                />
                <TextField
                  floatingPlaceholder
                  floatOnFocus
                  text75
                  placeholder="Contact Email "
                  value={email}
                  onChangeText={text => setEmail(text)}
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                />
                <TextField
                  floatingPlaceholder
                  floatOnFocus
                  text75
                  keyboardType="numeric"
                  placeholder="Contact Number "
                  value={phone}
                  onChangeText={text => setPhone(text)}
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                  error={errorMessege}
                  onBlur={OnBlurPhone}
                />

                <TextField
                  floatingPlaceholder
                  floatOnFocus
                  text75
                  value={address}
                  onChangeText={text => setaddress(text)}
                  placeholder="Address "
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                />
                <TextField
                  floatingPlaceholder
                  floatOnFocus
                  text75
                  keyboardType="numeric"
                  placeholder="Zipcode "
                  value={zipcode}
                  onChangeText={text => setzipcode(text)}
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                />
                <TextField
                  floatingPlaceholder
                  floatOnFocus
                  text75
                  keyboardType="numeric"
                  placeholder="Amenity Price "
                  value={price}
                  onChangeText={text => setprice(text)}
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                />

                {type == 'Venue' ? (
                  <>
                    <TextField
                      floatingPlaceholder
                      floatOnFocus
                      text75
                      keyboardType="numeric"
                      placeholder="Veg Platter Price (in ₹)"
                      value={vegPerPlate}
                      onChangeText={text => setvegPerPlate(text)}
                      floatingPlaceholderColor={InputColors}
                      underlineColor={InputColors}
                    />
                    <TextField
                      floatingPlaceholder
                      floatOnFocus
                      text75
                      keyboardType="numeric"
                      placeholder="NonVeg Platter Price (in ₹)"
                      value={nonVegPerPlate}
                      onChangeText={text => setnonVegPerPlate(text)}
                      floatingPlaceholderColor={InputColors}
                      underlineColor={InputColors}
                    />
                    <Text style={{fontFamily: 'cursive', fontWeight: 'bold', color: '#e65c00'}} text50 marginB-5>
                      Amenities / Halls :
                    </Text>
                    <TableInputeCapacity
                      label={['Amenity / Hall Name', 'Minimum Capacity', 'Maximum Capacity']}
                      values={amenities}
                      handleUpdates={setamenities}
                    />
                    <Text style={{fontFamily: 'cursive', fontWeight: 'bold', color: '#e65c00'}} text50 marginT-5 marginB-5>
                      Vendor Allow Policy :
                    </Text>
                    <TableInpute
                      label={['Vendor', 'Allowed / Not Allowed']}
                      values={allowedVendors}
                      handleUpdates={setallowedVendors}
                      checkble
                    />
                  </>
                ) : null}
                <Text style={{fontFamily: 'cursive', fontWeight: 'bold', color: '#e65c00'}} text50 marginT-5 marginB-5>
                  Plans / Packages :
                </Text>
                <TableInpute
                  label={['Plan Name', 'Price']}
                  error={errorMessegeP}
                  handleUpdates={setplans}
                  values={plans}
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                  onBlur={OnBlurPhone}
                />

                <Text style={{fontFamily: 'cursive', fontWeight: 'bold', color: '#e65c00'}} text50 marginT-5 marginB-5>
                  Features :
                </Text>
                <TableInpute
                  label={['Feature', 'Included/ Not Included']}
                  values={features}
                  handleUpdates={setfeatures}
                  checkble
                />

                <TextField
                  floatingPlaceholder
                  floatOnFocus
                  text75
                  value={termsandconditions}
                  onChangeText={text => settermsandconditions(text)}
                  placeholder="Terms and conditions"
                  floatingPlaceholderColor={InputColors}
                  underlineColor={InputColors}
                />
              </View>

              <View>
                <Text style={{fontFamily: 'cursive', fontWeight: 'bold', color: '#e65c00'}} text50 marginT-5 marginB-5>
                  Main Gallary :
                </Text>
                <Text text70 paddingV-5>
                  All Images from this Gallary will be shown on the listing page as
                  grid please include atlease 3 images for beeter visibility
                </Text>
                <TouchableOpacity onPress={() => choosePhotosFromGallery()}>
                  <Image
                    source={GallaryImage}
                    resizeMode="contain"
                    style={{
                      height: 130,
                      width: '100%',
                      borderRadius: 10,
                    }}
                  />
                </TouchableOpacity>

                <ScrollView horizontal={true}>
                  <FlatGrid
                    itemDimension={130}
                    data={GalleryImages}
                    style={{ marginTop: 10, flex: 1 }}
                    staticDimension={300}
                    // fixed
                    spacing={10}
                    renderItem={({ item }) => (
                      <View key={item.name}>
                        <Image
                          source={{
                            uri: 'file://' + item.filePath,
                          }}
                          style={{
                            resizeMode: 'cover',
                            height: 130,
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    )}
                  />
                </ScrollView>
              </View>
              <Text style={{fontFamily: 'cursive', fontWeight: 'bold', color: '#e65c00'}} text50 marginT-5 marginB-5>
                Albums :
              </Text>
              <Text text70 paddingV-5>
                These albums will be visble with name on the listing page, please
                add a name for each Album and add images accordingly.
              </Text>
              <AlbumTable
                label={['Album Name', 'Choose Images']}
                values={albums}
                handleUpdates={setAlbums}
              />
              <Text style={{fontFamily: 'cursive', fontWeight: 'bold', color: '#e65c00'}} text50 marginT-5 marginB-5>
                Video Links :
              </Text>
              <Text text70 paddingV-5>
                In this table you can add Links of videos from any website that refers to your service and business.
              </Text>
              <LinkTable
                // label={['Album Name', 'Images']}
                values={vidLinks}
                handleUpdates={setvidLinks}
              />
              <Text style={{fontFamily: 'cursive', fontWeight: 'bold', color: '#e65c00'}} text50 marginT-5 marginB-5>
                Brochure :
              </Text>
              <Text text70 paddingV-5>
                Brochure will be downloaded on the listing page. Please add a
                PDF or Image file
              </Text>
              <View flex row spread>
                <View></View>
                {Brochure ? (
                  <Text style={{ marginTop: 10, color: 'green' }}>
                    Added Successfully
                  </Text>
                ) : (
                  <Button
                    text75
                    marginT-15
                    white
                    onPress={onDocumentPress}
                    background-primary
                    style={{ borderRadius: 10 }}
                    label="Upload Brochure"
                  />
                )}
              </View>

              {/* <View marginT-20>
                <Button
                  text65
                  white
                  disabled={Loading}
                  onPress={CreateItem}
                  background-primary
                  style={{ borderRadius: 10 }}
                  label="Add Listing"
                />
              </View> */}
            </View>
          </View>
        </KeyboardAwareScrollView>
      ) : (
        <View marginT-100 marginB-75 padding-20 flex>
          <Text text60> No Product Added to Cart</Text>
        </View>
      )}
    </SafeAreaView>
  )
}
export default ProductScreen
