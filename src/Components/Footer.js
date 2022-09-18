import React, { useRef, useState } from 'react'

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Card,
  FloatingButton,
} from 'react-native-ui-lib'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Linking, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Fontisto'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { loadPartialConfig } from '@babel/core'

const BigCard = ({ item }) => {
  const isAuthenticated = useSelector(state => state.auth.value.isAuthenticated)
  const user = useSelector(state => state.auth.value.userData)
  const navigation = useNavigation()
  const refRBSheet = useRef()

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
  const getinTouch = () => {
    if (isAuthenticated)
      axios
        .post('https://api.wedcell.com/customer/view-contact', {
          customer_id: user.customer_vendor_id,
          access_token: 'sdfs',
          vendor_id: item.id,
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
  }
  const addtoWhilist = () => {
    if (isAuthenticated)
      axios
        .post('https://api.wedcell.com/customer/add-wishlist', {
          token: user.mobile,
          product_id: item.id,
          customer_id: user.customer_vendor_id,
        })
        .then(res => {
          alert('Added to Wishlist')
        })
        .catch(e => console.log('Someting went wrong', e))
  }
  return (
    <View
      style={{
        backgroundColor: 'rgba(255,255,255,.65)',
        // justifyContent: 'space-between',
        padding: 10,
        // position: 'absolute',
        // bottom: 0,
        // right: 10,
        width: '100%',
      }}
      row
      spread
    >
      <View
        marginV-5
        style={{
          backgroundColor: '#ff4d4d',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 20,
        }}
      >
        <TouchableOpacity onPress={addtoWhilist}>
          <Text white>Add To WishList</Text>
        </TouchableOpacity>
      </View>
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
          onPress={() => {
            refRBSheet.current.open()
            getinTouch()
          }}
        >
          <Text white>Get In Touch</Text>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={isAuthenticated ? 350 : 200}
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
        {isAuthenticated ? (
          <>
            <View padding-10 br60>
              <Text text70>Phone Number</Text>
              <View row padding-10 centerV spread>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${item?.mobile}}`)}
                >
                  <Text text50BL>{item?.mobile}</Text>
                </TouchableOpacity>

                <View spread row>
                  <TouchableOpacity onPress={openWhatsapp}>
                    <View marginR-20>
                      <Icon name="whatsapp" size={20} color={'#ff4d4d'} />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${item?.mobile}`)}
                  >
                    <View marginR-20>
                      <Icon name="phone" size={20} color={'#ff4d4d'} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View padding-10 br60>
              <Text text70>Email Address</Text>
              <View row padding-10 centerV spread>
                <Text text50BL>{item?.email}</Text>
                <View row>
                  <View marginR-20>
                    <Icon name="email" size={20} color={'#ff4d4d'} />
                  </View>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View padding-10 br60>
              <Text text60BL>Need To Login to see Contact Details</Text>
            </View>
          </>
        )}
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
    </View>
  )
}

export default BigCard
