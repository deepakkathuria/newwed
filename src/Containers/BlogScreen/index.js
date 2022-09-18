import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native'
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
import { Brand, HTMLTable, Footer } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Fontisto'

const index = ({ navigatation, route }) => {
  const isFocused = useIsFocused()

  const dispatch = useDispatch()
  const userdata = useSelector(state => state.auth.value.userData)
  const [Items, SetItems] = useState([])
  const [Images, SetImages] = useState([])

  const [Loading, SetLoading] = useState(true)
  const [Item, SetItem] = useState({})
  //const [Loading, SetLoading] = useState(true)

  const descriptionParser = text => {
    let newtext = text.replace('<p>', '')
    newtext = newtext.replace('</p>', '')
    return newtext
  }
  useEffect(() => {
    if (!isFocused) {
      SetLoading(true)
      return
    }
    const data = new FormData()
    data.append('blog_id', route.params.id)
    axios
      .post('https://api.wedcell.com/front-blog-detail', data)
      .then(res => {
        console.log(res.data)
        if (res.data.success) {
          SetItem(res.data.detail)

          //SetImages(res.data.imglist)
          // console.log(res.data.view)
          SetLoading(false)
        }
      })
      .catch(e => console.log('Someting went wrong'))
  }, [isFocused])

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
            <AnimatedImage
              containerStyle={{
                backgroundColor: '#ff4d4d',
                marginBottom: 10,
                borderRadius: 15,
              }}
              style={{ resizeMode: 'cover', height: 350, borderRadius: 15 }}
              resizeMode="cover"
              source={{ uri: Item.image }}
              loader={<LoaderScreen color="#FFF" />}
              animationDuration={100}
            />
          </View>
          <View
            spread
            style={{
              marginTop: -10,
              paddingVertical: 5,
              paddingTop: 10,
              paddingBottom: 5,
              borderBottomColor: '#ff4d4d',
              borderBottomWidth: 2,
              backgroundColor: '#ffffff',
              zIndex: 2,
              marginBottom: 5,
              borderRadius: 10,
            }}
          >
            <Text text50>{Item?.name}</Text>
          </View>

          <View>
            <HTMLTable
              table={{
                html: Item.description,
              }}
            />
          </View>
        </>
      )}
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})
