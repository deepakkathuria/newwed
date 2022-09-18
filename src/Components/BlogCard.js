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
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Fontisto'
import { useSelector } from 'react-redux'

const BigCard = ({ item }) => {
  const isAuthenticated = useSelector(state => state.auth.value.isAuthenticated)
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
  return (
    <Card
      margin-20
      onPress={() =>
        navigation.navigate('BlogScreen', {
          params: { id: item.id },
        })
      }
      borderRadius={10}
      width={300}
      height={250}
      borderRadius={20}
      elevation={10}
      style={{
        width: 300,
        backgroundColor: '#289975',
        elevation: 2,
      }}
    >
      <Image
        borderRadius={10}
        resizeMode="cover"
        source={{ uri: item.image }}
        style={{ height: 250, width: '100%' }}
      />
      <View
        style={{
          position: 'absolute',
          right: 10,
          top: 10,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 7,
          backgroundColor: 'rgba(255,255,255,.6)',
        }}
        row
      >
        <Text style={{ fontWeight: 'bold' }}>5.0 </Text>
        <Icon name="star" size={20} color="#FFD700" />
      </View>

      <View
        style={{
          backgroundColor: 'rgba(255,255,255,.60)',
          justifyContent: 'space-between',
          padding: 10,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        <View style={{ borderTopColor: '#ff4d4d', borderTopWidth: 2 }} centerV>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            text60BL
            style={{ fontWeight: 'bold' }}
          >
            {item.name}
          </Text>
        </View>
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
        {isAuthenticated ? (
          <>
            <View padding-10 br60>
              <Text text50BL>Contact info</Text>
            </View>
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
    </Card>
  )
}

export default BigCard
