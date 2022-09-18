import React, { useRef } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { View, Text, Button } from 'react-native-ui-lib'
import { Brand, SmallBrandCard } from '@/Components'
import RBSheet from 'react-native-raw-bottom-sheet'
import profile from '@/Assets/Images/profile.png'

const index = () => {
  const refRBSheet = useRef()
  return (
    <ScrollView style={{ marginBottom: 60 }}>
      <View margin-20 padding-20 br40 backgroundColor="#CCCDDD" center>
        <View
          style={{ width: 200, height: 200, backgroundColor: '#688688' }}
          br40
        ></View>
        <View paddingV-10>
          <Text text95 color="gray" style={{ fontSize: 10 }}>
            A HELPING HAND FROM MOMIFY TO HELPBALANCE YOUR LIFE
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Emotional wellbeing is important to us just as breathing is
          </Text>
        </View>
      </View>

      <View
        marginH-20
        marginT-10
        br40
        padding-10
        centerV
        backgroundColor="#CCCDDD"
        row
        spread
      >
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: '#688688',
            borderRadius: 70,
            borderColor: '#ffffff',
            borderWidth: 2,
          }}
        ></View>
        <View>
          <Text text60BO>Name</Text>
          <View row>
            <Text text90BO>Qualification : </Text>
            <Text text90>MA,MBBS</Text>
          </View>
          <View>
            <Text text90BO>Specialities : </Text>
            <Text text90></Text>
          </View>
        </View>
        <View flex style={{ alignContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <Text style={{ textAlign: 'right' }}>open</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        marginH-20
        marginT-10
        br40
        padding-10
        centerV
        backgroundColor="#CCCDDD"
        row
        spread
      >
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: '#688688',
            borderRadius: 70,
            borderColor: '#ffffff',
            borderWidth: 2,
          }}
        ></View>
        <View>
          <Text text60BO>Name</Text>
          <View row>
            <Text text90BO>Qualification : </Text>
            <Text text90>MA,MBBS</Text>
          </View>
          <View>
            <Text text90BO>Specialities : </Text>
            <Text text90></Text>
          </View>
        </View>
        <View flex style={{ alignContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <Text style={{ textAlign: 'right' }}>open</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        marginH-20
        marginT-10
        br40
        padding-10
        centerV
        backgroundColor="#CCCDDD"
        row
        spread
      >
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: '#688688',
            borderRadius: 70,
            borderColor: '#ffffff',
            borderWidth: 2,
          }}
        ></View>
        <View>
          <Text text60BO>Name</Text>
          <View row>
            <Text text90BO>Qualification : </Text>
            <Text text90>MA,MBBS</Text>
          </View>
          <View>
            <Text text90BO>Specialities : </Text>
            <Text text90></Text>
          </View>
        </View>
        <View flex style={{ alignContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <Text style={{ textAlign: 'right' }}>open</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        marginH-20
        marginT-10
        br40
        padding-10
        centerV
        backgroundColor="#CCCDDD"
        row
        spread
      >
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: '#688688',
            borderRadius: 70,
            borderColor: '#ffffff',
            borderWidth: 2,
          }}
        ></View>
        <View>
          <Text text60BO>Name</Text>
          <View row>
            <Text text90BO>Qualification : </Text>
            <Text text90>MA,MBBS</Text>
          </View>
          <View>
            <Text text90BO>Specialities : </Text>
            <Text text90></Text>
          </View>
        </View>
        <View flex style={{ alignContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <Text style={{ textAlign: 'right' }}>open</Text>
          </TouchableOpacity>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={500}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: { borderRadius: 35 },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <View padding-10 br60>
          <View bg-white center paddingB-20>
            <View bg-white br20 padding-10 center>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  resizeMode="contain"
                  style={{ height: 100, width: 100, borderRadius: 100 }}
                  source={profile}
                />
              </TouchableOpacity>
            </View>
            <Text text50BL center>
              Name
            </Text>
            <Text text80 center>
              Qualification: MA, LMFT
            </Text>
          </View>
          <View padding-10>
            <Text>
              <Text text90>Specialities : </Text>
              <Text text95>
                {' '}
                Stress, anxiety, addiction, relationships issue, trauma and
                abuse, parenting issues.{' '}
              </Text>
            </Text>
          </View>
          <View padding-10>
            <Text>
              <Text text90>About me : </Text>
              <Text text95>
                Stress, anxiety, addiction, relationships issue, trauma and
                abuse, parenting issues.{' '}
              </Text>
            </Text>
          </View>
          <View padding-10>
            <Text>
              <Text text95>
                Stress, anxiety, addiction, relationships issue, trauma and
                abuse, parenting issues.{' '}
              </Text>
            </Text>
          </View>
        </View>
        <View marginT-20 paddingH-20 style={{ justifyContent: 'flex-end' }}>
          <Button
            backgroundColor="red"
            label="Request session with me"
            labelStyle={{ fontWeight: '600', paddingVertical: 5 }}
            //style={{ wid }}
            onPress={() => refRBSheet.current.close()}
            enableShadow
          />
        </View>
      </RBSheet>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})
