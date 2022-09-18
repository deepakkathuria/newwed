import { View, Text, TextField, Button } from 'react-native-ui-lib'
import CheckBox from '@react-native-community/checkbox'
import React, { useState, useEffect } from 'react'

const LinkTable = ({ label, values, handleUpdates, checkble }) => {
  const [Values, SetValues] = useState(values)
  const handleChanges = (value, index, isName) => {
    Values[index] = value
    // console.log(values)
    SetValues([...Values])
  }

  const HandleBlur = () => {
    handleUpdates(Values)
  }
  const addNewLine = () => {
    handleUpdates(values.concat(['']))
  }

  useEffect(() => {
    SetValues(values)
  }, [values])
  return (
    <View>
      <View row padding-5 style={{ borderRadius: 5, backgroundColor: '#57a4f7' }}>
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', flex: 6 }}>
          {label ? label[0] : 'Video URL / Link'}
        </Text>
      </View>
      {Values.map((item, index) => {
        return (
          <View
          key={index} 
          row paddingH-5 spread
          >
            <TextField
              width="95%"
              text85
              placeholder="url : (https:youtube.com/watch?v=dQw4w9WgXcQ)"
              value={item}
              onChangeText={text => handleChanges(text, index)}
              marginB-s4
              onBlur={HandleBlur}
            />
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

export default LinkTable
