import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import {
  View,
  Text,
  Button,
  Image,
  Card,
  LoaderScreen,
  TextField,
} from 'react-native-ui-lib'
import { Brand, SmallBrandCard } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Fontisto'
import { setSearch } from '../../Store/Search/SearchSlice'

const index = ({ navigatation, route }) => {
  const isFocused = useIsFocused()

  const dispatch = useDispatch()
  const City = useSelector(state => state.city.value)
  const Search = useSelector(state => state.search.value)
  const [Items, SetItems] = useState([])
  const [Loading, SetLoading] = useState(false)
  const [FirstLoad, SetFirstLoad] = useState(true)
  const [type, Settype] = useState('venue')
  const [Offset, SetOffset] = useState('0')

  const OnChange = value => {
    dispatch(setSearch(value))
  }
  const FetchData = () => {
    SetLoading(true)
    axios
      .post('https://api.wedcell.com/front-venue-listing-search', {
        name: Search,
        offset: Offset,
        location: City,
      })
      .then(res => {
        console.log('api call failed')
        if (res.data.success) {
          let newData = Items.concat(res.data.list)
          // console.log(newData)
          SetItems(newData)
          SetLoading(false)
        } else {
          console.log('api call failed')
        }
      })
      .catch(e => console.log('Someting went wrong', e))
  }

  return (
    <ScrollView style={{ marginBottom: 60 }}>
      <View paddingV-20>
        <View row padding-20 centerV spread>
          <Text text50>Search</Text>
        </View>
        <View padding-20 row spread>
          <View style={{ width: '80%', height: 50, marginRight: 10 }}>
            <TextField
              text75
              placeholder="Type Venue/Vendor name"
              onChangeText={OnChange}
              containerStyle={{ height: 50 }}
            />
          </View>
          <TouchableOpacity onPress={FetchData}>
            <View
              marginV-5
              style={{
                backgroundColor: '#ff4d4d',
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 10,
                height: 40,
              }}
            >
              <Icon name="search" size={25} color={'#ffffff'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {Loading ? (
        <View center style={{ width: '100%' }}>
          <LoaderScreen center color="#ff4d4d" />
        </View>
      ) : (
        <>
          {Items.map(item => (
            <SmallBrandCard key={item.name} item={item} />
          ))}
        </>
      )}
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})
