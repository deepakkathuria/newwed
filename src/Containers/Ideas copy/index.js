import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text, Button, Carousel } from 'react-native-ui-lib'
import { Brand, SmallBrandCard } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'

const index = () => {
  const dispatch = useDispatch()
  const Values = useSelector(state => state.product.value)
  return (
    <ScrollView style={{ marginBottom: 60 }}>
      <View row padding-20 centerV spread>
        <Text text50>Ideas </Text>
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

      <View row padding-20 centerV spread>
        <Text text50>Comming Soon </Text>
      </View>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})
