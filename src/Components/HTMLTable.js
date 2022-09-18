import React from 'react'
import { useWindowDimensions } from 'react-native'
import RenderHtml from 'react-native-render-html'
import { View } from 'react-native-ui-lib'

const HTMLTable = ({ table }) => {
  const { width } = useWindowDimensions()
  return (
    <View paddingV-10>
      <RenderHtml contentWidth={width - 10} source={table} />
    </View>
  )
}

export default HTMLTable
