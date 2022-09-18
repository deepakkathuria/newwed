import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text, Button, TextField } from 'react-native-ui-lib'
import { Brand, SmallBrandCard } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'

const index = navigation => {
  const dispatch = useDispatch()
  const Values = useSelector(state => state.product.value)
  return (
    <ScrollView style={{ marginBottom: 60 }}>
      <View
        paddingH-25
        paddingV-15
        marginT-65
        style={{ backgroundColor: '#fff', borderRadius: 20 }}
      >
        <Text text60 center>
          Reset Password
        </Text>
        <View marginT-20>
          <TextField
            floatingPlaceholder
            floatOnFocus
            text75
            // value={email}
            // onChangeText={text => setEmail(text)}
            placeholder="Phone Number"
            floatingPlaceholderColor={{
              default: 'grey',
              error: 'red',
              focus: 'grey',
              disabled: 'grey',
            }}
            underlineColor={{
              default: 'grey',
              error: 'red',
              focus: 'grey',
              disabled: 'grey',
            }}
          />
        </View>
        <View marginT-10>
          <Button
            //onPress={Login}
            text65
            white
            background-primary
            style={{ borderRadius: 10 }}
            label="Continue"
          />
          <Button
            // onPress={() => {
            //   setForgot(true)
            //   setpassword('')
            //   seterrorMessege('')
            // }}
            link
            text75
            primary
            label="I forgot my password"
            marginT-10
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})
