import React , {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Drawer from './Drawer.js';

export default class ActeComplete extends React.Component {
  render() {
    return (
      <View style={styles.containerActe}>
          <Image source={require("../img/sardana.jpg")} style={styles.image} rezideMode="center"></Image>
          <View style={styles.containerInfoActe}>
            <View style={styles.WhereWhen}>
              <Text style={styles.Where}>
                RIPOLL. Plaça de l'Ajuntament
              </Text>
              <Text style={styles.When}>
                11.05.2020 12:00h i 17:30h
              </Text>
            </View>
            <View style={styles.ActivitatCobles}>
              <Text style={styles.ActivitatCoblesInterpets}>Activitat:</Text>
              <Text style={styles.InfoActeActivitatCobles}>Ballada</Text>
            </View>
            <View style={styles.ActivitatCobles}>
              <Text style={styles.ActivitatCoblesInterpets}>Cobles/Intèrprets:</Text>
              <Text style={styles.InfoActeActivitatCobles}>La Selvatana</Text>
            </View>
            <View style={styles.ActivitatCobles}>
              <Text style={styles.ActivitatCoblesInterpets}>Lloc si fa mal temps:</Text>
              <Text style={styles.InfoActeActivitatCobles}>CEIP Sant Cristòfor</Text>
            </View>
            <View style={{marginTop: 3}}></View>
            <Text style={styles.ExtraInfoActe}>Festa Major. A les 12h sardanes d'honor i ballada de 3 sardanes. A les 17:30h, ballada a la Plaça Gran (sardana de 7 tirades)</Text>
        </View>
      </View>
    );
  }
}

ActeComplete.navigationOptions = {
  tabBarIcon: ({tintColor,focused}) => (
    <Icon
      //name={focused ? 'md-calendar' : 'ios-calendar'}
      name={'md-calendar'}
      size={28}
      color={tintColor}
    />
  )
}

const styles = StyleSheet.create({
  containerActe: {
    backgroundColor: 'grey',
    width:'100%',
    backgroundColor: "beige",
  },
  image:{
    width:'100%',
    height:'60%',
  },
  containerInfoActe:{
    height:'40%',
    justifyContent: 'center',
  },
  WhereWhen:{
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 20,
    marginTop:15,
  },
  Where:{
    marginRight: 2,
    color: '#714170',
    fontWeight: 'bold',
    fontSize: 20,
  },
  When:{
    color:'grey',
    fontSize: 20,
    color: '#714170',
    fontWeight: 'bold',
    marginTop:10,
  },
  ActivitatCobles:{
    marginLeft: 10,
    marginTop:5,
    flexDirection:'row',
  },
  ActivitatCoblesInterpets:{
    fontWeight: 'bold',
    marginRight:5,
    color:'grey',
    fontSize: 15,
  },
  InfoActeActivitatCobles:{
    color:'grey',
    fontSize: 15,
  },
  ExtraInfoActe:{
    marginLeft: 10,
    color:'grey',
    marginBottom:10,
    fontSize: 15,
  },
});
