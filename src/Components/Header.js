import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Picker,
} from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/Fontisto'
import { useDispatch, useSelector } from 'react-redux'
import { setCity, reset } from '@/Store/City/CitySlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

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
const Header = ({ name }) => {
  const navigation = useNavigation()
  //const [city, setCity] = useState('')
  const dispatch = useDispatch()
  const cityName = useSelector(state => state.city.value)

  useEffect(() => {
    console.log('cityName', cityName)
  }, [])
  const changeCity = newcity => {
    AsyncStorage.setItem('@City', newcity)
    dispatch(setCity(newcity))
  }
  return (
    <View row spread>
      <View flex left>
        <Text numberOfLines={1} adjustsFontSizeToFit text50>
          {name}
        </Text>
      </View>

      
    </View>
  )
}

export default Header
