import { View, Text, TextField, Button } from 'react-native-ui-lib'
import CheckBox from '@react-native-community/checkbox'
import React, { useState, useEffect, useMemo } from 'react'

const TableView = ({ label, values, checkble }) => {
  return (
    <View paddingV-10>
      <View
        row
        padding-5
        style={{ borderRadius: 5, backgroundColor: '#ff4d4d' }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', flex: 6 }}>
          {label ? label[0] : 'Name'}
        </Text>
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', flex: 4 }}>
          {label ? label[1] : 'Value'}
        </Text>
      </View>
      {values.map((item, index) => {
        return (
          <View
            key={index}
            row
            paddingH-5
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#e6e6e6',
              borderRadius: 5,
            }}
          >
            <View style={{ flex: 6 }}>
              <Text text65>{item.name}</Text>
            </View>
            <View paddingT-10 style={{ flex: 4 }}>
              {checkble ? (
                <CheckBox
                  tintColors={{ true: '#ff4d4d', false: '#ff4d4d' }}
                  disabled={false}
                  value={item.value}
                  //   onValueChange={value => handleChanges(value, index, false)}
                />
              ) : (
                <Text text65>{item.value}</Text>
              )}
            </View>
          </View>
        )
      })}
    </View>
  )
}

export default TableView
