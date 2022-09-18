import { View, Text, TextField, Button } from 'react-native-ui-lib'
import CheckBox from '@react-native-community/checkbox'
import React, { useState, useEffect } from 'react'
import { Image, TouchableOpacity } from 'react-native'
// import MultipleImagePicker from '@baronha/react-native-multiple-image-picker'
import AlbumImage from '@/Assets/Images/photo-album.png'
import Icon from 'react-native-vector-icons/Fontisto'
import ImagePicker from "react-native-image-crop-picker";

const AlbumTable = ({ label, values, handleUpdates, checkble }) => {
  const [Values, SetValues] = useState(values)

  const handleChanges = (value, index, isName) => {
    if (isName) Values[index].name = value
    else {
      Values[index].value = value

      if (checkble) handleUpdates(values)
    }
    // console.log(values)
    SetValues([...Values])
  }

  // const handleChoosePhoto = async index => {
  //   if (Values[index].name.length === 0) return alert('Please add Album Name')
  //   const options = {
  //     usedCameraButton: true,
  //     allowedVideo: true,
  //     allowedPhotograph: true,
  //     allowedVideoRecording: false,
  //     maxVideoDuration: 60,
  //     numberOfColumn: 3,
  //     maxSelectedAssets: 20,
  //     singleSelectedMode: false,
  //     doneTitle: 'Done',
  //     isPreview: true,
  //     mediaType: 'all',
  //     isExportThumbnail: false,
  //     selectedAssets: Values[index].value || [],
  //   }
  //   Values[index].value = await MultipleImagePicker.openPicker(options)
  //   SetValues([...Values])
  //   // console.log(response)
  // }
  const chooseMainImageFromGallery = async (index) => {
    if (Values[index].name.length === 0) return alert('Please add Album Name')
    Values[index].value=await ImagePicker.openPicker({
      width: 300,
      height: 200,
      multiple: true,
  })
      .then(images => {
          console.log(images)
          if (images.length > 0) {
            return images
          }
      })
      .catch(err => {
          console.log(' Error fetching images from gallery ', err);
      });
    SetValues([...Values])

  };
  const HandleBlur = () => {
    handleUpdates(Values)
  }
  const addNewLine = () => {
    handleUpdates(values.concat([{ name: '', value: [] }]))
  }

  useEffect(() => {
    SetValues(values)
  }, [values])
  return (
    <View>
      <View row padding-7 style={{ borderRadius: 5, backgroundColor: '#57a4f7' }}>
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', flex: 6 }}>
          {label ? label[0] : 'Album Name'}
        </Text>
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', flex: 4 }}>
          {label ? label[1] : 'Images'}
        </Text>
      </View>
      {Values.map((item, index) => {
        const showImg = item?.value?.length>0||false
        return (
          <View key={index} row padding-5 spread>
            <TextField
              width="40%"
              text80
              placeholder="Name"
              value={item.name}
              onChangeText={text => handleChanges(text, index, true)}
              marginB-s4
              onBlur={HandleBlur}
            />
            <View>
            {showImg?<Text style={{marginTop:10,color:'green'}}>Added Successfully</Text>: 
              <TouchableOpacity 
              onPress={() => chooseMainImageFromGallery(index)}
              >
               <Icon name="picture" size={35} color="#ff4d4d" />
              </TouchableOpacity>
      }
            </View>
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

export default AlbumTable
