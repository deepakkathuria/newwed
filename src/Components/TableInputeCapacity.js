import { View, Text, TextField, Button } from 'react-native-ui-lib'
import CheckBox from '@react-native-community/checkbox'
import React, { useState, useEffect } from 'react'

const TableInputeCapacity = ({ label, values, handleUpdates, checkble}) => {
  const [Values, SetValues] = useState(values)
  const handleChanges = (value, index, isName) => {
    if (isName) Values[index].name = value
    else {
      Values[index].min = value
      // Values[index].max = value

      if (checkble) handleUpdates(values)
    }
    // console.log(values)
    SetValues([...Values])
  }

  const handleChangesSecond = (value, index, isName) => {
    if (isName) Values[index].name = value
    else {
      // Values[index].min = value
      Values[index].max = value

      if (checkble) handleUpdates(values)
    }
    // console.log(values)
    SetValues([...Values])
  }

  const HandleBlur = () => {
    handleUpdates(Values)
  }
  const addNewLine = () => {
    handleUpdates(values.concat([{ name: '', min: '', max: '' }]))
  }

  useEffect(() => {
    SetValues(values)
  }, [values])
  return (
    <View>
      <View row padding-8 style={{ borderRadius: 5, backgroundColor: '#57a4f7' }}>
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', flex: 4 }}>
          {label ? label[0] : 'Name'}
        </Text>
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', flex: 4 }}>
          {label ? label[1] : 'Minimum'}
        </Text>
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', flex: 4 }}>
          {label ? label[2] : 'Maximum'}
        </Text>
      </View>
      {Values.map((item, index) => {
        return (
          <View
          key={index} 
          row paddingH-5
          >
            <TextField
              width="35%"
              text80
              placeholder="Name"
              value={item.name}
              onChangeText={text => handleChanges(text, index, true)}
              marginB-s4
              onBlur={HandleBlur}
            />
            {checkble ? (
              <View paddingT-10 marginR-80>
                <CheckBox
                  tintColors={{ true: '#ff4d4d', false: '#ff4d4d' }}
                  disabled={false}
                  value={item.value}
                  onValueChange={value => handleChanges(value, index, false)}
                />
              </View>
            ) : (
              <>
              <TextField
                width="35%"
                text80
                placeholder="Minimum"
                value={item.min}
                onChangeText={text => handleChanges(text, index, false)}
                marginB-s4
                onBlur={HandleBlur}
              />
              <TextField
                width="30%"
                text80
                placeholder="Maximum"
                value={item.max}
                onChangeText={text => handleChangesSecond(text, index, false)}
                marginB-s4
                onBlur={HandleBlur}
              />
              </>
            )}
          </View>
        )
      })}
      <View
        flex
        style={{
          flexDirection: 'row-reverse',
        }}
      >
        <Button
          size="small"
          style={{
            maxWidth: '40%',
            borderRadius: 10,
          }}
          text75
          white
          onPress={addNewLine}
          background-primary
          label="+"
        />
      </View>
    </View>
  )
}

export default TableInputeCapacity
