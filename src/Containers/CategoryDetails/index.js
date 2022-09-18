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
import { Brand, SmallBrandCard, Header } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import { setCategory, reset } from '../../Store/Category/CategorySlice'

const index = ({ navigatation, route }) => {
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

  const FetchData = () => {
    console.log('FetchData')
      const config = {
      headers: { authorization: `${user.token}` },
    };
    axios
      .post('http://192.168.39.155:8080/item/get', {
        _id:user._id,
        category: category,
        type: type,
        offset: Offset,
        location: City,
      },config)
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
      .catch(e => console.log('Someting went wrong', e))
  }

  return (
    <ScrollView style={{ marginBottom: 60 }}>
      <View paddingV-20>
        <View row padding-20 centerV spread>
          <Header name={category} />
        </View>
      </View>
      {Loading ? (
        <View center style={{ width: '100%' }}>
          <LoaderScreen center color="#ff4d4d" />
        </View>
      ) : Items.length > 0 ? (
        <>
          {Items.map(item => (
            <SmallBrandCard
              key={item.name}
              item={item}
              hotel={category === 'Hotel' ? true : false}
            />
          ))}
        </>
      ) : (
        <Text center>No listing found, Comming to this area shortly : )</Text>
      )}
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})
