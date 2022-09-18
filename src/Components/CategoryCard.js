import React, { useRef, useState } from 'react'

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Card,
  ExpandableSection,
} from 'react-native-ui-lib'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Linking, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Fontisto'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory, reset } from '@/Store/Category/CategorySlice'

const list = {
  Hotel: {
    image: require('@/Assets/Images/Hotels.jpg'),
    subCategories: [],
  },
  Resorts: {
    image: require('@/Assets/Images/resorts.jpg'),
    subCategories: [],
  },
  'Farm House': {
    image: require('@/Assets/Images/farmhouse.jpg'),
    subCategories: [],
  },
  'Banquet Hall': {
    image: require('@/Assets/Images/banquet.jpg'),
    subCategories: [],
  },
  Lawn: {
    image: require('@/Assets/Images/lawn1.jpg'),
    subCategories: [],
  },
  'Destination Wedding': {
    image: require('@/Assets/Images/destination.jpg'),
    subCategories: [],
  },
  'Bridal Wear': {
    image: require('@/Assets/Images/bwear.jpg'),
    subCategories: [],
  },
  'Groom Wear': {
    image: require('@/Assets/Images/groom.jpg'),
    subCategories: [],
  },
  Food: {
    image: require('@/Assets/Images/food.jpg'),
    subCategories: [
      'Chaat Counter',
      'Fruit Counter',
      'Catering services',
      'Pan Counter',
      'Cake',
      'Bar Tenders',
    ],
  },
  'Invites & Gifts': {
    image: require('@/Assets/Images/invite.jpg'),
    subCategories: ['invitation card', 'invitation gift'],
  },
  'Jwellery And Accessories': {
    image: require('@/Assets/Images/jwealry.jpg'),
    subCategories: [
      'FLOWER JEWELLERY ',
      'BRIDAL JEWELLERYON RENT',
      'Artificial',
      'Accessories',
    ],
  },
  'Music & Dance': {
    image: require('@/Assets/Images/music.jpg'),
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
  'Pandit Jee': {
    image: require('@/Assets/Images/pandit.jpg'),
    subCategories: [],
  },
  Makeup: {
    image: require('@/Assets/Images/makeup.jpg'),
    subCategories: ['bridal makeup', 'Groom Makeup', 'Family Makeup'],
  },
  Mehndi: {
    image: require('@/Assets/Images/mehndi.jpg'),
    subCategories: ['Bride Mehndi', 'Family Member Mehndi'],
  },
  Photographers: {
    image: require('@/Assets/Images/Photographer.jpg'),
    subCategories: [
      'Cinema/Video',
      'Album',
      'Collage Maker',
      'Drone',
      'Pre Wedding Shoot',
    ],
  },
  'Planning & Decor': {
    image: require('@/Assets/Images/plannerwed.jpg'),
    subCategories: [
      'Wedding Decor',
      'Wedding Planners',
      'Celebrities Management',
      'Hospitality Service',
    ],
  },
  'Wedding Planners': {
    image: require('@/Assets/Images/planner2.jpg'),
    subCategories: [],
  },
}

const BigCard = ({ item }) => {
  const isAuthenticated = useSelector(state => state.auth.value.isAuthenticated)
  const navigation = useNavigation()
  const refRBSheet = useRef()
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false)

  const openWhatsapp = () => {
    let url =
      'whatsapp://send?text=' +
      'Hey I found your Listing on Wedcell. I want to know about your services' +
      '&phone=91' +
      item?.mobile
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data)
      })
      .catch(() => {
        alert('Make sure WhatsApp installed on your device')
      })
  }
  if (
    (item.category === 'Bridal Wear' && item.type === 'vendor') ||
    (item.category === 'Groom Wear' && item.type === 'vendor')
  )
    return null
  return (
    <Pressable
      onPress={() => {
        dispatch(setCategory({ ...item }))
        navigation.navigate('Shop', {
          screen: 'CategoryDetails',
          params: {
            ...item,
          },
        })
      }}
    >
      <Card
        marginH-20
        marginT-50
        br40
        enableBlur
        elevation={5}
        centerV
        style={{ borderRadius: 20, maxWidth: '90%' }}
      >
        <View
          style={{
            borderRadius: 20,
            zIndex: 20,
            elevation: 2,
            backgroundColor: '#FFF',
          }}
          row
          spread
        >
          <View centerV padding-10 style={{ maxWidth: '50%', width: '40%' }}>
            <Text text60BO>{item.category}</Text>

            {list[item.category]?.subCategories.length ? (
              <Pressable onPress={() => setExpanded(!expanded)}>
                <Text>See More</Text>
              </Pressable>
            ) : null}
          </View>
          <View
            style={{
              marginTop: -30,
              maxWidth: '60%',
              height: 150,
              borderRadius: 20,
            }}
          >
            {list[item.category]?.image ? (
              <Image
                resizeMode="cover"
                style={{
                  borderRadius: 20,
                  maxHeight: 150,
                  width: 200,
                }}
                source={list[item.category].image}
              />
            ) : null}
          </View>
        </View>
        {list[item.category]?.subCategories.length ? (
          <ExpandableSection
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
          >
            <View padding-10>
              {list[item.category]?.subCategories.map((item1, index) => (
                <Text key={item1} text65>
                  {index + 1}. {item1}
                </Text>
              ))}
            </View>
          </ExpandableSection>
        ) : null}
      </Card>
    </Pressable>
  )
}

export default BigCard
