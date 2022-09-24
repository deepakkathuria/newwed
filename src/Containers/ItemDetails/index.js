import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Linking,
} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import YoutubePlayer from "react-native-youtube-iframe";
import WebView from 'react-native-webview';

import {
  View,
  Text,
  Button,
  Image,
  Card,
  Carousel,
  LoaderScreen,
  FloatingButton,
  AnimatedImage,
} from 'react-native-ui-lib'
import { FlatGrid } from 'react-native-super-grid'
import { Brand, HTMLTable, Footer, TableView } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Fontisto'
import ShareIcon from '@/Assets/Images/share.png'
import TableViewAmenity from '../../Components/TableViewAmenity'

const index = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const refRBSheet = useRef()

  const dispatch = useDispatch()
  const userdata = useSelector(state => state.auth.value.userData)
  const Item = useSelector(state => state.item.value)
  console.log(Item,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit")
  console.log(Item, "item brochure............................manish")
  // const [Items, SetItems] = useState([])
  // const [Item.images, SetItem.images] = useState([])
  const [error, setError] = useState(false)

  const [Loading, SetLoading] = useState(false)
  // const [Item, SetItem] = useState({})
  const [CurrentPage, setCurrentPage] = useState(0)

  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => {
    
        setPlaying((prev) => !prev);
    
      }

  //const [Loading, SetLoading] = useState(true)

  // const descriptionParser = text => {
  //   let newtext = text.replace('<p>', '')
  //   newtext = newtext.replace('</p>', '')
  //   return newtext
  // }
  // useEffect(() => {
  //   if (!isFocused) {
  //     SetLoading(true)
  //     return
  //   }
    // console.log('useEffect', Item)
    // axios
    //   .post('https://api.wedcell.com/vendor/my-listing-view', {
    //     mobile: '8979607766',
    //     access_token: 'fhg',
    //     user_vendor_id: '1',
    //     listing_id: route.params.id,
    //   })
    //   .then(res => {
    //     if (res.data.success) {
    //       SetItem(res.data.view)
    //       SetItem.images(res.data.imglist)
    //       console.log(res.data.view)
    //       SetLoading(false)
    //     } else {
    //       setError(true)
    //       SetLoading(false)
    //       console.log(res.data)
    //     }
    //   })
    //   .catch(e => {
    //     setError(true)
    //     SetLoading(false)
    //     console.log('Someting went wrong')
    //   })
  // }, [isFocused])
  console.log(Item.mainImage,"*******************")

  return (
    <ScrollView
      style={{
        marginBottom: 60,
        paddingHorizontal: 10,
      }}
      horizontal={false}
    >
      {Loading ? (
        <View center style={{ width: '100%', paddingTop: 100 }}>
          <LoaderScreen center color="#ff4d4d" />
        </View>
      ) : error ? (
        <View center style={{ width: '100%', paddingTop: 100 }}>
          <Text center>
            We hit a snag getting the Item You're Looking for try in some time
          </Text>
        </View>
      ) : (
        <>
          <View
            marginT-10
            style={{
              shadowColor: '#ff4d4d',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.6,
              shadowRadius: 16.0,
              elevation: 24,
              zIndex: 1,
              height: 350,
              borderRadius: 15,
              marginBottom: 15,
            }}
          >
            <Carousel
              //pageControlPosition={Carousel.pageControlPositions.UNDER}
              autoplay
              autoplayInterval={1200}
              loop={Item.images.length > 0 ? true : false}
              pageControlPosition={Carousel.pageControlPositions.OVER}
            >
              <Image
                // containerStyle={{
                //   backgroundColor: '#ff4d4d',
                //   marginBottom: 10,
                //   borderRadius: 15,
                // }}
                style={{ resizeMode: 'cover', height: 350, borderRadius: 15, backgroundColor: '#ff4d4d',
                marginBottom: 10,
                borderRadius: 15, }}
                resizeMode="cover"
                source={{
                  uri: 'http://192.168.2.122:8080/' + Item.mainImage,
                }}
                // loader={<LoaderScreen color="#FFF" />}
                // animationDuration={100}
                // useNativeDriver             
              />
              {Item.images.map(img => (
                <View key={img}>
                  <Image
                    source={{
                      uri: 'http://192.168.2.122:8080/' + img,
                    }}
                    style={{
                      resizeMode: 'cover',
                      height: 350,
                      borderRadius: 15,
                    }}
                  />
                </View>
              ))}
            </Carousel>
          </View>
          <View
            spread
            style={{
              marginTop: -20,
              paddingVertical: 5,
              paddingTop: 10,
              paddingBottom: 5,
              borderBottomColor: '#ff4d4d',
              borderBottomWidth: 2,
              backgroundColor: '#ffffff',
              zIndex: 20,
              marginBottom: 5,
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
          > 
            <View row spread>
            <Text text50>{Item.name}</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('EditDetails')}>
            <Text text50>Edit</Text>
            </TouchableOpacity>
            </View>
            <View marginT-5 row centerV>
              <Icon name={'map-marker-alt'} size={15} color={'#ff4d4d'} />
              <Text text70 numberOfLines={1} ellipsizeMode="tail">
                {Item?.address}
              </Text>
            </View>

            <View paddingH-10 spread row>
              <View text50BL row>
                <Text text60BO>Price</Text>
                <Text text60BO>: {Item.price}</Text>
              </View>
              <View centerV row>
                <Text text60BO>5.0</Text>
                <Icon name={'star'} size={20} color="#FFD700" />
              </View>
            </View>
            {Item.nonVegPerPlate ? (
              <View paddingH-10 spread row>
                <View text50BL row>
                  <Text text65>Veg Per Plate</Text>
                  <Text text65>: {Item.vegPerPlate}</Text>
                </View>
                <View text50BL row>
                  <Text text65>Non Veg Per Plate</Text>
                  <Text text65>: {Item.nonVegPerPlate}</Text>
                </View>
              </View>
            ) : null}

            <View row>
              <Footer item={Item} />
            </View>
            <View flex style={{ justifyContent: 'flex-end' }}>
              {/* <Button
                size={'small'}
                style={{ marginBottom: 10 / 4, marginLeft: 10 }}
                backgroundColor={'#ff4d4d'}
                lable="animated"
                iconSource={ShareIcon}
                onPress={() => console.log('Share')}
                iconOnRight
                animateLayout
                animateTo={'left'}
              /> */}
            </View>
          </View>
          {Item.type === 'Venue' ? (
            <View paddingT-20>
              <Text text50>Vendor Allow Policy:</Text>
              <TableView
                values={Item.allowedVendors}
                label={['Vendor', 'Allowed']}
                data={Item.allowedVendors}
                checkble
              />
            </View>
          ) : null}

          {Item.amenities.length && Item.amenities[0].name !== '' ? (
            <View>
              <Text text50
              style={{ color: '#e65c00', fontFamily: 'cursive'
            }}>
              Amenities :</Text>
              <TableViewAmenity
                values={Item.amenities}
                label={['Amenity', 'Minimum Capacity', 'Maximum Capacity']}
                data={Item.allowedVendors}
              />
            </View>
          ) : null}

          {Item.features.length && Item.features[0].name !== '' ? (
            <View>
              <Text text50>Features :</Text>
              <TableView
                checkble
                values={Item.features}
                label={['Name', 'Included']}
                // data={Item.allowedVendors}
              />
            </View>
          ) : null}

          {Item.plans.length && Item.plans[0].name !== '' ? (
            <View>
              <Text text50> Plans / Packages :</Text>
              <TableView
                values={Item.plans}
                label={['Plan Name', 'Price']}
                // data={Item.allowedVendors}
              />
            </View>
          ) : null}

          <Text text50BL>Description:</Text>

          <Text style={{ textAlign: 'justify' }} text70 marginB-20>
            {Item.description}
          </Text>
          <Text text50BL>Terms and Conditions:</Text>

          <Text style={{ textAlign: 'justify' }} text70 marginB-20>
            {Item.termsandconditions}
          </Text>

          <View
            style={{
              borderRadius: 10,
              backgroundColor: '#fff',
              elevation: 10,
              paddingHorizontal: 5,
            }}
            row
            spread
          >
            <Pressable onPress={() => setCurrentPage(0)}>
              <Text
                style={{
                  paddingVertical: 10,
                  borderBottomColor: '#ff4d4d',
                  borderBottomWidth: CurrentPage === 0 ? 2 : 0,
                  color: '#e65c00', fontFamily: 'cursive'
                }}
                text50BL
              >
                Image Gallery{' '}
              </Text>
            </Pressable>
            <Pressable onPress={() => setCurrentPage(1)}>
              <Text
                style={{
                  paddingVertical: 10,
                  borderBottomColor: '#ff4d4d',
                  borderBottomWidth: CurrentPage === 1 ? 2 : 0,
                  color: '#e65c00', 
                  fontFamily: 'cursive'

                }}
                text50BL
              >
                Albums
              </Text>
            </Pressable>
            <Pressable onPress={() => setCurrentPage(2)}>
              <Text
                style={{
                  paddingVertical: 10,
                  borderBottomColor: '#ff4d4d',
                  borderBottomWidth: CurrentPage === 2 ? 2 : 0,
                  color: '#e65c00', fontFamily: 'cursive'

                }}
                text50BL
              >
                Videos
              </Text>
            </Pressable>
          </View>

          {CurrentPage === 0 && (
            <ScrollView
              horizontal={true}
              style={{ width: '100%', height: '100%' }}
            >
              <FlatGrid
                itemDimension={130}
                data={Item.images}
                style={{ marginTop: 10, flex: 1 }}
                // staticDimension={300}
                // fixed
                spacing={10}
                renderItem={({ item }) => (
                  <View key={item}>
                    <Image
                      source={{
                        uri: 'http://192.168.2.122:8080/' + item,
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
          )}
          {CurrentPage === 1 && (
            <ScrollView
              horizontal={true}
              style={{ width: '100%', height: '100%' }}
            >
              <FlatGrid
                itemDimension={130}
                data={Item.albums}
                style={{ marginTop: 10, flex: 1 }}
                // staticDimension={300}
                // fixed
                spacing={10}
                renderItem={({ item,index }) => (
                  <>
                  <View key={item}>
                    <Image
                    onPress={() => {
                      refRBSheet.current.open()
                    }}
                      source={{
                        uri: 'http://192.168.2.122:8080/' + item.images[0],
                      }}
                      style={{
                        resizeMode: 'cover',
                        height: 130,
                        borderRadius: 10,
                      }}
                    />
                    <Text center text60>
                      {item.name}
                    </Text>
                  </View>
                  <RBSheet
                  ref={refRBSheet}
                  closeOnDragDown={true}
                  closeOnPressMask={false}
                  height={350}
                  customStyles={{
                    wrapper: {
                      backgroundColor: 'transparent',
                    },
                    container: { borderRadius: 35 },
                    draggableIcon: {
                      backgroundColor: '#000',
                    },
                  }}
                >

                </RBSheet>
                </>
                )}
              />
            </ScrollView>
          )}
          {CurrentPage === 2 && (
            <ScrollView
              horizontal={true}
              style={{ width: '100%', height: '100%' }}
            >
              <FlatGrid
                itemDimension={130}
                data={Item.vidLinks}
                style={{ marginTop: 10, flex: 1 }}
                // staticDimension={300}
                // fixed
                spacing={10}
                renderItem={({ item,index }) => {
                  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                  var match = item.match(regExp);
                  console.log(match,"matchhhhhhhhhhhhhhhhh")
                  let videoLink 
                  if (match && match[2].length == 11) {
                   videoLink=match[2];
                   console.log(typeof(videoLink),"videolinkkkkkkkkkkkkkkkkkkkkkkkkkk")

                } else {
                 //error
                  }
                  return(
                  <View key={item}>
                    <YoutubePlayer
                    height={5000}
                    play={playing}
                    videoId={videoLink}
                    allowsFullscreenVideo={true}
                    scalesPageToFit={true}
            />
            {/* <WebView
    style={{ alignSelf: 'stretch' }}
    scalesPageToFit={true}
        source={{uri:`https://www.youtube.com/watch?v=${videoLink}`}}
    /> */}
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    {/* <TouchableOpacity onPress={()=> Linking.openURL(`https://www.youtube.com/watch?v=${videoLink}`)}>
                    <Text>{`Video Title ${index+1}`}, Click Me</Text>
                    </TouchableOpacity> */}
                  </View>
                )}}
              />
            </ScrollView>
          )}

          <View
            centerV
            marginV-5
            style={{
              backgroundColor: '#ff4d4d',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
            }}
          >
            <TouchableOpacity
              onPress={
                Item.brochure
                  ? () =>
                      Linking.openURL(
                        'http://192.168.2.122:8080/' + Item.brochure,
                      )
                  : console.log('No Brochure')
              }
            >
              <Text white>Download Brochure</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})
