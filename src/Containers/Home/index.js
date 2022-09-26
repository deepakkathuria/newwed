import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import {
  View,
  Text,
  Button,
  Image,
  Card,
  LoaderScreen,
} from 'react-native-ui-lib'
import { Brand, SmallBrandCard, Header, ListingHeader } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import { setCategory, reset } from '../../Store/Category/CategorySlice'

const index = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const City = useSelector(state => state.city.value)
  const { category, type } = useSelector(state => state.category.value)
  const user = useSelector(state => state.auth.value.userData)
  const [Items, SetItems] = useState([])
  const [Loading, SetLoading] = useState(true)

  const [Offset, SetOffset] = useState('0')
  useEffect(() => {
    SetLoading(true)
    if (!isFocused) {
      return
    }
    console.log('useEffect', category, type)
    FetchData()
  }, [category, type, City])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SetLoading(true)
      FetchData()
    })
    return unsubscribe
  }, [navigation])

  const FetchData = () => {
    console.log('FetchData')
    const config = {
      headers: { authorization: `${user.token}` },
    }
    axios
      .post(
        'http://192.168.68.115:8080/item/get',
        {
          _id: user._id,
          category: category,
          type: type,
          offset: Offset,
          location: City,
        },
        config,
      )
      .then(res => {
        if (res.data.success) {
          let newData = []
          if (res.data.data.length > 0) newData = Items.concat(res.data.data)
          console.log(newData)
          SetItems(newData)
          SetLoading(false)
        } else {
          SetItems([])
          console.log(res.data)
          SetLoading(false)
          console.log('api call failed')
        }
      })
      .catch(e => alert('Someting went wrong: check your connection', e))
  }
  return (
    <ScrollView style={{ marginBottom: 60 }}>
      <View paddingV-8>
        <View row padding-20 centerV spread>
          <ListingHeader name="Your Listings" />
        </View>
      </View>
      {Loading ? (
        <View center style={{ width: '100%' }}>
          <LoaderScreen center color="#ff4d4d" />
        </View>
      ) : Items.length > 0 ? (
        <>
          <View flex right paddingR-25>
            <Button
                onPress={() => navigation.navigate('CreateItem')}
                // link
                // text75
                // color="#ff4d4d"
                
                // primary
                // size={Button.sizes.medium}
                // size={'20'} 
                // backgroundColor={Colors.red30}
                label="Add New Listing"
                marginB-10
              />
            </View>
          {Items.map(item => (
            <SmallBrandCard
              key={item.name}
              item={item}
              hotel={category === 'Hotel' ? true : false}
            />
          ))}
          
        </>
      ) : (
        <>
          <Text center>No listing found, Comming to this area shortly : )</Text>
          <Button
            onPress={() => navigation.navigate('CreateItem')}
            link
            text75
            color="#ff4d4d"
            //primary
            label="Add Your First Listing"
            marginT-10
          />
        </>
      )}
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})
