import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  Ideas,
  Shop,
  Home,
  Categories,
  CategoryDetails,
  Profile,
  ItemDetails,
  Venues,
} from '@/Containers'

import { Text, TouchableOpacity } from 'react-native'
import { View, Colors, ThemeManager } from 'react-native-ui-lib'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Fontisto'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const ShopNavigator = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="ShopMain" component={CategoryDetails} />
      <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
      <Stack.Screen name="Item" component={ItemDetails} />
    </Stack.Navigator>
  )
}

const IconFinder = name => {
  switch (name) {
    case 'Home':
      return 'home'
    case 'Contact':
      return 'phone'
    case 'Venue':
      return 'nav-icon-list-a'
    case 'Vendors':
      return 'nav-icon-list-a'
    case 'Shop':
      return 'shopping-basket-add'
    case 'Ideas':
      return 'lightbulb'
    case 'Profile':
      return 'person'
    default:
      return 'home'
  }
}

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        elevation: 20,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            key={index}
          >
            <View
              key={index}
              center
              marginL-5
              paddingV-5
              style={{
                backgroundColor: isFocused ? '#ff4d4d' : '#ffffff',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                paddingLeft: 7,
                paddingRight: 7,
              }}
            >
              <Icon
                name={IconFinder(route.name)}
                size={15}
                color={isFocused ? '#ffffff' : '#ff4d4d'}
              />
              <Text
                style={{
                  color: isFocused ? '#ffffff' : '#000000',
                  fontWeight: '600',
                  marginLeft: 5,
                }}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute',
        },
      }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Contact" component={Ideas} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default MainNavigator
