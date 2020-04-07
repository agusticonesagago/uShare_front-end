import React , {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Drawer from './Drawer.js';

export default class Actes extends React.Component {
  render() {


    return (
      <View style={styles.container}>
        <View style={styles.containerNavigator}>
          <Image source={require("../img/logorodo.png")} style={styles.image}></Image>
          <Text style={styles.titleNavigator}> Actes </Text>
        </View>
        <View style={styles.containerActe}>
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
          <View style={{marginTop: 3}}></View>
          <Text style={styles.ExtraInfoActe}>Festa Major. A les 12h sardanes d'honor i ballada de 3 sardanes. A les 17:30h, ballada a la Plaça Gran (sardana de 7 tirades)</Text>
         </View>
      </View>
    );
  }
}

Actes.navigationOptions = {
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  containerNavigator: {
    backgroundColor: '#714170',
    height: '12%',
    width:'100%',
    flexDirection:'row',
  },
  titleNavigator:{
    color:'white',
    fontSize:30,
    paddingTop:20,
    width:'50%',
  },
  image:{
    borderRadius:100,
    overflow: 'hidden',
    position: 'relative',
    height:60,
    width:60,
    marginTop:10,
    marginBottom:10,
    marginLeft:20,
    marginRight:20,
  },
  containerActe: {
    backgroundColor: 'grey',
    width:'100%',
    backgroundColor: "beige",
    borderWidth: 1,
    marginBottom: 2,
  },
  WhereWhen:{
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 20,
    marginTop:15,
  },
  Where:{
    marginRight: 2,
    color: '#714170',
    fontWeight: 'bold',
    fontSize: 15,
  },
  When:{
    color:'grey',
    fontSize: 15,
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
