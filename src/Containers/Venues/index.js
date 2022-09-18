import React, { useRef, useState, useEffect } from 'react'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native'
import { View, Text, LoaderScreen } from 'react-native-ui-lib'
import { Brand, SmallBrandCard, CategoryCard, Header } from '@/Components'
import RBSheet from 'react-native-raw-bottom-sheet'
import profile from '@/Assets/Images/profile.png'
import { setCategory, reset } from '../../Store/Category/CategorySlice'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const index = ({ navigation }) => {
  const dispatch = useDispatch()
  const refRBSheet = useRef()
  const [venues, setvenues] = useState([])
  const [Shop, setShop] = useState([])
  const [vendors, setvendors] = useState([])
  const [Loading, setLoading] = useState(true)
  useEffect(async () => {
    setLoading(true)
    try {
      let blogPosts = await AsyncStorage.getItem('Categories')
      if (blogPosts != null) {
        const data = JSON.parse(blogPosts)
        setvendors(data.data.vendor)
        setvenues(data.data.venue)
        setShop(data.data.shopnow)
      } else {
        const data = await axios.post(
          'https://api.wedcell.com/front-main-category',
          {},
        )
        setvendors(data.data.vendor)
        setvenues(data.data.venue)
        setShop(data.data.shopnow)
        await AsyncStorage.setItem('Categories', JSON.stringify(data))
      }
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }, [])
  return (
    <ScrollView style={{ marginBottom: 70 }}>
      <View row padding-20 centerV spread>
        <Header name={'Categories'} />
      </View>
      {Loading ? (
        <View center style={{ width: '100%', paddingTop: 100 }}>
          <LoaderScreen center color="#ff4d4d" />
        </View>
      ) : (
        <>
          <Text marginH-20 marginV-20 text60>
            Venues
          </Text>
          {venues.map((item, index) => (
            <CategoryCard item={item} key={index} />
          ))}
        </>
      )}
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})
