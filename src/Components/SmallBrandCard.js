import React, { useRef } from 'react'

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Card,
} from 'react-native-ui-lib'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Linking } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setItem } from '@/Store/CurrentItem/ItemSlice'
import { ScrollView } from 'react-native-gesture-handler'

const SmallBrandCard = ({ item, hotel, DeleteItem}) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const refRBSheet = useRef()
  return (
    <View>
        {/* <View style={{ width: '40%', flex: 1, justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
          <Button
            text75
            margin-0
            padding-0
            color="red"
            onPress={DeleteItem}
            style={{backgroundColor: 'none'}}
            label="Delete List"
          />
        </View> */}
    <Card
      row
      height={160}
      onPress={() => {
        dispatch(setItem(item))
        navigation.navigate('Item', {
          params: { id: item.id },
        })
      }}
      borderRadius={10}
      margin-20
      marginT-0
      enableShadow
      //useNative
      // backgroundColor={Colors.white}
      activeOpacity={1}
    >
      {/* <Icon
        style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}
        name={'heart'}
        size={15}
        color={'#ff4d4d'}
      /> */}
      <Image
        borderRadius={10}
        resizeMode="cover"
        source={{ uri: 'http://192.168.68.115:8080/' + item.mainImage }}
        style={{ height: 160, width: '40%' }}
      />
      

      <View
        style={{
          // backgroundColor: 'rgba(255,255,255,.65)',
          justifyContent: 'space-between',
          padding: 10,
          maxWidth: '60%',
        }}
      >
        <View
          row
          centerV
          style={{
            paddingVertical: 5,
            borderBottomColor: '#e65c00',
            borderBottomWidth: 2,
            width: '100%',
            // height: '40%',
          }}
        >
      
          <View style={{ maxWidth: '80%' }}>
            <Text style={{ fontWeight: 'bold', color: '#e65c00', fontFamily: 'cursive' }} numberOfLines={2} ellipsizeMode="tail" text60BO>
              {item.name}
            </Text>
          </View>
          {/* <View centerV row>
            <Text text70BO> 5.0</Text>
            <Icon name={'star'} size={15} color="#FFD700" />
          </View> */}
        </View>

        <View centerV row spread>
          <Text style={{ fontFamily: 'serif' }} text70BO>
            {hotel ? 'Room Price' : 'Price'}: ₹ {item.price}
          </Text>
        </View>
        {hotel && (
          <View centerV spread>
            <View>
              <Text style={{ color: 'green'}} text75>
                Veg Platter Price: ₹ {item.vegPerPlate}
              </Text>
              {/* <Text numberOfLines={1} adjustsFontSizeToFit text75 center>
              </Text> */}
            </View>
            <View>
              <Text style={{ color: 'orange'}} text75 >
                NonVeg Platter Price: ₹ {item.nonVegPerPlate}
              </Text>
              {/* <Text text75 center>
              ₹ {item.nonvegprice}
              </Text> */}
            </View>
          </View>
        )}
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
        <View padding-10 br60>
          <Text text50BL>Contact info</Text>
        </View>
        <View padding-10 br60>
          <Text style={{ fontSize: 10 }}>Phone Number</Text>
          <View row padding-10 centerV spread>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${9811186660}`)}
            >
              <Text text50BL>981-118-6660</Text>
            </TouchableOpacity>

            <View row>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: '#688688',
                  borderRadius: 20,
                  marginRight: 20,
                }}
              ></View>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: '#688688',
                  borderRadius: 20,
                }}
              ></View>
            </View>
          </View>
        </View>
        <View padding-10 br60>
          <Text style={{ fontSize: 10 }}>Email Address</Text>
          <View row padding-10 centerV spread>
            <Text text50BL>info@wedcell.com</Text>
            <View row>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: '#688688',
                  borderRadius: 20,
                }}
              ></View>
            </View>
          </View>
        </View>

        <View marginT-20 paddingH-20 style={{ justifyContent: 'flex-end' }}>
          <Button
            backgroundColor="#ff4d4d"
            label="Thank You"
            labelStyle={{ fontWeight: '600', paddingVertical: 5 }}
            //style={{ wid }}
            onPress={() => refRBSheet.current.close()}
            enableShadow
          />
        </View>
      </RBSheet>
    </Card>
    </View>
  )
}

export default SmallBrandCard
