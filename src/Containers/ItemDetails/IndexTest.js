import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Linking,
} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import YoutubePlayer from "react-native-youtube-iframe";
import WebView from 'react-native-webview';

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
import { Brand, HTMLTable, Footer, TableView } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Fontisto'
import ShareIcon from '@/Assets/Images/share.png'
import TableViewAmenity from '../../Components/TableViewAmenity'

const IndexTest = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const refRBSheet = useRef()

  const dispatch = useDispatch()
  const userdata = useSelector(state => state.auth.value.userData)
  const Item = useSelector(state => state.item.value)
  console.log(Item.albums,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit")
  console.log(Item, "item brochure............................manish")
  // const [Items, SetItems] = useState([])
  // const [Item.images, SetItem.images] = useState([])
  const [error, setError] = useState(false)

  const [Loading, SetLoading] = useState(false)
  // const [Item, SetItem] = useState({})
  const [CurrentPage, setCurrentPage] = useState(0)

  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => {
    
        setPlaying((prev) => !prev);
    
      }


return (
   <>
      {Loading ? (
        <View center style={{ width: '100%', paddingTop: 100 }}>
          <LoaderScreen center color="#ff4d4d" />
        </View>
      ) : error ? (
        <View center style={{ width: '100%', paddingTop: 100 }}>
          <Text center>
            We hit a snag getting the Item You're Looking for try in some time
          </Text>
        </View>
      ) : (
        <>
         


         

         

         

          

          <View
            style={{
              borderRadius: 10,
              backgroundColor: '#fff',
              elevation: 10,
              paddingHorizontal: 5,
            }}
            row
            spread
          >
            <Pressable onPress={() => setCurrentPage(0)}>
              <Text
                style={{
                  paddingVertical: 10,
                  borderBottomColor: '#ff4d4d',
                  borderBottomWidth: CurrentPage === 0 ? 2 : 0,
                  color: '#e65c00', fontFamily: 'cursive'
                }}
                text50BL
              >
                Image Gallery{' '}
              </Text>
            </Pressable>
            <Pressable onPress={() => setCurrentPage(1)}>
              <Text
                style={{
                  paddingVertical: 10,
                  borderBottomColor: '#ff4d4d',
                  borderBottomWidth: CurrentPage === 1 ? 2 : 0,
                  color: '#e65c00', 
                  fontFamily: 'cursive'

                }}
                text50BL
              >
                Albums
              </Text>
            </Pressable>
            <Pressable onPress={() => setCurrentPage(2)}>
              <Text
                style={{
                  paddingVertical: 10,
                  borderBottomColor: '#ff4d4d',
                  borderBottomWidth: CurrentPage === 2 ? 2 : 0,
                  color: '#e65c00', fontFamily: 'cursive'

                }}
                text50BL
              >
                Videos
              </Text>
            </Pressable>
          </View>

         
          {CurrentPage === 1 && (
            <ScrollView
              horizontal={true}
              style={{ width: '100%', height: '100%' }}
            >
              <FlatGrid
                itemDimension={130}
                data={Item.albums}
                style={{ marginTop: 10, flex: 1 }}
                // staticDimension={300}
                // fixed
                spacing={10}
                renderItem={({ item,index }) => (
                  <>
                  <View key={item}>
                  <TouchableOpacity onPress={() => viewer()}>

                    <Image
                    onPress={() => {
                      console.log("22222222222222222222222222222222222222222222222222222222222222222222222")
                    }}
                      source={{
                        uri: 'http://192.168.68.115:8080/' + item.images[0],
                      }}
                      style={{
                        resizeMode: 'cover',
                        height: 130,
                        borderRadius: 10,
                      }}
                    />
                    </TouchableOpacity>

                    <Text center text60>
                      {item.name}
                    </Text>
                  </View>
                </>
                )}
              />
            </ScrollView>
          )}
          
        </>
      )}
      </>
  )
}

export default IndexTest

const styles = StyleSheet.create({})
