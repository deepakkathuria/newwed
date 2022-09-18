import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text, Button, Carousel } from 'react-native-ui-lib'
import { Brand, SmallBrandCard } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

const index = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const Values = useSelector(state => state.product.value)
  const isFocused = useIsFocused()

  // useEffect(() => {
  //   if (isFocused)
  //     if (route.params. !== undefined) {
  //       const { category, type } = route.params
  //       navigation.navigate('CategoryDetails', { category, type })
  //     }
  //   }
  // }, [isFocused])
  return (
    <ScrollView style={{ marginBottom: 60 }}>
      <View row padding-20 centerV spread>
        <Text text50>Shop </Text>
        <View row spread>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: '#688688',
              borderRadius: 20,
              marginRight: 20,
            }}
          ></View>
        </View>
      </View>
      <View paddingH-20 paddingV-10 centerV>
        <Text text50>Cat 01 </Text>
      </View>
      <Carousel
        pageControlPosition={Carousel.pageControlPositions.UNDER}
        autoplay
        autoplayInterval={750}
        loop
        // pageControlPosition={Carousel.pageControlPositions.OVER}
      >
        <View
          style={{ width: 400, height: 400, backgroundColor: '#66ffe0' }}
        ></View>
        <View
          style={{ width: 400, height: 400, backgroundColor: '#ff6363' }}
        ></View>
        <View
          style={{ width: 400, height: 400, backgroundColor: '#8763ff' }}
        ></View>
        <View
          style={{ width: 400, height: 400, backgroundColor: '#66ffe0' }}
        ></View>
      </Carousel>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
      </ScrollView>

      <View paddingH-20 paddingV-10 centerV>
        <Text text50>Cat 02 </Text>
      </View>
      <Carousel
        pageControlPosition={Carousel.pageControlPositions.UNDER}
        autoplay
        autoplayInterval={750}
        loop
        // pageControlPosition={Carousel.pageControlPositions.OVER}
      >
        <View
          style={{ width: 400, height: 400, backgroundColor: '#d88fff' }}
        ></View>
        <View
          style={{ width: 400, height: 400, backgroundColor: '#66ffe0' }}
        ></View>
        <View
          style={{ width: 400, height: 400, backgroundColor: '#ff6363' }}
        ></View>

        <View
          style={{ width: 400, height: 400, backgroundColor: '#66ffe0' }}
        ></View>
      </Carousel>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#688688',
            borderRadius: 80,
          }}
          margin-20
        ></View>
      </ScrollView>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})
